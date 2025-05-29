import React, { useState, useEffect } from 'react';
// import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
// import CanvasDraw from 'react-canvas-draw';
import PaintModal from './components/Paint';

Modal.setAppElement('#root');
const API_URL = 'http://localhost:8000';

interface GridInfo { key: string; title: string; }
interface Cell { id: number; x: number; y: number; owner_id: number | null; content: string; }

const App: React.FC = () => {
  const [grids, setGrids] = useState<GridInfo[]>([]);
  const [selectedGrid, setSelectedGrid] = useState<string>('');
  const [cells, setCells] = useState<Cell[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [drawModalOpen, setDrawModalOpen] = useState(false);
  const [newGridKey, setNewGridKey] = useState('');
  const [newGridTitle, setNewGridTitle] = useState('');
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  // const canvasRef = useRef<CanvasDraw | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/grids`)
      .then(res => res.json())
      .then((data: GridInfo[]) => {
        setGrids(data);
        if (data.length) setSelectedGrid(data[0].key);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedGrid) return;
    fetch(`${API_URL}/grids/${selectedGrid}/cells`)
      .then(res => res.json())
      .then((data: Cell[]) => setCells(data))
      .catch(console.error);
  }, [selectedGrid]);

  const handleCreateGrid = async () => {
    try {
      const res = await fetch(`${API_URL}/grids`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: newGridKey, title: newGridTitle }),
      });
      if (!res.ok) throw new Error('Create grid failed');
      const created: GridInfo = await res.json();
      setGrids(prev => [...prev, created]);
      setSelectedGrid(created.key);
      setCreateModalOpen(false);
      setNewGridKey(''); setNewGridTitle('');
    } catch (err) { console.error(err); }
  };

  const openDrawModal = (cell: Cell) => {
    if (cell.owner_id) return;
    setSelectedCell(cell);
    setDrawModalOpen(true);
  };

  const handleSave = async (dataUrl: string) => {
    if (!selectedCell) return;

    try {
      const res = await fetch(
        `${API_URL}/cells/${selectedCell.id}/draw`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: dataUrl }) }
      );
      if (res.ok) {
        const updated: Cell = await res.json();
        setCells(prev => prev.map(c => c.id === updated.id ? updated : c));
        setDrawModalOpen(false);
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Rolling Paper</h1>
        <div>
          <select value={selectedGrid} onChange={e => setSelectedGrid(e.target.value)}>
            {grids.map(g => <option key={g.key} value={g.key}>{g.title}</option>)}
          </select>
          <button onClick={() => setCreateModalOpen(true)} style={{ marginLeft: 8 }}>Create Grid</button>
        </div>
      </header>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 32px)', gap: '0px', marginTop: 16, border: '1px solid #ccc' }}>
          {cells.map(cell => (
            <div
              key={cell.id}
              className='hoverBox'
              onClick={() => openDrawModal(cell)}
              style={{ padding: 1, width: 30, height: 30, border: '0px solid #ccc', cursor: cell.owner_id ? 'default' : 'pointer', overflow: 'hidden' }}
            >
              {cell.content && (
                <img
                  src={cell.content}
                  alt={`Cell ${cell.x},${cell.y}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={createModalOpen} onRequestClose={() => setCreateModalOpen(false)} contentLabel="Create Grid" style={{ content: { width: 300, margin: 'auto', padding: 20 }, overlay: { backgroundColor: 'rgba(0,0,0,0.5)' } }}>
        <h2>Create New Grid</h2>
        <input placeholder="Key" value={newGridKey} onChange={e => setNewGridKey(e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
        <input placeholder="Title" value={newGridTitle} onChange={e => setNewGridTitle(e.target.value)} style={{ width: '100%', marginBottom: 16 }} />
        <button onClick={handleCreateGrid} style={{ marginRight: 8 }}>Create</button>
        <button onClick={() => setCreateModalOpen(false)}>Cancel</button>
      </Modal>

      <PaintModal
        isOpen={drawModalOpen}
        initialData={selectedCell?.content}
        onSave={handleSave}
        onClose={() => setDrawModalOpen(false)}
      />
      {/* <Modal isOpen={drawModalOpen} onRequestClose={() => setDrawModalOpen(false)} contentLabel="Draw Cell" style={{ content: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 20 }, overlay: { backgroundColor: 'rgba(0,0,0,0.5)' } }}>
        <h2>Draw on Cell ({selectedCell?.x}, {selectedCell?.y})</h2>
        <div style={{ margin: '16px 0' }}>
          <CanvasDraw ref={canvasRef} canvasWidth={200} canvasHeight={200} brushRadius={1} hideGrid />
        </div>
        <div style={{ textAlign: 'right' }}>
          <button onClick={() => setDrawModalOpen(false)} style={{ marginRight: 8 }}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </Modal> */}
    </div>
  );
};

export default App;
