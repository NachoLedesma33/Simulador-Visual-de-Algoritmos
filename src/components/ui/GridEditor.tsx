import { useCallback, useRef, useState, useMemo } from 'react';
import type { Cell } from '@/types';

type ToolMode = 'wall' | 'start' | 'end' | 'eraser';
type GridPreset = 'narrow' | 'spiral' | 'quadrants';

interface GridEditorProps {
  grid: Cell[][];
  onGridChange: (newGrid: Cell[][]) => void;
  isLocked?: boolean;
  cellSize?: number;
}

function createEmptyGrid(rows: number, cols: number): Cell[][] {
  const grid: Cell[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({ row: r, col: c, walkable: c > 0 || r > 0, weight: 1 });
    }
    grid.push(row);
  }

  if (grid.length > 0 && grid[0].length > 0) {
    grid[0][0].walkable = false;
    grid[0][0].row = 0;
    grid[0][0].col = 0;
    grid[rows - 1][cols - 1].walkable = false;
    grid[rows - 1][cols - 1].row = rows - 1;
    grid[rows - 1][cols - 1].col = cols - 1;
  }

  return grid;
}

function cloneGrid(grid: Cell[][]): Cell[][] {
  return grid.map((row) => row.map((cell) => ({ ...cell })));
}

function getCellFromCoord(
  grid: Cell[][],
  x: number,
  y: number,
  cellSize: number
): { row: number; col: number } | null {
  const col = Math.floor(x / cellSize);
  const row = Math.floor(y / cellSize);

  if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
    return { row, col };
  }
  return null;
}

function setCell(
  grid: Cell[][],
  row: number,
  col: number,
  walkable: boolean
): Cell[][] {
  const newGrid = cloneGrid(grid);
  if (row >= 0 && row < newGrid.length && col >= 0 && col < newGrid[0].length) {
    const isStart = row === 0 && col === 0;
    const isEnd = row === newGrid.length - 1 && col === newGrid[0].length - 1;

    if (!isStart && !isEnd) {
      newGrid[row][col] = { ...newGrid[row][col], row, col, walkable, weight: walkable ? 1 : 0 };
    }
  }
  return newGrid;
}

function generateMazeProbabilistic(grid: Cell[][], density = 0.3): Cell[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = createEmptyGrid(rows, cols);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isStart = r === 0 && c === 0;
      const isEnd = r === rows - 1 && c === cols - 1;
      if (!isStart && !isEnd && Math.random() < density) {
        newGrid[r][c].walkable = false;
        newGrid[r][c].weight = 0;
      }
    }
  }

  return newGrid;
}

function generatePreset(grid: Cell[][], preset: GridPreset): Cell[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = createEmptyGrid(rows, cols);

  if (preset === 'narrow') {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (r % 2 === 0 && c % 2 === 0) {
          if (r > 1 || c > 1) {
            newGrid[r][c].walkable = false;
            newGrid[r][c].weight = 0;
          }
        }
      }
    }
  } else if (preset === 'spiral') {
    const visited = new Set<string>();
    let r = 0, c = 0;
    let dr = 0, dc = 1;

    while (visited.size < rows * cols) {
      visited.add(`${r},${c}`);

      const isStart = r === 0 && c === 0;
      const isEnd = r === rows - 1 && c === cols - 1;
      if (!isStart && !isEnd) {
        newGrid[r][c].walkable = false;
        newGrid[r][c].weight = 0;
      }

      const nextR = r + dr;
      const nextC = c + dc;

      if (nextR < 0 || nextR >= rows || nextC < 0 || nextC >= cols || visited.has(`${nextR},${nextC}`)) {
        [dr, dc] = [dc, -dr];
      }

      r += dr;
      c += dc;
    }
  } else if (preset === 'quadrants') {
    const midR = Math.floor(rows / 2);
    const midC = Math.floor(cols / 2);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const isStart = r === 0 && c === 0;
        const isEnd = r === rows - 1 && c === cols - 1;
        if (!isStart && !isEnd) {
          if ((r < midR && c < midC) || (r >= midR && c >= midC)) {
            if ((r + c) % 3 === 0) {
              newGrid[r][c].walkable = false;
              newGrid[r][c].weight = 0;
            }
          }
        }
      }
    }
  }

  return newGrid;
}

export function GridEditor({
  grid,
  onGridChange,
  isLocked = false,
  cellSize = 20,
}: GridEditorProps) {
  const [tool, setTool] = useState<ToolMode>('wall');
  const [isDrawing, setIsDrawing] = useState(false);
  const [gridSize, setGridSize] = useState({ rows: grid.length, cols: grid[0].length });

  const lastCellRef = useRef<{ row: number; col: number } | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (isLocked) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const result = getCellFromCoord(grid, x, y, cellSize);
      if (!result) return;

      const { row, col } = result;
      setIsDrawing(true);
      lastCellRef.current = { row, col };

      let newGrid: Cell[][];

      if (tool === 'wall') {
        newGrid = setCell(grid, row, col, grid[row][col].walkable);
      } else if (tool === 'start') {
        newGrid = cloneGrid(grid);
        newGrid[0][newGrid[0].length - 1].walkable = true;
        newGrid[newGrid.length - 1][newGrid[0].length - 1].walkable = true;
        newGrid[row][col].walkable = false;
      } else if (tool === 'end') {
        newGrid = cloneGrid(grid);
        newGrid[0][0].walkable = true;
        newGrid[newGrid.length - 1][newGrid[0].length - 1].walkable = true;
        newGrid[row][col].walkable = false;
      } else if (tool === 'eraser') {
        newGrid = setCell(grid, row, col, true);
      } else {
        newGrid = grid;
      }

      onGridChange(newGrid);
    },
    [grid, cellSize, tool, isLocked, onGridChange]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (isLocked || !isDrawing) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const result = getCellFromCoord(grid, x, y, cellSize);
      if (!result) return;

      const { row, col } = result;
      const lastCell = lastCellRef.current;

      if (lastCell && lastCell.row === row && lastCell.col === col) {
        return;
      }

      lastCellRef.current = { row, col };

      let newGrid: Cell[][];

      if (tool === 'wall' || tool === 'eraser') {
        newGrid = setCell(grid, row, col, tool === 'eraser');
      } else {
        newGrid = grid;
      }

      onGridChange(newGrid);
    },
    [grid, cellSize, tool, isDrawing, isLocked, onGridChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
    lastCellRef.current = null;
  }, []);

  const handleSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const size = parseInt(e.target.value, 10);
      const newGrid = createEmptyGrid(size, size);
      setGridSize({ rows: size, cols: size });
      onGridChange(newGrid);
    },
    [onGridChange]
  );

  const handleGenerateRandom = useCallback(() => {
    const newGrid = generateMazeProbabilistic(grid, 0.3);
    onGridChange(newGrid);
  }, [grid, onGridChange]);

  const handleGeneratePreset = useCallback(
    (preset: GridPreset) => {
      const newGrid = generatePreset(grid, preset);
      onGridChange(newGrid);
    },
    [grid, onGridChange]
  );

  const handleClear = useCallback(() => {
    const newGrid = createEmptyGrid(grid.length, grid[0].length);
    onGridChange(newGrid);
  }, [grid, onGridChange]);

  const cursorStyle = useMemo(() => {
    return tool === 'wall' || tool === 'eraser' ? 'crosshair' : 'pointer';
  }, [tool]);

  return (
    <div className="ge-container">
      <div className="ge-toolbar">
        <div className="ge-tool-group">
          <button
            className={`ge-tool ${tool === 'wall' ? 'active' : ''}`}
            onClick={() => setTool('wall')}
            disabled={isLocked}
            title="Pared"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 6h12M6 2v12" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button
            className={`ge-tool ${tool === 'start' ? 'active' : ''}`}
            onClick={() => setTool('start')}
            disabled={isLocked}
            title="Inicio"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="8" cy="8" r="2" fill="currentColor"/>
            </svg>
          </button>
          <button
            className={`ge-tool ${tool === 'end' ? 'active' : ''}`}
            onClick={() => setTool('end')}
            disabled={isLocked}
            title="Fin"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 6L10 10M10 6L6 10" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button
            className={`ge-tool ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => setTool('eraser')}
            disabled={isLocked}
            title="Borrador"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 2L14 6L6 14L2 10L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="ge-tool-group">
          <select
            className="ge-select"
            value={gridSize.rows}
            onChange={handleSizeChange}
            disabled={isLocked}
          >
            <option value={10}>10x10</option>
            <option value={15}>15x15</option>
            <option value={20}>20x20</option>
            <option value={25}>25x25</option>
            <option value={30}>30x30</option>
          </select>
        </div>

        <div className="ge-tool-group">
          <button className="ge-action" onClick={handleGenerateRandom} disabled={isLocked}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3 12c0-2 2-4 4-4s4 2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Aleatorio
          </button>
          <button className="ge-action" onClick={() => handleGeneratePreset('spiral')} disabled={isLocked}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3.3 3.3l1.4 1.4M9.3 9.3l1.4 1.4M3.3 10.7l1.4-1.4M9.3 4.7l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Espiral
          </button>
          <button className="ge-action" onClick={handleClear} disabled={isLocked}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Limpiar
          </button>
        </div>
      </div>

      <canvas
        className="ge-canvas"
        width={grid[0].length * cellSize}
        height={grid.length * cellSize}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: cursorStyle }}
      />

      <style>{`
        .ge-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ge-toolbar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding: 8px;
          background: var(--code-bg);
          border: 1px solid var(--border);
          border-radius: 10px;
        }

        .ge-tool-group {
          display: flex;
          gap: 4px;
        }

        .ge-tool {
          width: 32px;
          height: 32px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .ge-tool:hover:not(:disabled) {
          background: var(--code-bg);
          border-color: var(--border-hover);
          color: var(--text-h);
        }

        .ge-tool.active {
          background: var(--primary-dim);
          border-color: var(--primary);
          color: var(--primary);
        }

        .ge-tool:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .ge-select {
          padding: 6px 8px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          color: var(--text);
          font-size: 11px;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ge-select:hover {
          border-color: var(--border-hover);
        }

        .ge-select:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .ge-action {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          color: var(--text);
          cursor: pointer;
          font-size: 11px;
          transition: all 0.2s;
        }

        .ge-action:hover:not(:disabled) {
          background: var(--code-bg);
          border-color: var(--border-hover);
          color: var(--text-h);
        }

        .ge-action:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .ge-canvas {
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--code-bg);
        }
      `}</style>
    </div>
  );
}
