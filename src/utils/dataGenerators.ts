import type { Cell, Coordinate } from '@/types';

export interface DataGeneratorOptions {
  min?: number;
  max?: number;
  seed?: number;
}

function validatePositiveInt(value: number, name: string): void {
  if (!Number.isInteger(value)) {
    throw new Error(`${name} debe ser un entero`);
  }
  if (value <= 0) {
    throw new Error(`${name} debe ser mayor que 0`);
  }
}

function createCell(row: number, col: number, walkable = true, weight = 1): Cell {
  return { row, col, walkable, weight };
}

export function generateRandomArray(
  length: number = 30,
  min = 10,
  max = 100
): number[] {
  validatePositiveInt(length, 'length');
  validatePositiveInt(min, 'min');
  validatePositiveInt(max, 'max');

  if (min > max) {
    throw new Error('min debe ser menor o igual a max');
  }

  const result: number[] = [];
  for (let i = 0; i < length; i++) {
    const value = Math.floor(Math.random() * (max - min + 1)) + min;
    result.push(value);
  }
  return result;
}

export function generateNearlySortedArray(
  length: number,
  swaps: number = Math.floor(length / 10)
): number[] {
  validatePositiveInt(length, 'length');
  validatePositiveInt(swaps, 'swaps');

  const array: number[] = [];
  for (let i = 0; i < length; i++) {
    array.push(i + 1);
  }

  for (let i = 0; i < swaps; i++) {
    const idx1 = Math.floor(Math.random() * length);
    const idx2 = (idx1 + 1) % length;
    const temp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = temp;
  }

  return array;
}

export function generateReversedArray(length: number): number[] {
  validatePositiveInt(length, 'length');

  const result: number[] = [];
  for (let i = 0; i < length; i++) {
    result.push(length - i);
  }
  return result;
}

export function generateUniqueArray(length: number): number[] {
  validatePositiveInt(length, 'length');

  const result: number[] = [];
  const used = new Set<number>();

  while (result.length < length) {
    const value = Math.floor(Math.random() * length * 10) + 1;
    if (!used.has(value)) {
      used.add(value);
      result.push(value);
    }
  }

  return result;
}

export function generateEmptyGrid(
  rows: number = 20,
  cols: number = 20
): Cell[][] {
  validatePositiveInt(rows, 'rows');
  validatePositiveInt(cols, 'cols');

  const grid: Cell[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < cols; c++) {
      row.push(createCell(r, c, true, 1));
    }
    grid.push(row);
  }

  return grid;
}

export function generateMazeGrid(
  rows: number = 20,
  cols: number = 20,
  complexity: number = 0.3
): Cell[][] {
  validatePositiveInt(rows, 'rows');
  validatePositiveInt(cols, 'cols');

  if (complexity < 0 || complexity > 1) {
    throw new Error('complexity debe estar entre 0 y 1');
  }

  const grid = generateEmptyGrid(rows, cols);

  const start: Coordinate = { row: 0, col: 0 };
  const end: Coordinate = { row: rows - 1, col: cols - 1 };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isStartOrEnd = (r === start.row && c === start.col) || (r === end.row && c === end.col);
      if (!isStartOrEnd && Math.random() < complexity) {
        grid[r][c] = createCell(r, c, false, 0);
      }
    }
  }

  return grid;
}

export function generateSpiralMaze(rows: number, cols: number): Cell[][] {
  validatePositiveInt(rows, 'rows');
  validatePositiveInt(cols, 'cols');

  const grid = generateEmptyGrid(rows, cols);
  const visited = new Set<string>();
  let r = 0;
  let c = 0;
  let dr = 0;
  let dc = 1;

  while (visited.size < rows * cols) {
    visited.add(`${r},${c}`);

    const isStartOrEnd = (r === 0 && c === 0) || (r === rows - 1 && c === cols - 1);
    if (!isStartOrEnd) {
      grid[r][c] = createCell(r, c, false, 0);
    }

    const nextR = r + dr;
    const nextC = c + dc;

    if (
      nextR < 0 ||
      nextR >= rows ||
      nextC < 0 ||
      nextC >= cols ||
      visited.has(`${nextR},${nextC}`)
    ) {
      [dr, dc] = [dc, -dr];
    }

    r += dr;
    c += dc;
  }

  return grid;
}

export function generatePathMaze(rows: number, cols: number): Cell[][] {
  validatePositiveInt(rows, 'rows');
  validatePositiveInt(cols, 'cols');

  const grid = generateEmptyGrid(rows, cols);
  const visited = new Set<string>();
  const stack: Coordinate[] = [{ row: 0, col: 0 }];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const key = `${current.row},${current.col}`;

    if (visited.has(key)) {
      stack.pop();
      continue;
    }

    visited.add(key);

    const neighbors: Coordinate[] = [
      { row: current.row - 2, col: current.col },
      { row: current.row + 2, col: current.col },
      { row: current.row, col: current.col - 2 },
      { row: current.row, col: current.col + 2 },
    ].filter(
      (n) =>
        n.row > 0 &&
        n.row < rows - 1 &&
        n.col > 0 &&
        n.col < cols - 1 &&
        !visited.has(`${n.row},${n.col}`)
    );

    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      const midR = (current.row + next.row) / 2;
      const midC = (current.col + next.col) / 2;

      grid[current.row][current.col] = createCell(current.row, current.col, true, 1);
      grid[midR][midC] = createCell(midR, midC, true, 1);
      grid[next.row][next.col] = createCell(next.row, next.col, true, 1);

      stack.push(next);
    }
  }

  return grid;
}

export function cloneGrid(grid: Cell[][]): Cell[][] {
  return grid.map((row) => row.map((cell) => ({ ...cell })));
}

export function getStartPosition(): Coordinate {
  return { row: 0, col: 0 };
}

export function getEndPosition(grid: Cell[][]): Coordinate {
  return { row: grid.length - 1, col: grid[0].length - 1 };
}