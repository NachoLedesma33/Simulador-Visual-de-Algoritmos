import type { Cell, Coordinate, PathfindingStep } from '@/types';
import {
  bfsGenerator,
  dfsGenerator,
  dijkstraGenerator,
  astarGenerator,
  PATHFINDING_GENERATORS,
  type PathfindingGenerator,
} from './generators';

export {
  bfsGenerator,
  dfsGenerator,
  dijkstraGenerator,
  astarGenerator,
  PATHFINDING_GENERATORS,
  type PathfindingGenerator,
};

export function generateEmptyGrid(
  rows: number,
  cols: number,
  defaultWeight = 1
): Cell[][] {
  const grid: Cell[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        row: r,
        col: c,
        walkable: true,
        weight: defaultWeight,
      });
    }
    grid.push(row);
  }
  return grid;
}

export function generateMaze(
  grid: Cell[][],
  type: 'random' | 'walls' = 'random'
): Cell[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  
  // Initialize grid with all walls if we want a perfect maze
  const result = grid.map((row) =>
    row.map((cell) => ({ ...cell, walkable: false }))
  );

  const stack: Coordinate[] = [];
  const start: Coordinate = { row: 0, col: 0 };
  
  result[start.row][start.col].walkable = true;
  stack.push(start);

  const visited = new Set<string>();
  visited.add(`${start.row},${start.col}`);

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const { row, col } = current;

    const neighbors: Coordinate[] = [];
    const directions = [
      { r: -2, c: 0 },
      { r: 2, c: 0 },
      { r: 0, c: -2 },
      { r: 0, c: 2 },
    ];

    for (const dir of directions) {
      const nRow = row + dir.r;
      const nCol = col + dir.c;
      if (nRow >= 0 && nRow < rows && nCol >= 0 && nCol < cols && !visited.has(`${nRow},${nCol}`)) {
        neighbors.push({ row: nRow, col: nCol });
      }
    }

    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      const midRow = (row + next.row) / 2;
      const midCol = (col + next.col) / 2;

      result[midRow][midCol].walkable = true;
      result[next.row][next.col].walkable = true;
      
      visited.add(`${next.row},${next.col}`);
      stack.push(next);
    } else {
      stack.pop();
    }
  }

  // Ensure start and end are always accessible
  result[0][0].walkable = true;
  result[rows - 1][cols - 1].walkable = true;

  // Sometimes the DFS doesn't reach the bottom-right corner if it's trapped or odd/even parity
  // Let's ensure a small connection path if needed
  if (!checkConnectivity(result, {row: 0, col: 0}, {row: rows-1, col: cols-1})) {
    carvePathToEnd(result, rows, cols);
  }

  return result;
}

function checkConnectivity(grid: Cell[][], start: Coordinate, end: Coordinate): boolean {
  const queue: Coordinate[] = [start];
  const visited = new Set<string>();
  visited.add(`${start.row},${start.col}`);

  while (queue.length > 0) {
    const curr = queue.shift()!;
    if (curr.row === end.row && curr.col === end.col) return true;

    const dirs = [{r:1,c:0},{r:-1,c:0},{r:0,c:1},{r:0,c:-1}];
    for (const d of dirs) {
      const nr = curr.row + d.r;
      const nc = curr.col + d.c;
      if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc].walkable && !visited.has(`${nr},${nc}`)) {
        visited.add(`${nr},${nc}`);
        queue.push({row: nr, col: nc});
      }
    }
  }
  return false;
}

function carvePathToEnd(grid: Cell[][], rows: number, cols: number) {
  let r = rows - 1;
  let c = cols - 1;
  while (r > 0 || c > 0) {
    grid[r][c].walkable = true;
    if (r > 0 && (c === 0 || Math.random() < 0.5)) {
      r--;
    } else if (c > 0) {
      c--;
    }
  }
}

export function getNeighbors(coord: Coordinate, grid: Cell[][]): Coordinate[] {
  const { row, col } = coord;
  const neighbors: Coordinate[] = [];
  const directions = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
  ];

  for (const dir of directions) {
    const newRow = row + dir.row;
    const newCol = col + dir.col;
    if (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length &&
      grid[newRow][newCol].walkable
    ) {
      neighbors.push({ row: newRow, col: newCol });
    }
  }

  return neighbors;
}

export function runGenerator(
  grid: Cell[][],
  start: Coordinate,
  end: Coordinate,
  gen: {
    (grid: readonly (readonly Cell[])[], start: Coordinate, end: Coordinate): Generator<PathfindingStep, unknown, unknown>;
  }
): PathfindingStep[] {
  const steps: PathfindingStep[] = [];
  for (const step of gen(grid, start, end)) {
    steps.push(step);
  }
  return steps;
}