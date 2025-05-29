interface GridInfo { key: string; title: string; sideLength: number; }
interface Cell { id: number; x: number; y: number; owner_id: number | null; content: string; }

export type {
    GridInfo,
    Cell
}