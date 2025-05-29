import { API_URL } from "../def/const";
import type { Cell, GridInfo } from "../def/type";

export const getGridInfo = async (): Promise<GridInfo[]> => {
    return await fetch(`${API_URL}/grids`)
        .then(res => res.json())
        .then((data: any) => {
            return data.map((d: any) => {
                return {
                    key: d.key, title: d.title, sideLength: d.side_length
                }
            })
        })
}

export const getGridCellInfo = async (selectedGridId: string) => {
    return await fetch(`${API_URL}/grids/${selectedGridId}/cells`)
        .then(res => res.json())
        .then((data: Cell[]) => {
            return data
        })
}

export const postCreateGrid = async (newGridKey: string, newGridTitle: string) => {
    try {
        const res = await fetch(`${API_URL}/grids`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: newGridKey, title: newGridTitle }),
        });
        if (!res.ok) throw new Error('Create grid failed');
        const created: GridInfo = await res.json();
        return created;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const postSaveCell = async (cellId: number, content: string): Promise<Cell | undefined> => {
    try {
        const res = await fetch(
            `${API_URL}/cells/${cellId}/draw`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: content }) }
        );
        if (res.ok) {
            const updated: Cell = await res.json();
            return updated;
        }
    } catch (err) {
        console.error(err);
        throw err
    }
}