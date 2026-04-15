import type {
  AlgorithmType,
  AlgorithmCategory,
  AlgorithmStep,
  AlgorithmInfo,
} from '@/types';
import { SORTING_GENERATORS } from './sorting';
import { PATHFINDING_GENERATORS } from './pathfinding';
import type { Coordinate, Cell } from '@/types';

interface SortingInput {
  array: readonly number[];
}

interface PathfindingInput {
  grid: readonly (readonly Cell[])[];
  start: Coordinate;
  end: Coordinate;
}

type AlgorithmInput = SortingInput | PathfindingInput;

const ALGORITHM_CATEGORIES: Record<AlgorithmType, AlgorithmCategory> = {
  bubble: 'sorting',
  quick: 'sorting',
  merge: 'sorting',
  insertion: 'sorting',
  selection: 'sorting',
  heap: 'sorting',
  shell: 'sorting',
  radix: 'sorting',
  counting: 'sorting',
  tim: 'sorting',
  dijkstra: 'pathfinding',
  astar: 'pathfinding',
  bfs: 'pathfinding',
  dfs: 'pathfinding',
  bidirectional_bfs: 'pathfinding',
  greedy_best_first: 'pathfinding',
  bellman_ford: 'pathfinding',
  floyd_warshall: 'pathfinding',
  inorder: 'tree',
  preorder: 'tree',
  postorder: 'tree',
  level_order: 'tree',
  bst_insert: 'tree',
  bst_delete: 'tree',
  avl_rotate: 'tree',
  red_black_insert: 'tree',
  kruskal: 'graph',
  prim: 'graph',
  topological_sort: 'graph',
  tarjan_scc: 'graph',
  kosaraju: 'graph',
  articulation_points: 'graph',
};

const ALGORITHM_INFO: Record<AlgorithmType, AlgorithmInfo> = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    category: 'sorting',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    description:
      'Compara elementos adyacentes e intercambia si están en orden incorrecto. Repite hasta que no haya intercambios.',
    bestCase: 'O(n) - ya ordenado',
    worstCase: 'O(n²) - orden inverso',
    stable: true,
    inPlace: true,
  },
  quick: {
    id: 'quick',
    name: 'Quick Sort',
    category: 'sorting',
    complexity: { time: 'O(n log n)', space: 'O(log n)' },
    description:
      'Divide y vencerás. Elige un pivote y particiona el array. Extremadamente eficiente en la práctica.',
    bestCase: 'O(n log n)',
    worstCase: 'O(n²) - pivote extremo',
    stable: false,
    inPlace: true,
  },
  merge: {
    id: 'merge',
    name: 'Merge Sort',
    category: 'sorting',
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    description:
      'Divide y vencerás recursivo. Divide el array, ordena y mezcla. Estable pero requiere espacio extra.',
    bestCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    stable: true,
    inPlace: false,
  },
  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    category: 'sorting',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    description:
      'Inserta cada elemento en su posición correcta en el subarray ordenado. Excelente para arrays casi ordenados.',
    bestCase: 'O(n) - ya ordenado',
    worstCase: 'O(n²) - orden inverso',
    stable: true,
    inPlace: true,
  },
  selection: {
    id: 'selection',
    name: 'Selection Sort',
    category: 'sorting',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    description:
      'Encuentra el mínimo en cada pasada y lo coloca al inicio. Realiza exactamente n intercambios.',
    bestCase: 'O(n²)',
    worstCase: 'O(n²)',
    stable: false,
    inPlace: true,
  },
  heap: {
    id: 'heap',
    name: 'Heap Sort',
    category: 'sorting',
    complexity: { time: 'O(n log n)', space: 'O(1)' },
    description:
      'Usa un heap binario para ordenar. Fase de construcción del heap y fase de extracción.',
    bestCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    stable: false,
    inPlace: true,
  },
  shell: {
    id: 'shell',
    name: 'Shell Sort',
    category: 'sorting',
    complexity: { time: 'O(n log² n)', space: 'O(1)' },
    description:
      'Generalización de Insertion Sort. Usa gaps decrecientes para permitir intercambios a larga distancia.',
    bestCase: 'O(n log n)',
    worstCase: 'O(n²)',
    stable: false,
    inPlace: true,
  },
  radix: {
    id: 'radix',
    name: 'Radix Sort',
    category: 'sorting',
    complexity: { time: 'O(nk)', space: 'O(n + k)' },
    description:
      'Ordena por dígitos ( LSD o MSD ). No compara elementos directamente. k = número de dígitos.',
    bestCase: 'O(nk)',
    worstCase: 'O(nk)',
    stable: true,
    inPlace: false,
  },
  counting: {
    id: 'counting',
    name: 'Counting Sort',
    category: 'sorting',
    complexity: { time: 'O(n + k)', space: 'O(k)' },
    description:
      'Cuenta ocurrencias de cada valor. Para enteros en rango conocido. Estables y lineales.',
    bestCase: 'O(n + k)',
    worstCase: 'O(n + k)',
    stable: true,
    inPlace: false,
  },
  tim: {
    id: 'tim',
    name: 'Timsort',
    category: 'sorting',
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    description:
      'Híbrido de Merge e Insertion. Optimiza para datos del mundo real. Usado en Python y Java.',
    bestCase: 'O(n)',
    worstCase: 'O(n log n)',
    stable: true,
    inPlace: false,
  },
  bfs: {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'pathfinding',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    description:
      'Explora nivel por nivel usando cola FIFO. Garantiza el camino más corto en grafos no pesados.',
    bestCase: 'O(V + E)',
    worstCase: 'O(V + E)',
  },
  dfs: {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'pathfinding',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    description:
      'Explora en profundidad usando pila LIFO. Útil para detectar ciclos y componentes conexas.',
    bestCase: 'O(V + E)',
    worstCase: 'O(V + E)',
  },
  dijkstra: {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'pathfinding',
    complexity: { time: 'O((V + E) log V)', space: 'O(V)' },
    description:
      'Garantiza el camino más corto en grafos con pesos no negativos. Explora en orden de distancia.',
    bestCase: 'O(E log V)',
    worstCase: 'O((V + E) log V)',
  },
  astar: {
    id: 'astar',
    name: 'A* Search',
    category: 'pathfinding',
    complexity: { time: 'O((V + E) log V)', space: 'O(V)' },
    description:
      'Búsqueda informada con heurística Manhattan. Combina coste real g(n) y estimado h(n).',
    bestCase: 'O(E)',
    worstCase: 'O((V + E) log V)',
  },
  bidirectional_bfs: {
    id: 'bidirectional_bfs',
    name: 'Bidirectional BFS',
    category: 'pathfinding',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    description:
      'Ejecuta BFS desde inicio y objetivo simultáneamente. Reduce espacio de búsqueda.',
    bestCase: 'O(V + E)',
    worstCase: 'O(V + E)',
  },
  greedy_best_first: {
    id: 'greedy_best_first',
    name: 'Greedy Best-First',
    category: 'pathfinding',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    description:
      'Solo usa heurística h(n). Rápido pero no garantiza óptimo. Puede alcanzar mínimos locales.',
    bestCase: 'O(E)',
    worstCase: 'O(V + E)',
  },
  bellman_ford: {
    id: 'bellman_ford',
    name: 'Bellman-Ford',
    category: 'pathfinding',
    complexity: { time: 'O(VE)', space: 'O(V)' },
    description:
      'Maneja pesos negativos. Detecta ciclos negativos. Más lento que Dijkstra.',
    bestCase: 'O(VE)',
    worstCase: 'O(VE)',
  },
  floyd_warshall: {
    id: 'floyd_warshall',
    name: 'Floyd-Warshall',
    category: 'pathfinding',
    complexity: { time: 'O(V³)', space: 'O(V²)' },
    description:
      'Algoritmo de pares. Calcula caminos más cortos entre todos los nodos. Para grafos densos.',
    bestCase: 'O(V³)',
    worstCase: 'O(V³)',
  },
  inorder: {
    id: 'inorder',
    name: 'Inorder Traversal',
    category: 'tree',
    complexity: { time: 'O(n)', space: 'O(h)' },
    description:
      'Recorre: izquierda, raíz, derecha. En BST produce orden ascendente.',
    bestCase: 'O(n)',
    worstCase: 'O(n)',
  },
  preorder: {
    id: 'preorder',
    name: 'Preorder Traversal',
    category: 'tree',
    complexity: { time: 'O(n)', space: 'O(h)' },
    description:
      'Recorre: raíz, izquierda, derecha. Útil para copiar árboles.',
    bestCase: 'O(n)',
    worstCase: 'O(n)',
  },
  postorder: {
    id: 'postorder',
    name: 'Postorder Traversal',
    category: 'tree',
    complexity: { time: 'O(n)', space: 'O(h)' },
    description:
      'Recorre: izquierda, derecha, raíz. Útil para eliminar nodos o calcular expresiones.',
    bestCase: 'O(n)',
    worstCase: 'O(n)',
  },
  level_order: {
    id: 'level_order',
    name: 'Level Order (BFS)',
    category: 'tree',
    complexity: { time: 'O(n)', space: 'O(n)' },
    description:
      'Recorre nivel por nivel usando cola. Útil para encontrar nodos por profundidad.',
    bestCase: 'O(n)',
    worstCase: 'O(n)',
  },
  bst_insert: {
    id: 'bst_insert',
    name: 'BST Insert',
    category: 'tree',
    complexity: { time: 'O(h)', space: 'O(h)' },
    description:
      'Inserta en BST verificando BST property. Puede necesitar rebalanceo.',
    bestCase: 'O(log n)',
    worstCase: 'O(n)',
  },
  bst_delete: {
    id: 'bst_delete',
    name: 'BST Delete',
    category: 'tree',
    complexity: { time: 'O(h)', space: 'O(h)' },
    description:
      'Elimina nodos: caso hoja, un hijo, dos hijos (predecesor/sucesor).',
    bestCase: 'O(log n)',
    worstCase: 'O(n)',
  },
  avl_rotate: {
    id: 'avl_rotate',
    name: 'AVL Rotation',
    category: 'tree',
    complexity: { time: 'O(1)', space: 'O(1)' },
    description:
      'Rotaciones LL, RR, LR, RL para mantener balance factor ±1.',
    bestCase: 'O(1)',
    worstCase: 'O(1)',
  },
  red_black_insert: {
    id: 'red_black_insert',
    name: 'Red-Black Insert',
    category: 'tree',
    complexity: { time: 'O(log n)', space: 'O(log n)' },
    description:
      'Usa recoloración y rotaciones para mantener altura máxima ~2log(n+1).',
    bestCase: 'O(log n)',
    worstCase: 'O(log n)',
  },
  kruskal: {
    id: 'kruskal',
    name: "Kruskal's Algorithm",
    category: 'graph',
    complexity: { time: 'O(E log V)', space: 'O(V + E)' },
    description:
      'MST usando Union-Find. Añade aristas en orden ascendente de peso.',
    bestCase: 'O(E log V)',
    worstCase: 'O(E log V)',
  },
  prim: {
    id: 'prim',
    name: "Prim's Algorithm",
    category: 'graph',
    complexity: { time: 'O(E log V)', space: 'O(V + E)' },
    description:
      'MST desde un nodo. Similar a Dijkstra con tracking de MST.',
    bestCase: 'O(E log V)',
    worstCase: 'O(E log V)',
  },
  topological_sort: {
    id: 'topological_sort',
    name: 'Topological Sort',
    category: 'graph',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    description:
      'Ordena nodos respetando dependencias. Usa DFS o Kahn (cola).',
    bestCase: 'O(V + E)',
    worstCase: 'O(V + E)',
  },
  tarjan_scc: {
    id: 'tarjan_scc',
    name: 'Tarjan SCC',
    category: 'graph',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    description:
      'Encuentra SCCs en tiempo lineal. Usa DFS con stack y lowlink.',
    bestCase: 'O(V + E)',
    worstCase: 'O(V + E)',
  },
  kosaraju: {
    id: 'kosaraju',
    name: 'Kosaraju SCC',
    category: 'graph',
    complexity: { time: 'O(V + E)', space: 'O(V + E)' },
    description:
      'Dos DFS. Simple pero requiere dos pasadas. Encuentra SCCs.',
    bestCase: 'O(V + E)',
    worstCase: 'O(V + E)',
  },
  articulation_points: {
    id: 'articulation_points',
    name: 'Articulation Points',
    category: 'graph',
    complexity: { time: 'O(V + E)', space: 'O(V)' },
    description:
      'Encuentra puntos de corte whose removal disconnecta el grafo. Usa DFS y lowlink.',
    bestCase: 'O(V + E)',
    worstCase: 'O(V + E)',
  },
};

export function getAlgorithmGenerator<T extends AlgorithmType>(
  type: T,
  data: AlgorithmInput
): Generator<AlgorithmStep> {
  const category = ALGORITHM_CATEGORIES[type];

  if (category === 'sorting') {
    const input = data as SortingInput;
    const generator = SORTING_GENERATORS[type as keyof typeof SORTING_GENERATORS];
    if (generator) {
      return generator(input.array) as Generator<AlgorithmStep>;
    }
  }

  if (category === 'pathfinding') {
    const input = data as PathfindingInput;
    const generator = PATHFINDING_GENERATORS[type as keyof typeof PATHFINDING_GENERATORS];
    if (generator) {
      return generator(input.grid, input.start, input.end) as Generator<AlgorithmStep>;
    }
  }

  throw new Error(`Algorithm ${type} not implemented`);
}

export function getAlgorithmInfo(type: AlgorithmType): AlgorithmInfo {
  const info = ALGORITHM_INFO[type];
  if (!info) {
    throw new Error(`No info for algorithm ${type}`);
  }
  return Object.freeze({ ...info });
}

export function getAlgorithmsByCategory(
  category: AlgorithmCategory
): AlgorithmType[] {
  return Object.keys(ALGORITHM_CATEGORIES).filter(
    (key) => ALGORITHM_CATEGORIES[key as AlgorithmType] === category
  ) as AlgorithmType[];
}

export { ALGORITHM_CATEGORIES };
export type { AlgorithmInput };