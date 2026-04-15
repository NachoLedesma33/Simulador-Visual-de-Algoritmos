import { useCallback, useEffect, useRef } from 'react';

import { useCanvas } from '@/hooks';
import type { PathfindingStep, Cell, Coordinate } from '@/types';

interface PathfindingCanvasProps {
  grid: Cell[][];
  step: PathfindingStep;
  cellSize: number;
  onCellClick?: (coord: Coordinate) => void;
}

const LAYER_COLORS = {
  wall: '#1e293b',
  empty: '#f8fafc',
  start: '#22c55e',
  end: '#ef4444',
  visited: '#93c5fd',
  frontier: '#fde047',
  path: '#15803d',
  active: '#ffffff',
  gridLine: '#cbd5e1',
};

export function PathfindingCanvas({
  grid,
  step,
  cellSize,
  onCellClick,
}: PathfindingCanvasProps) {
  const rows = grid.length;
  const cols = grid[0].length;
  const width = cols * cellSize;
  const height = rows * cellSize;

  const stepRef = useRef(step);
  const gridRef = useRef(grid);

  useEffect(() => {
    stepRef.current = step;
    gridRef.current = grid;
  }, [step, grid]);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, frame: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = LAYER_COLORS.empty;
      ctx.fillRect(0, 0, width, height);

      const g = gridRef.current;
      const s = stepRef.current;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellSize;
          const y = r * cellSize;

          if (!g[r][c].walkable) {
            ctx.fillStyle = LAYER_COLORS.wall;
            ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
          } else {
            ctx.fillStyle = LAYER_COLORS.empty;
            ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
          }
        }
      }

      if (s.current) {
        const { row, col } = s.current;
        const x = col * cellSize;
        const y = row * cellSize;
        ctx.fillStyle = LAYER_COLORS.active;
        ctx.fillRect(x, y, cellSize - 1, cellSize - 1);

        const pulseFactor = Math.sin(frame * 0.15) * 0.3 + 0.5;
        ctx.strokeStyle = `rgba(255, 255, 255, ${pulseFactor})`;
        ctx.lineWidth = 3;
        ctx.strokeRect(x + 1.5, y + 1.5, cellSize - 3, cellSize - 3);
      }

      ctx.fillStyle = LAYER_COLORS.frontier;
      for (const coord of s.frontier) {
        const x = coord.col * cellSize;
        const y = coord.row * cellSize;
        ctx.fillStyle = LAYER_COLORS.frontier;
        ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
      }

      ctx.fillStyle = LAYER_COLORS.path;
      for (const coord of s.path) {
        const x = coord.col * cellSize;
        const y = coord.row * cellSize;
        ctx.fillStyle = LAYER_COLORS.path;
        ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
      }

      if (s.path.length > 0) {
        const start = s.path[0];
        ctx.fillStyle = LAYER_COLORS.start;
        ctx.fillRect(start.col * cellSize, start.row * cellSize, cellSize - 1, cellSize - 1);

        const end = s.path[s.path.length - 1];
        ctx.fillStyle = LAYER_COLORS.end;
        ctx.fillRect(end.col * cellSize, end.row * cellSize, cellSize - 1, cellSize - 1);
      } else {
        if (rows > 0 && cols > 0) {
          ctx.fillStyle = LAYER_COLORS.start;
          ctx.fillRect(0, 0, cellSize - 1, cellSize - 1);

          ctx.fillStyle = LAYER_COLORS.end;
          ctx.fillRect((cols - 1) * cellSize, (rows - 1) * cellSize, cellSize - 1, cellSize - 1);
        }
      }

      ctx.strokeStyle = LAYER_COLORS.gridLine;
      ctx.lineWidth = 0.5;
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * cellSize);
        ctx.lineTo(width, r * cellSize);
        ctx.stroke();
      }
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * cellSize, 0);
        ctx.lineTo(c * cellSize, height);
        ctx.stroke();
      }
    },
    [cellSize, rows, cols, width, height]
  );

  const { canvasRef, redraw } = useCanvas(draw, { fps: 60 });

  useEffect(() => {
    redraw();
  }, [step, redraw]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!onCellClick || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);

      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        onCellClick({ row, col });
      }
    },
    [cellSize, rows, cols, onCellClick]
  );

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'block',
        cursor: onCellClick ? 'pointer' : 'default',
      }}
    />
  );
}