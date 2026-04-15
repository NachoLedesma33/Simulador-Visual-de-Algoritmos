export type SortingAlgorithmType =
  | 'bubble'
  | 'quick'
  | 'merge'
  | 'insertion'
  | 'selection'
  | 'heap'
  | 'shell'
  | 'radix'
  | 'counting'
  | 'tim';

export type PathfindingAlgorithmType =
  | 'dijkstra'
  | 'astar'
  | 'bfs'
  | 'dfs'
  | 'bidirectional_bfs'
  | 'greedy_best_first'
  | 'bellman_ford'
  | 'floyd_warshall';

export type TreeAlgorithmType =
  | 'inorder'
  | 'preorder'
  | 'postorder'
  | 'level_order'
  | 'bst_insert'
  | 'bst_delete'
  | 'avl_rotate'
  | 'red_black_insert';

export type GraphAlgorithmType =
  | 'kruskal'
  | 'prim'
  | 'topological_sort'
  | 'tarjan_scc'
  | 'kosaraju'
  | 'articulation_points';

export type AlgorithmType =
  | SortingAlgorithmType
  | PathfindingAlgorithmType
  | TreeAlgorithmType
  | GraphAlgorithmType;

export interface AlgorithmInfo {
  id: AlgorithmType;
  name: string;
  category: AlgorithmCategory;
  complexity: {
    time: string;
    space: string;
  };
  description: string;
  bestCase?: string;
  worstCase?: string;
  stable?: boolean;
  inPlace?: boolean;
}

export type VisualizationState = 'idle' | 'running' | 'paused' | 'completed';

export type AlgorithmCategory = 'sorting' | 'pathfinding' | 'tree' | 'graph';

export interface SortingStep {
  array: readonly number[];
  comparing: readonly [number, number] | null;
  swapping: readonly [number, number] | null;
  sorted: readonly number[];
  /** Index of pivot element for quicksort */
  pivot?: number;
  /** Range [start, end] being merged in merge sort */
  merging?: readonly [number, number];
  /** Buckets for radix sort visualization */
  buckets?: readonly number[][];
}

export interface PathfindingStep {
  grid: readonly (readonly Cell[])[];
  current: Coordinate | null;
  frontier: readonly Coordinate[];
  path: readonly Coordinate[];
  visitedCount: number;
  /** Frontier for bidirectional BFS from start */
  frontierA?: readonly Coordinate[];
  /** Frontier for bidirectional BFS from goal */
  frontierB?: readonly Coordinate[];
  /** Accumulated distances for Dijkstra/A* */
  distances?: Record<string, number>;
}

export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  /** AVL tree height for balance factor */
  height?: number;
  /** Red-Black tree color property */
  color?: 'red' | 'black';
  x: number;
  y: number;
}

export interface TreeStep {
  root: TreeNode | null;
  current: TreeNode | null;
  visited: readonly number[];
  pending: readonly (TreeNode | null)[];
  /** Current tree operation being performed */
  operation?: 'insert' | 'delete' | 'search' | 'traverse';
}

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  /** Optional display label */
  label?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  /** Edge weight for weighted algorithms */
  weight?: number;
  /** Whether edge is directed */
  directed?: boolean;
}

export interface GraphStep {
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
  current: string | null;
  visited: readonly string[];
  frontier: readonly string[];
  path: readonly string[];
  /** Strongly connected components for SCC algorithms */
  sccs?: readonly string[][];
  /** Topological ordering for sort algorithms */
  topOrder?: readonly string[];
}

export type AlgorithmStep = SortingStep | PathfindingStep | TreeStep | GraphStep;

export interface ComplexityInfo {
  time: string;
  space: string;
  best: string;
  worst: string;
}

export interface AlgorithmConfig {
  name: string;
  type: AlgorithmType;
  category: AlgorithmCategory;
  complexity: ComplexityInfo;
  description: string;
  /** Algorithm preserves relative order of equal elements */
  stable?: boolean;
  /** Algorithm works with weighted graphs */
  weighted?: boolean;
}

export type AlgorithmRegistry = Record<AlgorithmType, AlgorithmConfig>;

export interface PlayerControls {
  state: VisualizationState;
  speed: number;
  stepIndex: number;
  totalSteps: number;
}

export interface Coordinate {
  row: number;
  col: number;
}

export interface Cell {
  row: number;
  col: number;
  walkable: boolean;
  weight: number;
  /** A* heuristic cost to goal */
  heuristic?: number;
  /** A* fScore (gScore + heuristic) */
  fScore?: number;
  /** A* gScore (cost from start) */
  gScore?: number;
  /** Parent for path reconstruction */
  parent?: Coordinate;
}