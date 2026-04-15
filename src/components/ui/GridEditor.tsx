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
    <div className="grid-editor">
      <div className="editor-toolbar">
        <div className="tool-group">
          <button
            className={`tool-btn ${tool === 'wall' ? 'active' : ''}`}
            onClick={() => setTool('wall')}
            disabled={isLocked}
            title="Pared"
          >
            █
          </button>
          <button
            className={`tool-btn ${tool === 'start' ? 'active' : ''}`}
            onClick={() => setTool('start')}
            disabled={isLocked}
            title="Inicio"
          >
            S
          </button>
          <button
            className={`tool-btn ${tool === 'end' ? 'active' : ''}`}
            onClick={() => setTool('end')}
            disabled={isLocked}
            title="Fin"
          >
            E
          </button>
          <button
            className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => setTool('eraser')}
            disabled={isLocked}
            title="Borrador"
          >
            ✕
          </button>
        </div>

        <div className="tool-group">
          <select
            className="size-select"
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

        <div className="tool-group">
          <button className="action-btn" onClick={handleGenerateRandom} disabled={isLocked}>
            Aleatorio
          </button>
          <button className="action-btn" onClick={() => handleGeneratePreset('spiral')} disabled={isLocked}>
            Espiral
          </button>
          <button className="action-btn" onClick={handleClear} disabled={isLocked}>
            Limpiar
          </button>
        </div>
      </div>

      <canvas
        className="grid-canvas"
        width={grid[0].length * cellSize}
        height={grid.length * cellSize}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: cursorStyle }}
      />

      <style>{`
        .grid-editor { display: flex; flex-direction: column; gap: 12px; }
        .editor-toolbar { display: flex; gap: 12px; flex-wrap: wrap; padding: 8px; background: var(--code-bg); border-radius: 6px; }
        .tool-group { display: flex; gap: 4px; }
        .tool-btn { width: 32px; height: 32px; border: 1px solid var(--border); border-radius: 4px; background: var(--bg); color: var(--text); cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; }
        .tool-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
        .tool-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .size-select { padding: 6px 8px; border: 1px solid var(--border); border-radius: 4px; background: var(--bg); color: var(--text); font-size: 12px; }
        .action-btn { padding: 6px 10px; border: 1px solid var(--border); border-radius: 4px; background: var(--bg); color: var(--text); cursor: pointer; font-size: 12px; }
        .action-btn:hover:not(:disabled) { background: var(--code-bg); }
        .action-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .grid-canvas { border: 1px solid var(--border); border-radius: 4px; }
      `}</style>
    </div>
  );
}