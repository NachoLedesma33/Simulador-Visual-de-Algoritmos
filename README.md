# 🎨 Simulador Visual de Algoritmos

¡Bienvenido al **Simulador Visual de Algoritmos**! Esta es una herramienta interactiva diseñada para observar en tiempo real cómo funcionan los algoritmos más famosos de la informática. Ideal para estudiantes, desarrolladores casuales y curiosos de la computación que quieren "ver" la lógica detrás del código.

## 🚀 ¿De qué trata esta aplicación?

La aplicación permite visualizar paso a paso el comportamiento de procesos complejos de ordenamiento y búsqueda de caminos (pathfinding). A través de una interfaz moderna y fluida, puedes controlar la velocidad, cambiar los datos de entrada y observar cómo el algoritmo toma decisiones, compara elementos y encuentra soluciones.

## ✨ Características Principales

### 📊 Algoritmos de Ordenamiento
Observa cómo se organizan conjuntos de datos desordenados:
- **Básicos**: Bubble Sort, Insertion Sort, Selection Sort.
- **Eficientes**: Quick Sort, Merge Sort, Heap Sort.
- **Avanzados/Especiales**: Shell Sort, Radix Sort, Counting Sort y el potente **Timsort**.

### 🧭 Algoritmos de Búsqueda de Camino (Pathfinding)
Mira cómo la IA encuentra la ruta más corta en un laberinto:
- **Clásicos**: BFS (Búsqueda en Anchura), DFS (Búsqueda en Profundidad).
- **Pesados y Heurísticos**: Dijkstra, A* (A-Star), Greedy Best-First.
- **Avanzados**: Bidirectional BFS, Bellman-Ford y Floyd-Warshall.

### 🏗️ Generación de Laberintos
¡No solo busques caminos, créalos!
- **Muros Aleatorios**: Genera obstáculos al azar garantizando siempre una solución.
- **Laberintos Perfectos**: Utiliza el algoritmo de **Recursive Backtracking** para crear laberintos estructurados y desafiantes sin callejones sin salida aislados.

### 🍱 Interfaz y Experiencia (UX)
- **Modos Visuales**: Soporte completo para **Modo Claro** y **Modo Oscuro**.
- **Control de Tiempo**: Ajusta la velocidad de la animación desde 1ms hasta 100ms.
- **Reproducción Intuitiva**: Pausa, retrocede paso a paso o reinicia la simulación en cualquier momento.
- **Diseño Responsive**: Optimizado para verse bien en cualquier tamaño de pantalla.

## 🛠️ Tecnologías Utilizadas

- **React + TypeScript**: Para una estructura de componentes robusta y tipado seguro.
- **Vite**: Motor de construcción ultra rápido.
- **Zustand + Immer**: Gestión de estado global eficiente y mutaciones inmutables simples.
- **HTML5 Canvas**: Renderizado de alto rendimiento para las animaciones y gráficos.
- **Google Fonts**: Tipografías modernas (*Inter*, *Outfit*, *JetBrains Mono*) para máxima legibilidad.

## 🏃 Cómo Ejecutar el Proyecto

Si quieres correr este simulador localmente, sigue estos pasos:

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/simulador-algoritmos.git
    ```
2.  **Instalar dependencias**:
    ```bash
    npm install
    ```
3.  **Iniciar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```
4.  Abre tu navegador en `http://localhost:5173`.

---

Creado con ❤️ por **Nacho Ledesma**.
