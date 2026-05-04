import type { SortingAlgorithmType, PathfindingAlgorithmType } from '@/types';

export type SupportedAlgorithmType = SortingAlgorithmType | PathfindingAlgorithmType;

export interface AlgorithmTheory {
  id: SupportedAlgorithmType;
  concept: string;
  howItWorks: string;
  whenToUse: string;
  advantages: string[];
  disadvantages: string[];
  realWorldExample: string;
  pseudocode: string;
}

export const ALGORITHM_THEORY: Record<SupportedAlgorithmType, AlgorithmTheory> = {
  bubble: {
    id: 'bubble',
    concept: 'Bubble Sort es el algoritmo de ordenamiento más simple y básico. Funciona comparando elementos adyacentes e intercambiándolos si están en el orden incorrecto.',
    howItWorks: 'El algoritmo recorre el array múltiples veces. En cada pasada, compara elementos vecinos y los intercambia si el primero es mayor que el segundo. Después de cada pasada, el elemento más grande "burbujea" hacia el final. El proceso se repite hasta que no hay intercambios.',
    whenToUse: 'Únicamente para propósitos educativos o arrays muy pequeños. No recomendado para datos reales debido a su ineficiencia.',
    advantages: ['Fácil de entender e implementar', 'Código simple y legible', 'No requiere memoria extra', ' Estable (mantiene el orden relativo de elementos iguales)'],
    disadvantages: ['Complejidad O(n²) muy lenta', 'Muchos intercambios innecesarios', 'No escalable'],
    realWorldExample: 'Rara vez usado en producción. Puede verse en entrevistas técnicas para demostrar comprensión básica de algoritmos.',
    pseudocode: `for i = 0 to n-1
  for j = 0 to n-i-1
    if array[j] > array[j+1]
      swap(array[j], array[j+1])`,
  },
  quick: {
    id: 'quick',
    concept: 'Quick Sort es un algoritmo de divide y vencerás que selecciona un elemento como pivote y particiona el array alrededor de ese pivote.',
    howItWorks: '1. Seleccionar un elemento como pivote. 2. Particionar: mover elementos menores a la izquierda y mayores a la derecha. 3. Aplicar recursivamente a las subarrays resultantes. El pivote queda en su posición final.',
    whenToUse: 'Cuando necesitas buen rendimiento promedio y puedes tolerar que no sea estable.Excelente para arrays grandes en memoria.',
    advantages: ['Muy rápido en promedio O(n log n)', 'Eficiente en memoria', 'Código relativamente simple'],
    disadvantages: ['Peor caso O(n²) si pivotes son extremos', 'No estable', 'Recursividad puede causar stack overflow'],
    realWorldExample: 'Usado en libraries modernas como Java Arrays.sort() para tipos primitivos.',
    pseudocode: `function quicksort(array, low, high)
  if low < high
    pivot = partition(array, low, high)
    quicksort(array, low, pivot-1)
    quicksort(array, pivot+1, high)

function partition(array, low, high)
  pivot = array[high]
  i = low - 1
  for j = low to high-1
    if array[j] <= pivot
      i++ 
      swap(array[i], array[j])
  swap(array[i+1], array[high])
  return i + 1`,
  },
  merge: {
    id: 'merge',
    concept: 'Merge Sort divide el array en mitades recursivamente, ordena cada mitad y luego las mezcla (merge) en un array ordenado.',
    howItWorks: '1. Dividir el array por la mitad hasta tener elementos individuales. 2. Combinar pares de arrays ordenadas: comparar primeros elementos y colocar el menor. 3. Repetir hasta tener un array ordenado completo.',
    whenToUse: 'Cuando necesitas un algoritmo estable y prefieres predictibilidad en el rendimiento. Ideal para linked lists.',
    advantages: ['Siempre O(n log n) garantizado', 'Estable', 'Excelente para external sorting'],
    disadvantages: ['Requiere O(n) espacio extra', 'Más constante que Quick Sort', '複잡'],
    realWorldExample: 'Usado en sistemas de archivos grandes y cuando se necesita ordenamiento externo.',
    pseudocode: `function mergesort(array)
  if length(array) <= 1
    return array
  mid = length(array) / 2
  left = mergesort(array[0:mid])
  right = mergesort(array[mid:])
  return merge(left, right)

function merge(left, right)
  result = []
  while left and right not empty
    if left[0] <= right[0]
      result.push(left.shift())
    else
      result.push(right.shift())
  result.push(left or right)
  return result`,
  },
  insertion: {
    id: 'insertion',
    concept: 'Insertion Sort construye el array ordenado incrementalmente, insertando cada nuevo elemento en su posición correcta dentro del subarray ordenado.',
    howItWorks: '1. Empezar con el primer elemento como subarray ordenado. 2. Para cada elemento siguiente, desplazarlo izquierda hasta que esté en su posición correcta. 3. Repetir hasta que todo el array esté ordenado.',
    whenToUse: 'Arrays casi ordenados o muy pequeños. También para mantener estructura de datos ordenada dinámicamente.',
    advantages: ['O(n) en mejor caso (ya ordenado)', 'Estable', 'In-place', 'Bueno para datos online'],
    disadvantages: ['O(n²) en caso promedio y peor', 'Muchos desplazamientos'],
    realWorldExample: 'Usado enTimsort para runssmall casi ordenados.',
    pseudocode: `for i = 1 to n-1
  key = array[i]
  j = i - 1
  while j >= 0 and array[j] > key
    array[j+1] = array[j]
    j--
  array[j+1] = key`,
  },
  selection: {
    id: 'selection',
    concept: 'Selection Sort encuentra el elemento mínimo en cada pasada y lo coloca al inicio del subarray no ordenado.',
    howItWorks: '1. Buscar el elemento mínimo en todo el array. 2. Intercambiarlo con la primera posición. 3. Repetir con el resto del array (excluyendo ya ordenado).',
    whenToUse: 'Cuando el número de escrituras es costoso (ej: writing to flash). También para memorias pequeñas.',
    advantages: ['Siempre O(n) escrituras', 'In-place', 'Predictible'],
    disadvantages: ['Siempre O(n²) comparaciones', 'No estable', 'No adaptativo'],
    realWorldExample: 'Usado cuando escribir es más costoso que leer (ej: sistemas embebidos).',
    pseudocode: `for i = 0 to n-1
  minIdx = i
  for j = i+1 to n
    if array[j] < array[minIdx]
      minIdx = j
  swap(array[i], array[minIdx])`,
  },
  heap: {
    id: 'heap',
    concept: 'Heap Sort convierte el array en un heap binario (estructura de árbol), luego extrae elementos uno por uno del heap para producir el array ordenado.',
    howItWorks: '1. Construir un max-heap del array completo. 2. Intercambiar el primer elemento (máximo) con el último. 3. Reducir el heap size y restaurar heap property. 4. Repetir hasta que el heap esté vacío.',
    whenToUse: 'Cuando necesitas un sort in-place con O(n log n) guarantees. Memory constrained environments.',
    advantages: ['Guarantee O(n log n)', 'In-place O(1)', 'Predictible'],
    disadvantages: ['No estable', 'Cache-unfriendly', 'No adaptativo'],
    realWorldExample: 'Implementaciones de prioridad en sistemas operativos.',
    pseudocode: `// Build max heap
for i = n/2-1 downto 0
  heapify(array, n, i)

// Extract elements
for i = n-1 to 1
  swap(array[0], array[i])
  heapify(array, i, 0)`,
  },
  shell: {
    id: 'shell',
    concept: 'Shell Sort es una generalización de Insertion Sort que usa gaps decrecientes para mover elementos a su posición correcta más rápido.',
    howItWorks: '1. Ordenar elementos separados por gap. 2. Reducir el gap. 3. Repetir hasta gap = 1 (que se convierte en insertion sort). 4. El array está "casi ordenado" por lo que es rápido.',
    whenToUse: 'Cuando necesitas algo simple pero mejor que bubble/insertion.Arrays medianos.',
    advantages: ['Mejor que insertion para arrays grandes', 'Código simple', 'In-place'],
    disadvantages: ['Dependiente de gap chosen', 'No estable', 'Complejidad no garantizada'],
    realWorldExample: 'Usado en kernels sistemas operativos para arrays pequeños-medios.',
    pseudocode: `for gap = n/2 downto 1
  for i = gap to n-1
    temp = array[i]
    j = i
    while j >= gap and array[j-gap] > temp
      array[j] = array[j-gap]
      j -= gap
    array[j] = temp`,
  },
  radix: {
    id: 'radix',
    concept: 'Radix Sort ordena números procesando dígitos indivualmente, sin comparaciones directas. Puede ser LSD ( Least Significant Digit) o MSD (Most Significant Digit).',
    howItWorks: 'LSD: 1. Agrupar por último dígito usando counting sort. 2. Repetir para siguiente dígito. 3. Continuar hasta el dígito más significativo.',
    whenToUse: 'Cuando ordenas integers o strings con longitud fija. Datos con rango limitado.',
    advantages: ['O(n) para integers', 'Estable', 'Sin comparaciones'],
    disadvantages: ['Solo para tipos específicos', 'Requiere extra space', 'Más complejo'],
    realWorldExample: 'Usado en radix sort de enteros en bases de datos.',
    pseudocode: `// LSD Radix Sort
for d = 0 to maxDigits-1
  // Counting sort por dígito d
  for i = 0 to n-1
    bucket = getDigit(array[i], d)
    buckets[bucket].push(array[i])
  // Concatenar buckets
  array = concat(buckets)`,
  },
  counting: {
    id: 'counting',
    concept: 'Counting Sort cuenta ocurrencias de cada valor posible, luego reconstruye el array ordenado usando esos conteos.',
    howItWorks: '1. Encontrar rango de valores. 2. Crear array de conteos inicializado en 0. 3. Contar ocurrencias de cada valor. 4. Acumular conteos (positions). 5. Reconstruir array usando posições calculadas.',
    whenToUse: 'Cuando el rango de valores (k) es pequeño relativo a n. Enteros o datos categóricos.',
    advantages: ['O(n + k) lineal', 'Estable', 'No comparaciones'],
    disadvantages: ['Requiere saber rango', 'No aplicable a floats', 'Extra space O(k)'],
    realWorldExample: 'Ordenar calificaciones (0-100), colores, o datos categóricos.',
    pseudocode: `// Encontrar rango y contar
max = max(array)
count = array[max+1] initialized 0
for x in array
  count[x]++

// Calcular posiciones acumuladas
for i = 1 to max
  count[i] += count[i-1]

// Reconstruir array ordenado
for i = n-1 downto 0
  result[count[array[i]]-1] = array[i]
  count[array[i]]--`,
  },
  tim: {
    id: 'tim',
    concept: 'Timsort es un algoritmo híbrido de Insertion Sort y Merge Sort, optimizado para datos del mundo real que suelen tener patrones naturales.',
    howItWorks: '1. Dividir en runs (secuencias ordenadas, min 32). 2. Ordenar cada run con insertion sort. 3. Fusionar runs adyacentes usando merge sort. 4. Optimizar con tamaños de run calculados dinámicamente.',
    whenToUse: 'Datos del mundo real con patrones. Default en Python y Java para objects.',
    advantages: ['O(n) mejor caso (datos ordenados)', 'O(n log n) worst case', 'Estable', 'Adapta a patrones'],
    disadvantages: ['Complexo de implementar', 'Requires extra space', 'No tan intuitivo'],
    realWorldExample: 'Default sorting en Python (list.sort()), Java (Collections.sort()).',
    pseudocode: `// Timsort simplificado
minRun = 32
// Dividir en runs
while i < n
  runStart = i
  runEnd = min(i+minRun-1, n-1)
  insertionSort(array, runStart, runEnd)
  // Fusionar runs
  while runs stack necesita merge
    mergeTopRuns()`,
  },
  bfs: {
    id: 'bfs',
    concept: 'Breadth-First Search explora el grafo nivel por nivel usando una cola. Garantiza encontrar el camino más corto en grafos no pesados.',
    howItWorks: '1. Encolar vértice inicial y marcar como visitado. 2. Mientras cola no vacía: a) Desencolar vértice actual. b) Para cada vecino no visitado: marcar y encolar.',
    whenToUse: 'Encontrar camino más corto en grafos no pesados. Verificar si hay camino. Nivel por nivel exploration.',
    advantages: ['Encuentra shortest path', 'Simple de implementar', 'Memory eficiente'],
    disadvantages: ['O(V+E) para grafos densos', 'Guarda todos los vecinos'],
    realWorldExample: 'Redes sociales (amigos de amigos), shortest path en maps, level-order tree traversal.',
    pseudocode: `function BFS(graph, start)
  queue = [start]
  visited = {start}
  
  while queue not empty
    node = queue.shift()
    visit(node)
    
    for neighbor in graph[node]
      if neighbor not in visited
        visited.add(neighbor)
        queue.push(neighbor)`,
  },
  dfs: {
    id: 'dfs',
    concept: 'Depth-First Search explora lo más profundo posible antes de retroceder. Usa栈 (recursión o explícito).',
    howItWorks: '1. Apilar vértice inicial. 2. Mientras栈no vacío: a) Desapilar vértice actual. b) Si no visitado: marcar, procesar. c) Apilar vecinos no visitados.',
    whenToUse: 'Detectar ciclos, topological sort, encontrar path, connectivity.',
    advantages: ['Menos memory que BFS para deep graphs', 'Encuentra cualquier path'],
    disadvantages: ['No garantiza shortest path', 'Puede quedarse en deep recursion'],
    realWorldExample: 'Solving mazes, detecting ciclos en grafos, dependency resolution.',
    pseudocode: `function DFS(graph, start)
  stack = [start]
  visited = set()
  
  while stack not empty
    node = stack.pop()
    
    if node not in visited
      visited.add(node)
      visit(node)
      
      for neighbor in graph[node]
        if neighbor not in visited
          stack.push(neighbor)`,
  },
  dijkstra: {
    id: 'dijkstra',
    concept: "Dijkstra's Algorithm encuentra el camino más corto desde un vértice a todos los demás en grafos con pesos no negativos.",
    howItWorks: '1. Inicializar distancias con infinito, distancia[inicio] = 0. 2. Usar priority queue ordenada por distancia. 3. Mientras PQ no vacía: extraer mínimo, relajar vecinos (distancia + peso es menor?).',
    whenToUse: ' GPS/navegación, network routing, encontrar shortest path con pesos positivos.',
    advantages: ['Garantiza shortest path', 'Handles pesos positivos'],
    disadvantages: ['No maneja pesos negativos', 'O(E log V) o O(E + V log V)'],
    realWorldExample: 'GPS navigation, flight pricing shortest routes.',
    pseudocode: `function Dijkstra(graph, start)
  distances = {v: ∞ for v in graph}
  distances[start] = 0
  pq = [(0, start)]
  
  while pq not empty
    (dist, node) = pq.pop()
    
    if dist > distances[node]: continue
    
    for neighbor, weight in graph[node]
      newDist = dist + weight
      if newDist < distances[neighbor]
        distances[neighbor] = newDist
        pq.push((newDist, neighbor))
  
  return distances`,
  },
  astar: {
    id: 'astar',
    concept: 'A* (A-Star) es una búsqueda informada que combina el costo real g(n) con una heurística h(n) para estimar el costo total. Es óptimal si la heurística es admissible.',
    howItWorks: '1. Usar f(n) = g(n) + h(n) donde g=coste real, h=heurística estimada. 2. Expandir nodo con menor f. 3. Si nodo actual es goal, path encontrado.',
    whenToUse: 'Videojuegos (NPC pathfinding), puzzles, donde podés diseñar buena heurística.',
    advantages: ['Más rápido que Dijkstra con buena h', 'Garantiza óptimo con h admissible'],
    disadvantages: ['Requiere buena heurística', 'Puede usar más memoria'],
    realWorldExample: 'Videojuegos NPC pathfinding, robot navigation.',
    pseudocode: `function AStar(graph, start, goal, h)
  open = PriorityQueue()
  open.push((h(start), start))
  cameFrom = {}
  gScore = {start: 0}
  
  while open not empty
    (_, current) = open.pop()
    if current == goal: return reconstruct()
    
    for neighbor in graph[current]
      tentative_g = gScore[current] + dist(current, neighbor)
      if tentative_g < gScore.get(neighbor, ∞)
        cameFrom[neighbor] = current
        gScore[neighbor] = tentative_g
        f = tentative_g + h(neighbor)
        open.push((f, neighbor))
  
  return failure`,
  },
  bidirectional_bfs: {
    id: 'bidirectional_bfs',
    concept: 'Bidirectional BFS ejecuta dos BFS simultáneamente: uno desde start, otro desde goal. Se encuentran en el medio.',
    howItWorks: '1. Iniciar dos colas: forward desde start, backward desde goal. 2. Alternar expansión de cada lado. 3. Cuando se encuentran nodos, reconstruir path.',
    whenToUse: 'Cuando el goal es conocido y tenés memoria limitada. Maze solving.',
    advantages: ['Reduce tiempo y memoria a la mitad roughly', 'Más eficiente'],
    disadvantages: ['Complicado de sincronizar', 'No siempre aplicable'],
    realWorldExample: 'Resolver laberintos, bidirectional communication protocols.',
    pseudocode: `function BidirectionalBFS(start, goal)
  if start == goal: return [start]
  
  forward = {start}, backward = {goal}
  forwardParents = {}, backwardParents = {}
  
  while forward and backward
    // Expandir el lado más pequeño
    if len(forward) < len(backward)
      expand(forward, forwardParents, backward, backwardParents, forwardToBackward)
    else
      expand(backward, backwardParents, forward, forwardParents, backwardToForward)`,
  },
  greedy_best_first: {
    id: 'greedy_best_first',
    concept: 'Greedy Best-First Search solo usa la heurística h(n) para decidir qué nodo expandir. Es rápido pero no garantiza óptimal.',
    howItWorks: '1. Usar priority queue basada solo en h(n). 2. Expandir nodo con menor heurística. 3. Continuar hasta encontrar goal.',
    whenToUse: 'Cuando solo necesitás una solución rápida (no óptima). Videojuegos.',
    advantages: ['Muy rápido típicamente', 'Menos memory'],
    disadvantages: ['No garantiza óptimo', 'Puede stuck en local minima'],
    realWorldExample: 'Fast pathfinding en videojuegos donde optimal path no importa.',
    pseudocode: `function GreedyBestFirst(start, goal, h)
  open = PriorityQueue(by=h)
  open.push(start)
  cameFrom = {}
  
  while open not empty
    current = open.pop()
    if current == goal: return reconstruct()
    
    for neighbor in graph[current]
      if neighbor not in cameFrom
        cameFrom[neighbor] = current
        open.push(neighbor)`,
  },
  bellman_ford: {
    id: 'bellman_ford',
    concept: 'Bellman-Ford encuentra shortest paths manejando pesos negativos.También detecta negative cycles.',
    howItWorks: '1. Inicializar distancias. 2. Relajar todos los edges V-1 veces. 3. Una pasada más para detectar negative cycles.',
    whenToUse: 'Grafos con pesos negativos como traffic con atascos (negative delays).',
    advantages: ['Maneja negativos', 'Detecta negative cycles'],
    disadvantages: ['O(VE) más lento que Dijkstra'],
    realWorldExample: 'Currency arbitrage detection, network con negative latencies.',
    pseudocode: `function BellmanFord(graph, start)
  dist = {v: ∞ for v in graph}
  dist[start] = 0
  
  // V-1 iterations
  for i = 1 to |V|-1
    for each edge (u, v, w) in graph
      if dist[u] + w < dist[v]
        dist[v] = dist[u] + w
  
  // Check negative cycle
  for each edge (u, v, w)
    if dist[u] + w < dist[v]
      raise "Negative cycle"
  
  return dist`,
  },
  floyd_warshall: {
    id: 'floyd_warshall',
    concept: 'Floyd-Warshall encuentra shortest paths entre todos los pares de vértices. Algoritmo de programación dinámica.',
    howItWorks: '1. Inicializar matriz de distancias. 2. Para cada intermediate k: a) Para cada par (i,j): intentar path i→k→j. 3. Actualizar matriz.',
    whenToUse: 'Grafos densos, all-pairs shortest paths, finding negative cycles.',
    advantages: ['Todos los pares', 'Maneja negativos', 'Simple de implementar'],
    disadvantages: ['O(V³) muy lento para grafos grandes'],
    realWorldExample: 'Road networks pequeños, transitive closure.',
    pseudocode: `function FloydWarshall(graph)
  dist = graph matrix
  
  for k in vertices
    for i in vertices
      for j in vertices
        dist[i][j] = min(
          dist[i][j],
          dist[i][k] + dist[k][j]
        )
  
  return dist`,
  },
};

export function getAlgorithmTheory(type: SupportedAlgorithmType): AlgorithmTheory | null {
  return ALGORITHM_THEORY[type] || null;
}