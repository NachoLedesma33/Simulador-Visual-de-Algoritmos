import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAlgorithmStore } from '@/store';
import { getAlgorithmInfo, generateRandomArray, generateNearlySortedArray, generateReversedArray, generateEmptyGrid, generateMaze } from '@/algorithms';
import { SortingCanvas, PathfindingCanvas } from '@/components/visualizers';
import { ControlPanel } from '@/components/ui';
import type { SortingStep, PathfindingStep, AlgorithmCategory } from '@/types';
import './App.css';

function App() {
  const state = useAlgorithmStore();

  const category = useMemo((): AlgorithmCategory | null => {
    if (!state.currentAlgorithm) return null;
    const sortingAlgos = ['bubble', 'quick', 'merge', 'insertion', 'selection', 'heap', 'shell', 'radix', 'counting', 'tim'];
    if (sortingAlgos.includes(state.currentAlgorithm as string)) return 'sorting';
    return 'pathfinding';
  }, [state.currentAlgorithm]);

  const algorithmInfo = state.currentAlgorithm ? getAlgorithmInfo(state.currentAlgorithm) : null;

  const [showSidebar] = useState(true);

  const handleDataGenerate = useCallback((type: 'random' | 'nearly' | 'reversed') => {
    const size = 20;
    let data: number[];
    switch (type) {
      case 'random':
        data = generateRandomArray(size);
        break;
      case 'nearly':
        data = generateNearlySortedArray(size);
        break;
      case 'reversed':
        data = generateReversedArray(size);
        break;
      default:
        data = generateRandomArray(size);
    }
    state.setInputData(data);
  }, []);

  const handleGridGenerate = useCallback((type: 'clear' | 'random') => {
    const rows = 20;
    const cols = 20;
    let grid = generateEmptyGrid(rows, cols);
    if (type === 'random') {
      grid = generateMaze(grid, 'random', 0.3);
    }
  }, []);

  const generateInitialData = useCallback(() => {
    if (category === 'sorting') {
      const data = generateRandomArray(20);
      state.setInputData(data);
    } else if (category === 'pathfinding') {
      state.setGridSize(20, 20);
    }
  }, [category]);

  useEffect(() => {
    generateInitialData();
  }, []);

  const canvasWidth = 600;
  const canvasHeight = 400;
  const cellSize = 20;

  const currentStep = useMemo(() => {
    if (category === 'sorting' && state.steps.length > 0 && state.currentStep < state.steps.length) {
      return state.steps[state.currentStep] as SortingStep | undefined;
    }
    if (category === 'pathfinding' && state.steps.length > 0 && state.currentStep < state.steps.length) {
      return state.steps[state.currentStep] as PathfindingStep | undefined;
    }
    return null;
  }, [state.steps, state.currentStep, category]);

  const inputArray = state.inputData || [];
  const emptyGrid = useMemo(() => generateEmptyGrid(state.gridSize.rows, state.gridSize.cols), [state.gridSize]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1 className="app-title">Visualizador de Algoritmos</h1>
        </div>
        <div className="header-right">
          <button
            className="theme-toggle"
            onClick={() => state.toggleTheme?.()}
            title="Cambiar tema"
          >
            {state.theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <aside className={`app-sidebar ${showSidebar ? 'open' : 'closed'}`}>
          <ControlPanel
            onDataGenerate={handleDataGenerate}
            onGridGenerate={handleGridGenerate}
          />

          {category === 'sorting' && (
            <div className="sidebar-panel">
              <h3 className="panel-title">Estadísticas</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Comparaciones</span>
                  <span className="stat-value">{state.currentStep}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Pasos Totales</span>
                  <span className="stat-value">{state.totalSteps}</span>
                </div>
              </div>
            </div>
          )}

          {category === 'pathfinding' && (
            <div className="sidebar-panel">
              <h3 className="panel-title">Grid</h3>
              <div className="grid-controls">
                <button
                  className="btn btn-sm"
                  onClick={() => handleGridGenerate('clear')}
                >
                  Limpiar
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => handleGridGenerate('random')}
                >
                  Muros Aleatorios
                </button>
              </div>
            </div>
          )}
        </aside>

        <section className="canvas-area">
          <div className="canvas-container">
            {category === 'sorting' && inputArray.length > 0 && (
              <SortingCanvas
                data={inputArray}
                step={currentStep as SortingStep || { array: [], comparing: null, swapping: null, sorted: [] }}
                width={canvasWidth}
                height={canvasHeight}
              />
            )}

            {category === 'pathfinding' && (
              <PathfindingCanvas
                grid={emptyGrid}
                step={
                  currentStep as PathfindingStep || {
                    grid: emptyGrid,
                    current: null,
                    frontier: [],
                    path: [],
                    visitedCount: 0,
                  }
                }
                cellSize={cellSize}
              />
            )}

            {!category && (
              <div className="empty-state">
                <p>Selecciona un algoritmo para comenzar</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-breadcrumb">
          {category && algorithmInfo && (
            <>
              <span className="category-label">{category}</span>
              <span className="separator">›</span>
              <span className="algorithm-name">{algorithmInfo.name}</span>
            </>
          )}
        </div>
        <div className="footer-stats">
          {algorithmInfo && (
            <span className="complexity-badge">
              {algorithmInfo.complexity.time}
            </span>
          )}
        </div>
      </footer>

      <style>{`
        .app-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: var(--bg);
          color: var(--text);
        }

        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
          border-bottom: 1px solid var(--border);
          background: var(--bg);
        }

        .app-title {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
          color: var(--text-h);
        }

        .header-right {
          display: flex;
          gap: 12px;
        }

        .theme-toggle {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg);
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .app-main {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .app-sidebar {
          width: 320px;
          min-width: 320px;
          border-right: 1px solid var(--border);
          padding: 16px;
          overflow-y: auto;
          background: var(--bg);
        }

        .app-sidebar.closed {
          width: 0;
          min-width: 0;
          padding: 0;
          overflow: hidden;
        }

        .sidebar-panel {
          margin-top: 24px;
          padding: 16px;
          background: var(--code-bg);
          border-radius: 8px;
        }

        .panel-title {
          font-size: 14px;
          font-weight: 500;
          margin: 0 0 12px;
          color: var(--text-h);
        }

        .stats-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .stat-label {
          color: var(--text);
        }

        .stat-value {
          font-family: var(--mono);
          color: var(--text-h);
        }

        .grid-controls {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .canvas-area {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: var(--bg);
        }

        .canvas-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-state {
          text-align: center;
          color: var(--text);
        }

        .app-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 24px;
          border-top: 1px solid var(--border);
          background: var(--bg);
          font-size: 13px;
        }

        .footer-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-label {
          color: var(--text);
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.5px;
        }

        .separator {
          color: var(--text);
        }

        .algorithm-name {
          color: var(--text-h);
          font-weight: 500;
        }

        .footer-stats {
          display: flex;
          gap: 12px;
        }

        .complexity-badge {
          padding: 4px 8px;
          background: var(--code-bg);
          border-radius: 4px;
          font-family: var(--mono);
          font-size: 12px;
          color: var(--text-h);
        }

        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }

        .btn-sm {
          padding: 6px 12px;
          font-size: 13px;
          background: var(--bg);
          border: 1px solid var(--border);
          color: var(--text);
        }

        .btn-sm:hover {
          background: var(--code-bg);
        }
      `}</style>
    </div>
  );
}

export default App;