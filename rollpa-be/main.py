from typing import Optional, List
from datetime import datetime
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlmodel import SQLModel, Field, Session, create_engine, select

# --- Database Setup ---
sqlite_file_name = '../grid.db'
sqlite_url = f'sqlite:///{sqlite_file_name}'
engine = create_engine(sqlite_url, echo=True)

# --- Models ---
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)

class Grid(SQLModel, table=True):
    key: str = Field(primary_key=True, index=True)
    title: str

class Cell(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    grid_key: str = Field(foreign_key='grid.key', index=True)
    x: int
    y: int
    owner_id: Optional[int] = Field(default=None, foreign_key='user.id')
    content: str = Field(default='')  # drawing data
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# --- Pydantic Schemas ---
class GridCreate(BaseModel):
    key: str
    title: str

class CellContent(BaseModel):
    content: str

# --- Utility ---
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# --- Lifespan Handler ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

# --- CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:3000',
        'http://localhost:5173',
    ],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# --- API Endpoints ---
@app.post('/grids', response_model=Grid)
def create_grid(grid: GridCreate):
    """새 그리드 생성 및 20x20 셀 자동 생성"""
    with Session(engine) as session:
        existing = session.get(Grid, grid.key)
        if existing:
            raise HTTPException(status_code=400, detail='Grid key already exists')
        new_grid = Grid(key=grid.key, title=grid.title)
        session.add(new_grid)
        # 자동으로 20x20 셀 생성
        cells = [Cell(grid_key=grid.key, x=i, y=j) for i in range(20) for j in range(20)]
        session.add_all(cells)
        session.commit()
        return new_grid

@app.get('/grids', response_model=List[Grid])
def read_grids():
    """모든 그리드 목록 조회"""
    with Session(engine) as session:
        return session.exec(select(Grid)).all()

@app.get('/grids/{grid_key}/cells', response_model=List[Cell])
def read_grid_cells(grid_key: str):
    """특정 그리드의 모든 셀 조회"""
    with Session(engine) as session:
        statement = select(Cell).where(Cell.grid_key == grid_key)
        return session.exec(statement).all()

@app.get('/cells/{cell_id}', response_model=Cell)
def read_cell(cell_id: int):
    """특정 셀 정보 조회"""
    with Session(engine) as session:
        cell = session.get(Cell, cell_id)
        if not cell:
            raise HTTPException(status_code=404, detail='Cell not found')
        return cell

@app.post('/cells/{cell_id}/draw', response_model=Cell)
def draw_cell(cell_id: int, cell_content: CellContent):
    """그림 또는 손글씨 저장"""
    with Session(engine) as session:
        cell = session.get(Cell, cell_id)
        if not cell:
            raise HTTPException(status_code=404, detail='Cell not found')
        cell.content = cell_content.content
        cell.updated_at = datetime.utcnow()
        session.add(cell)
        session.commit()
        session.refresh(cell)
        return cell

@app.post('/cells/{cell_id}/purchase')
def purchase_cell(cell_id: int):
    """셀 구매 (구현 예정)"""
    return {'message': 'Purchase endpoint stub'}

# --- Run ---
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)
