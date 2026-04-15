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
  type: 'random' | 'walls' = 'random',
  wallDensity = 0.3
): Cell[][] {
  const result = grid.map((row) =>
    row.map((cell) => ({ ...cell, walkable: true }))
  );

  if (type === 'random') {
    for (let r = 0; r < result.length; r++) {
      for (let c = 0; c < result[0].length; c++) {
        if (Math.random() < wallDensity) {
          result[r][c].walkable = false;
        }
      }
    }
  }

  if (result.length > 0 && result[0].length > 0) {
    result[0][0].walkable = true;
    result[result.length - 1][result[0].length - 1].walkable = true;
  }

  return result;
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