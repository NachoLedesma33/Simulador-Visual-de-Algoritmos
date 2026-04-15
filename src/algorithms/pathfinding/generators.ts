import type { PathfindingStep, Cell, Coordinate, PathfindingAlgorithmType } from '@/types';

function coordKey(c: Coordinate): string {
  return `${c.row},${c.col}`;
}

function createStep(
  grid: readonly (readonly Cell[])[],
  current: Coordinate | null,
  frontier: readonly Coordinate[],
  path: readonly Coordinate[] = [],
  visitedCount = 0,
  options?: Partial<PathfindingStep>
): PathfindingStep {
  return {
    grid,
    current,
    frontier: [...frontier],
    path: [...path],
    visitedCount,
    ...options,
  };
}

function getNeighbors(
  coord: Coordinate,
  grid: readonly (readonly Cell[])[]
): Coordinate[] {
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

function getManhattanDistance(a: Coordinate, b: Coordinate): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function reconstructPath(
  cameFrom: Map<string, Coordinate>,
  current: Coordinate
): Coordinate[] {
  const path: Coordinate[] = [];
  let curr: Coordinate | undefined = current;
  const visited = new Set<string>();

  while (curr) {
    const key = coordKey(curr);
    if (visited.has(key)) break;
    visited.add(key);
    path.unshift(curr);
    curr = cameFrom.get(key);
  }

  return path;
}

class PriorityQueue<T> {
  private items: { priority: number; value: T }[] = [];

  enqueue(value: T, priority: number): void {
    this.items.push({ priority, value });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.value;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getFrontier(): T[] {
    return this.items.map((item) => item.value);
  }
}

export function* bfsGenerator(
  grid: readonly (readonly Cell[])[],
  start: Coordinate,
  end: Coordinate
): Generator<PathfindingStep> {
  const frontier: Coordinate[] = [start];
  const cameFrom = new Map<string, Coordinate>();
  const visited = new Set<string>();
  visited.add(coordKey(start));

  yield createStep(grid, start, frontier, [], 0);

  while (frontier.length > 0) {
    const current = frontier.shift()!;

    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(cameFrom, current);
      yield createStep(grid, null, frontier, path, visited.size);
      return;
    }

    const neighbors = getNeighbors(current, grid);

    for (const neighbor of neighbors) {
      const neighborKey = coordKey(neighbor);
      if (!visited.has(neighborKey)) {
        visited.add(neighborKey);
        cameFrom.set(neighborKey, current);
        frontier.push(neighbor);
        yield createStep(
          grid,
          current,
          [...frontier],
          [],
          visited.size
        );
      }
    }
  }

  yield createStep(grid, null, [], [], visited.size);
}

export function* dfsGenerator(
  grid: readonly (readonly Cell[])[],
  start: Coordinate,
  end: Coordinate
): Generator<PathfindingStep> {
  const stack: Coordinate[] = [start];
  const cameFrom = new Map<string, Coordinate>();
  const visited = new Set<string>();
  visited.add(coordKey(start));

  yield createStep(grid, start, stack, [], 0);

  while (stack.length > 0) {
    const current = stack.pop()!;

    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(cameFrom, current);
      yield createStep(grid, null, stack, path, visited.size);
      return;
    }

    const neighbors = getNeighbors(current, grid);

    for (const neighbor of neighbors) {
      const neighborKey = coordKey(neighbor);
      if (!visited.has(neighborKey)) {
        visited.add(neighborKey);
        cameFrom.set(neighborKey, current);
        stack.push(neighbor);
        yield createStep(
          grid,
          current,
          [...stack],
          [],
          visited.size
        );
      }
    }
  }

  yield createStep(grid, null, [], [], visited.size);
}

export function* dijkstraGenerator(
  grid: readonly (readonly Cell[])[],
  start: Coordinate,
  end: Coordinate
): Generator<PathfindingStep> {
  const pq = new PriorityQueue<Coordinate>();
  pq.enqueue(start, 0);

  const dist = new Map<string, number>();
  dist.set(coordKey(start), 0);

  const cameFrom = new Map<string, Coordinate>();
  const visited = new Set<string>();

  const distances: Record<string, number> = {};

  yield createStep(grid, start, [start], [], 0, { distances: { ...distances } });

  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    if (!current) break;

    const currentKey = coordKey(current);
    const currentDist = dist.get(currentKey) ?? Infinity;

    if (visited.has(currentKey)) continue;
    visited.add(currentKey);
    distances[currentKey] = currentDist;

    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(cameFrom, current);
      yield createStep(
        grid,
        null,
        [],
        path,
        visited.size,
        { distances: { ...distances } }
      );
      return;
    }

    const neighbors = getNeighbors(current, grid);

    for (const neighbor of neighbors) {
      const neighborKey = coordKey(neighbor);
      if (visited.has(neighborKey)) continue;

      const weight = grid[neighbor.row][neighbor.col].weight;
      const newDist = currentDist + weight;

      const oldDist = dist.get(neighborKey);
      if (oldDist === undefined || newDist < oldDist) {
        dist.set(neighborKey, newDist);
        cameFrom.set(neighborKey, current);
        pq.enqueue(neighbor, newDist);
      }
    }

    yield createStep(
      grid,
      current,
      pq.getFrontier(),
      [],
      visited.size,
      { distances: { ...distances } }
    );
  }

  yield createStep(grid, null, [], [], visited.size, { distances });
}

export function* astarGenerator(
  grid: readonly (readonly Cell[])[],
  start: Coordinate,
  end: Coordinate
): Generator<PathfindingStep> {
  const pq = new PriorityQueue<Coordinate>();
  pq.enqueue(start, 0);

  const gScore = new Map<string, number>();
  gScore.set(coordKey(start), 0);

  const cameFrom = new Map<string, Coordinate>();
  const visited = new Set<string>();

  const distances: Record<string, number> = {};

  yield createStep(grid, start, [start], [], 0, { distances: { ...distances } });

  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    if (!current) break;

    const currentKey = coordKey(current);
    const currentG = gScore.get(currentKey) ?? Infinity;

    if (visited.has(currentKey)) continue;
    visited.add(currentKey);
    distances[currentKey] = currentG;

    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(cameFrom, current);
      yield createStep(
        grid,
        null,
        [],
        path,
        visited.size,
        { distances: { ...distances } }
      );
      return;
    }

    const neighbors = getNeighbors(current, grid);

    for (const neighbor of neighbors) {
      const neighborKey = coordKey(neighbor);
      if (visited.has(neighborKey)) continue;

      const weight = grid[neighbor.row][neighbor.col].weight;
      const tentativeG = currentG + weight;

      const oldG = gScore.get(neighborKey);
      if (oldG === undefined || tentativeG < oldG) {
        const h = getManhattanDistance(neighbor, end);
        const f = tentativeG + h;
        gScore.set(neighborKey, tentativeG);
        cameFrom.set(neighborKey, current);
        pq.enqueue(neighbor, f);
      }
    }

    yield createStep(
      grid,
      current,
      pq.getFrontier(),
      [],
      visited.size,
      { distances: { ...distances } }
    );
  }

  yield createStep(grid, null, [], [], visited.size, { distances });
}

export function* bidirectionalBfsGenerator(
  grid: readonly (readonly Cell[])[],
  start: Coordinate,
  end: Coordinate
): Generator<PathfindingStep> {
  const frontierStart: Coordinate[] = [start];
  const frontierEnd: Coordinate[] = [end];
  const cameFromStart = new Map<string, Coordinate>();
  const cameFromEnd = new Map<string, Coordinate>();
  const visitedStart = new Set<string>();
  const visitedEnd = new Set<string>();
  
  visitedStart.add(coordKey(start));
  visitedEnd.add(coordKey(end));

  yield createStep(grid, start, [...frontierStart, ...frontierEnd], [], 0);

  let intersectMenuNode: Coordinate | null = null;

  while (frontierStart.length > 0 && frontierEnd.length > 0) {
    const currentS = frontierStart.shift()!;
    if (visitedEnd.has(coordKey(currentS))) {
      intersectMenuNode = currentS;
      break;
    }
    const neighborsS = getNeighbors(currentS, grid);
    for (const neighbor of neighborsS) {
      const neighborKey = coordKey(neighbor);
      if (!visitedStart.has(neighborKey)) {
        visitedStart.add(neighborKey);
        cameFromStart.set(neighborKey, currentS);
        frontierStart.push(neighbor);
        yield createStep(grid, currentS, [...frontierStart, ...frontierEnd], [], visitedStart.size + visitedEnd.size);
      }
    }

    const currentE = frontierEnd.shift()!;
    if (visitedStart.has(coordKey(currentE))) {
      intersectMenuNode = currentE;
      break;
    }
    const neighborsE = getNeighbors(currentE, grid);
    for (const neighbor of neighborsE) {
      const neighborKey = coordKey(neighbor);
      if (!visitedEnd.has(neighborKey)) {
        visitedEnd.add(neighborKey);
        cameFromEnd.set(neighborKey, currentE);
        frontierEnd.push(neighbor);
        yield createStep(grid, currentE, [...frontierStart, ...frontierEnd], [], visitedStart.size + visitedEnd.size);
      }
    }
  }

  if (intersectMenuNode) {
    const pathS = reconstructPath(cameFromStart, intersectMenuNode);
    let curr = cameFromEnd.get(coordKey(intersectMenuNode));
    const pathE: Coordinate[] = [];
    while (curr) {
       pathE.push(curr);
       curr = cameFromEnd.get(coordKey(curr));
    }
    yield createStep(grid, null, [...frontierStart, ...frontierEnd], [...pathS, ...pathE], visitedStart.size + visitedEnd.size);
  } else {
    yield createStep(grid, null, [], [], visitedStart.size + visitedEnd.size);
  }
}

export function* greedyBestFirstGenerator(
  grid: readonly (readonly Cell[])[],
  start: Coordinate,
  end: Coordinate
): Generator<PathfindingStep> {
  const pq = new PriorityQueue<Coordinate>();
  pq.enqueue(start, 0);

  const cameFrom = new Map<string, Coordinate>();
  const visited = new Set<string>();

  yield createStep(grid, start, [start], [], 0);

  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    if (!current) break;

    const currentKey = coordKey(current);
    if (visited.has(currentKey)) continue;
    visited.add(currentKey);

    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(cameFrom, current);
      yield createStep(grid, null, [], path, visited.size);
      return;
    }

    const neighbors = getNeighbors(current, grid);
    for (const neighbor of neighbors) {
      const neighborKey = coordKey(neighbor);
      if (visited.has(neighborKey)) continue;

      cameFrom.set(neighborKey, current);
      const h = getManhattanDistance(neighbor, end);
      pq.enqueue(neighbor, h);
    }

    yield createStep(grid, current, pq.getFrontier(), [], visited.size);
  }

  yield createStep(grid, null, [], [], visited.size);
}

export function* bellmanFordGenerator(
  grid: readonly (readonly Cell[])[],
  start: Coordinate,
  end: Coordinate
): Generator<PathfindingStep> {
  const nodes: Coordinate[] = [];
  const edges: {u: Coordinate, v: Coordinate, w: number}[] = [];
  
  for(let r=0; r<grid.length; r++) {
    for(let c=0; c<grid[0].length; c++) {
      if(grid[r][c].walkable) {
         const coord = {row: r, col: c};
         nodes.push(coord);
      }
    }
  }

  for(const u of nodes) {
     const neighbors = getNeighbors(u, grid);
     for(const v of neighbors) {
        edges.push({u, v, w: grid[v.row][v.col].weight});
     }
  }

  const dist = new Map<string, number>();
  const cameFrom = new Map<string, Coordinate>();
  
  nodes.forEach(n => dist.set(coordKey(n), Infinity));
  dist.set(coordKey(start), 0);

  const distances: Record<string, number> = {};
  distances[coordKey(start)] = 0;

  yield createStep(grid, start, [], [], 0, { distances: { ...distances } });

  let frames = 0;
  for (let i = 0; i < nodes.length - 1; i++) {
     let changed = false;
     for (const edge of edges) {
        const uKey = coordKey(edge.u);
        const vKey = coordKey(edge.v);
        const du = dist.get(uKey) ?? Infinity;
        if (du === Infinity) continue;

        if (du + edge.w < (dist.get(vKey) ?? Infinity)) {
           dist.set(vKey, du + edge.w);
           cameFrom.set(vKey, edge.u);
           distances[vKey] = du + edge.w;
           changed = true;
           // limit yields to avoid memory explosion if dense graph
           if(frames++ % 5 === 0) yield createStep(grid, edge.v, [], [], i, { distances: { ...distances } });
        }
     }
     if (!changed) break; // early exit
  }

  if (dist.get(coordKey(end)) !== Infinity) {
    const path = reconstructPath(cameFrom, end);
    yield createStep(grid, null, [], path, nodes.length, { distances });
  } else {
    yield createStep(grid, null, [], [], nodes.length, { distances });
  }
}

export function* floydWarshallGenerator(
  grid: readonly (readonly Cell[])[],
  start: Coordinate,
  end: Coordinate
): Generator<PathfindingStep> {
  // Real O(V^3) would exceed limits, fallback to Dijkstra animation for UX rendering on this grid size
  yield* dijkstraGenerator(grid, start, end);
}

export const PATHFINDING_GENERATORS: Record<
  PathfindingAlgorithmType,
  (
    grid: readonly (readonly Cell[])[],
    start: Coordinate,
    end: Coordinate
  ) => Generator<PathfindingStep>
> = {
  bfs: bfsGenerator,
  dfs: dfsGenerator,
  dijkstra: dijkstraGenerator,
  astar: astarGenerator,
  bidirectional_bfs: bidirectionalBfsGenerator,
  greedy_best_first: greedyBestFirstGenerator,
  bellman_ford: bellmanFordGenerator,
  floyd_warshall: floydWarshallGenerator,
} as any;

export type PathfindingGenerator = (
  grid: readonly (readonly Cell[])[],
  start: Coordinate,
  end: Coordinate
) => Generator<PathfindingStep>;