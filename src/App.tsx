import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAlgorithmStore, useUIStore } from '@/store';
import { getAlgorithmInfo, generateRandomArray, generateNearlySortedArray, generateReversedArray, generateEmptyGrid, generateMaze } from '@/algorithms';
import { SortingCanvas, PathfindingCanvas } from '@/components/visualizers';
import { ControlPanel, CodePanel, StatsPanel, TutorialModal, TheoryModal } from '@/components/ui';
import { useKeyboardShortcuts } from '@/hooks';
import type { SortingStep, PathfindingStep, AlgorithmCategory } from '@/types';
import './App.css';

function App() {
  const state = useAlgorithmStore();
  const ui = useUIStore();
  const toasts = useUIStore((state) => state.toasts);

  const category = useMemo((): AlgorithmCategory | null => {
    if (!state.currentAlgorithm) return null;
    const sortingAlgos = ['bubble', 'quick', 'merge', 'insertion', 'selection', 'heap', 'shell', 'radix', 'counting', 'tim'];
    if (sortingAlgos.includes(state.currentAlgorithm as string)) return 'sorting';
    return 'pathfinding';
  }, [state.currentAlgorithm]);

  const algorithmInfo = state.currentAlgorithm ? getAlgorithmInfo(state.currentAlgorithm) : null;

  const [showTheory, setShowTheory] = useState(false);
  const [showCode, setShowCode] = useState(true);
  const [showStatsPanel, setShowStatsPanel] = useState(true);
  const [generating, setGenerating] = useState(false);

  const selectedAlgorithm = state.currentAlgorithm;

  const keyboardActions = useMemo(() => ({
    onPlay: () => state.play(),
    onPause: () => state.pause(),
    onNextStep: () => state.nextStep(),
    onPreviousStep: () => state.previousStep(),
    onReset: () => state.reset(),
    onSetSpeed: (speed: number) => state.setSpeed(speed),
    onToggleComparison: () => state.toggleComparisonMode?.(),
    onToggleTheme: () => state.toggleTheme?.(),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  const { showHelp, setShowHelp, lastAction, shortcutsList } = useKeyboardShortcuts(keyboardActions);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGridGenerate = useCallback((type: 'clear' | 'random') => {
    const rows = 20;
    const cols = 20;
    let grid = generateEmptyGrid(rows, cols);
    if (type === 'random') {
      grid = generateMaze(grid, 'random') as any;
    }
    state.setGridData(grid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (category === 'sorting' && (!state.inputData || state.inputData.length === 0)) {
      const data = generateRandomArray(20);
      state.setInputData(data);
    } else if (category === 'pathfinding' && !state.gridData) {
      state.setGridData(generateEmptyGrid(20, 20));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, state.inputData, state.gridData]);

  useEffect(() => {
    if (state.currentAlgorithm) {
      setGenerating(true);
      state.generateSteps();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentAlgorithm, state.inputData, state.gridData]);

  useEffect(() => {
    if (generating && state.totalSteps > 0) {
      setGenerating(false);
    }
  }, [generating, state.totalSteps]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    if (ui.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [ui.darkMode]);

  const prevAlgorithm = useRef<string | null>(null);
  useEffect(() => {
    if (state.currentAlgorithm && state.currentAlgorithm !== prevAlgorithm.current) {
      prevAlgorithm.current = state.currentAlgorithm;
      const name = algorithmInfo?.name || state.currentAlgorithm;
      ui.addToast(`Algoritmo "${name}" seleccionado`, 'info', 2000);
    }
  }, [state.currentAlgorithm, algorithmInfo?.name]);

  const prevTotalSteps = useRef(0);
  useEffect(() => {
    if (state.totalSteps > 0 && state.totalSteps !== prevTotalSteps.current) {
      prevTotalSteps.current = state.totalSteps;
      ui.addToast(`${state.totalSteps} pasos generados`, 'success', 2000);
    }
  }, [state.totalSteps]);

  const prevState = useRef(state.state);
  useEffect(() => {
    if (prevState.current === 'running' && state.state === 'idle' && state.currentStep >= state.totalSteps - 1) {
      ui.addToast('Ejecución completada', 'success', 3000);
    }
    prevState.current = state.state;
  }, [state.state, state.currentStep, state.totalSteps]);

  const cellSize = 35;

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
  const emptyGrid = useMemo(() => state.gridData || generateEmptyGrid(state.gridSize.rows, state.gridSize.cols), [state.gridData, state.gridSize]);

  const sortingStep = currentStep as SortingStep | undefined;
  const pathfindingStep = currentStep as PathfindingStep | undefined;

  return (
    <div className={`app-container ${ui.selectedView === 'fullscreen' ? 'fullscreen' : ''}`}>
      <header className="app-header">
        <div className="header-left">
          <div className="app-logo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="12" width="4" height="9" rx="1" fill="#22d3ee"/>
              <rect x="10" y="7" width="4" height="14" rx="1" fill="#22d3ee" opacity="0.7"/>
              <rect x="17" y="3" width="4" height="18" rx="1" fill="#ec4899" opacity="0.8"/>
            </svg>
          </div>
          <div className="header-title-block">
            <h1 className="app-title">AlgoViz</h1>
            <span className="app-version">v1.0.0</span>
          </div>
        </div>
        <div className="header-right">
          <button
            className="icon-btn"
            onClick={() => setShowHelp(!showHelp)}
            title="Atajos (H)"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 7c0-1 1-2 2-2s2 1 2 2c0 1.5-2 2-2 3.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9" cy="14" r="0.5" fill="currentColor"/>
            </svg>
          </button>
          {selectedAlgorithm && (
            <button
              className="icon-btn"
              onClick={() => setShowTheory(true)}
              title="Información teórica"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 12V8M9 6h0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
          <button
            className="icon-btn"
            onClick={() => ui.setSelectedView(ui.selectedView === 'fullscreen' ? 'single' : 'fullscreen')}
            title={ui.selectedView === 'fullscreen' ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              {ui.selectedView === 'fullscreen' ? (
                <path d="M4 14L2 16M4 2L2 4M14 4L16 2M14 14L16 16M2 8h2M14 8h2M8 2v2M8 14v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              ) : (
                <path d="M2 6V2h4M2 12v4h4M16 6V2h-4M16 12v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
          </button>
          <button
            className="theme-pill"
            onClick={() => state.toggleTheme?.()}
            title="Cambiar tema"
          >
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d="M14.5 11.5A8 8 0 016.5 3.5a7 7 0 108 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Tema</span>
          </button>
        </div>
      </header>

      <main className="app-main">
        <section className="canvas-area">
          <div className="canvas-header">
            <div className="canvas-header-left">
              <span className="canvas-badge">CURRENTLY VISUALIZING</span>
              {category && (
                <div className="canvas-algorithm-info">
                  <h2 className="canvas-algorithm-name">
                    {algorithmInfo?.name || 'Algoritmo'}
                  </h2>
                  {algorithmInfo && (
                    <span className="canvas-algorithm-complexity">
                      {algorithmInfo.complexity.time}
                    </span>
                  )}
                </div>
              )}
            </div>
            {category === 'sorting' && (
              <div className="canvas-header-right">
                <button className="dataset-pill active" onClick={() => handleDataGenerate('random')}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 12c0-2 2-4 4-4s4 2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Random
                </button>
                <button className="dataset-pill" onClick={() => handleDataGenerate('nearly')}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M3 10L6 6L9 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M2 3h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Casi Ord.
                </button>
                <button className="dataset-pill" onClick={() => handleDataGenerate('reversed')}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M3 10L5 6L9 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Inverso
                </button>
              </div>
            )}
            {category === 'pathfinding' && (
              <div className="canvas-header-right">
                <button className="dataset-pill" onClick={() => handleGridGenerate('clear')}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Limpiar
                </button>
                <button className="dataset-pill" onClick={() => handleGridGenerate('random')}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <rect x="3" y="3" width="3" height="3" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="8" y="3" width="3" height="3" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="3" y="8" width="3" height="3" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="8" y="8" width="3" height="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Muros
                </button>
              </div>
            )}
          </div>

          <div className="canvas-container">
            {generating && (
              <div className="skeleton-overlay">
                <div className="skeleton-spinner" />
                <p className="skeleton-text">Generando pasos...</p>
              </div>
            )}

            {!generating && category === 'sorting' && inputArray.length > 0 && (
              <SortingCanvas
                data={inputArray}
                step={sortingStep || { array: [], comparing: null, swapping: null, sorted: [] }}
              />
            )}

            {category === 'pathfinding' && (
              <PathfindingCanvas
                grid={emptyGrid}
                step={
                  pathfindingStep || {
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
                <div className="empty-state-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="24" width="6" height="18" rx="2" fill="#1f2433"/>
                    <rect x="16" y="14" width="6" height="28" rx="2" fill="#1f2433"/>
                    <rect x="26" y="6" width="6" height="36" rx="2" fill="#1f2433"/>
                    <rect x="36" y="18" width="6" height="24" rx="2" fill="#1f2433"/>
                  </svg>
                </div>
                <p className="empty-state-text">Selecciona un algoritmo para comenzar</p>
                <p className="empty-state-hint">Elige un algoritmo del panel derecho y observa su funcionamiento paso a paso</p>
              </div>
            )}
          </div>

          {category && (
            <div className="canvas-stat-bar">
              {category === 'sorting' && sortingStep && (
                <>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Paso</span>
                    <span className="stat-pill-value">{state.currentStep + 1}/{state.totalSteps}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Comparando</span>
                    <span className="stat-pill-value">{sortingStep.comparing?.join(', ') || '—'}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Intercambiando</span>
                    <span className="stat-pill-value">{sortingStep.swapping?.join(', ') || '—'}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Ordenado</span>
                    <span className="stat-pill-value">{sortingStep.sorted?.length || 0}</span>
                  </div>
                </>
              )}
              {category === 'pathfinding' && pathfindingStep && (
                <>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Paso</span>
                    <span className="stat-pill-value">{state.currentStep + 1}/{state.totalSteps}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Visitados</span>
                    <span className="stat-pill-value">{pathfindingStep.visitedCount || 0}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Frontera</span>
                    <span className="stat-pill-value">{pathfindingStep.frontier?.length || 0}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Camino</span>
                    <span className="stat-pill-value">{pathfindingStep.path?.length || 0}</span>
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        <button
          className={`sidebar-handle ${ui.showSidebar && ui.selectedView !== 'fullscreen' ? '' : 'closed'}`}
          onClick={() => ui.toggleSidebar()}
          title={ui.showSidebar ? 'Ocultar panel' : 'Mostrar panel'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d={ui.showSidebar ? 'M6 4l4 4-4 4' : 'M10 4l-4 4 4 4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <aside className={`app-sidebar ${ui.showSidebar && ui.selectedView !== 'fullscreen' ? 'open' : 'closed'}`}>
          <ControlPanel
            onDataGenerate={handleDataGenerate}
            onGridGenerate={handleGridGenerate}
          />

          {selectedAlgorithm && (
            <div className="sidebar-section">
              <button
                className="section-toggle"
                onClick={() => setShowCode(!showCode)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4 4L1 7L4 10M10 4L13 7L10 10M9 2L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Pseudocódigo</span>
                <svg className={`toggle-chevron ${showCode ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {showCode && (
                <CodePanel
                  algorithmId={selectedAlgorithm}
                />
              )}
            </div>
          )}

          {selectedAlgorithm && (
            <div className="sidebar-section">
              <button
                className="section-toggle"
                onClick={() => setShowStatsPanel(!showStatsPanel)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12V6h3v6M6 12V3h3v9M10 12V8h3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>Rendimiento</span>
                <svg className={`toggle-chevron ${showStatsPanel ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {showStatsPanel && (
                <StatsPanel
                  algorithmId={selectedAlgorithm}
                  currentStep={state.currentStep}
                  totalSteps={state.totalSteps}
                />
              )}
            </div>
          )}
        </aside>
      </main>

      <footer className="app-footer">
        <div className="footer-left">
          <div className="footer-status-dot" />
          <span className="footer-status-label">
            {algorithmInfo?.name ? `${algorithmInfo.name}` : 'Esperando algoritmo'}
          </span>
          {algorithmInfo && (
            <>
              <span className="footer-separator" />
              <span className="footer-complexity">{algorithmInfo.complexity.time}</span>
            </>
          )}
        </div>
        <div className="footer-right">
          <span className="footer-copyright">&copy; {new Date().getFullYear()} Nacho Ledesma</span>
        </div>
      </footer>

      <TutorialModal />

      {showTheory && (
        <TheoryModal
          algorithmType={state.currentAlgorithm}
          onClose={() => setShowTheory(false)}
        />
      )}

      {showHelp && (
        <div className="help-overlay" onClick={() => setShowHelp(false)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="help-title">Atajos de Teclado</h2>
            <div className="help-list">
              {shortcutsList.map((s) => (
                <div key={s.key} className="help-row">
                  <kbd className="help-key">{s.key}</kbd>
                  <span className="help-action">{s.action}</span>
                </div>
              ))}
            </div>
            <button className="help-close" onClick={() => setShowHelp(false)}>Cerrar</button>
          </div>
        </div>
      )}

      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span className="toast-msg">{toast.message}</span>
            <button className="toast-close" onClick={() => ui.removeToast(toast.id)}>✕</button>
          </div>
        ))}
      </div>

      {lastAction && (
        <div className="action-feedback">{lastAction}</div>
      )}

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
          background: var(--bg-panel);
          z-index: 10;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .app-logo {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .app-logo::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 11px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          z-index: -1;
          opacity: 0.6;
        }

        .header-title-block {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .app-title {
          font-size: 20px;
          font-weight: 800;
          margin: 0;
          color: var(--text-h);
          font-family: var(--heading);
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, var(--text-h), var(--primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .app-version {
          font-size: 11px;
          color: var(--text-muted);
          font-family: var(--mono);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .icon-btn {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--bg-card);
          cursor: pointer;
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .icon-btn:hover {
          background: var(--code-bg);
          border-color: var(--border-hover);
          color: var(--text-h);
        }

        .theme-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: var(--bg-card);
          cursor: pointer;
          color: var(--text);
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .theme-pill:hover {
          border-color: var(--border-hover);
          color: var(--text-h);
          background: var(--code-bg);
        }

        .app-main {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .app-container.fullscreen .app-footer {
          display: none;
        }
        .app-container.fullscreen .app-header {
          border-bottom: none;
          background: transparent;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
        }
        .app-container.fullscreen .app-header:hover {
          background: var(--bg-panel);
        }
        .app-container.fullscreen .canvas-area {
          padding: 0;
        }
        .app-container.fullscreen .canvas-container {
          border: none;
          border-radius: 0;
          box-shadow: none;
          max-width: 100%;
        }
        .app-container.fullscreen .canvas-header {
          display: none;
        }
        .app-container.fullscreen .canvas-stat-bar {
          display: none;
        }

        .canvas-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px 24px;
          overflow: hidden;
          position: relative;
          background: var(--bg);
        }

        .canvas-area::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 30% 40%, rgba(34, 211, 238, 0.04) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 60%, rgba(236, 72, 153, 0.03) 0%, transparent 60%);
          pointer-events: none;
        }

        .canvas-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .canvas-header-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .canvas-badge {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: var(--primary);
          text-transform: uppercase;
        }

        .canvas-algorithm-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .canvas-algorithm-name {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          color: var(--text-h);
          font-family: var(--heading);
          letter-spacing: -0.02em;
        }

        .canvas-algorithm-complexity {
          font-size: 13px;
          font-family: var(--mono);
          color: var(--text-muted);
          font-style: italic;
          padding: 4px 10px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 6px;
        }

        .canvas-header-right {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .dataset-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 7px 12px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          color: var(--text);
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .dataset-pill:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--primary-dim);
        }
        .dataset-pill.active {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--primary-dim);
        }

        .canvas-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-sizing: border-box;
          box-shadow: var(--shadow), inset 0 0 60px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
          min-height: 0;
          overflow: hidden;
        }

        .canvas-container canvas {
          display: block;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 40px;
        }

        .empty-state-icon svg {
          opacity: 0.3;
        }

        .empty-state-text {
          color: var(--text);
          font-size: 16px;
          font-weight: 600;
        }

        .empty-state-hint {
          color: var(--text-muted);
          font-size: 13px;
        }

        .canvas-stat-bar {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }

        .stat-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 11px;
        }

        .stat-pill-label {
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .stat-pill-value {
          color: var(--primary);
          font-family: var(--mono);
          font-weight: 600;
          font-size: 12px;
        }

        .app-sidebar {
          position: relative;
          width: 320px;
          min-width: 320px;
          border-left: 1px solid var(--border);
          padding: 16px;
          overflow-y: auto;
          overflow-x: hidden;
          background: var(--bg-panel);
          z-index: 5;
          transition: width 0.25s ease, min-width 0.25s ease, padding 0.25s ease, border-color 0.25s ease;
        }

        .app-sidebar.closed {
          width: 0;
          min-width: 0;
          padding: 16px 0;
          overflow-y: hidden;
          border-left-color: transparent;
        }

        @media (max-width: 1200px) {
          .app-sidebar:not(.closed) {
            width: 280px;
            min-width: 280px;
            padding: 12px;
          }
        }

        @media (max-width: 900px) {
          .app-sidebar:not(.closed) {
            width: 240px;
            min-width: 240px;
            padding: 10px;
          }
          .canvas-area {
            padding: 12px;
          }
          .canvas-container {
            padding: 0;
          }
        }

        .sidebar-section {
          margin-top: 12px;
        }

        .sidebar-section:first-child {
          margin-top: 0;
        }

        .section-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          color: var(--text);
          transition: all 0.2s;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .section-toggle:hover {
          background: var(--code-bg);
          border-color: var(--border-hover);
          color: var(--text-h);
        }

        .toggle-chevron {
          margin-left: auto;
          transition: transform 0.2s;
          color: var(--text);
        }

        .toggle-chevron.open {
          transform: rotate(180deg);
        }

        .sidebar-handle {
          flex-shrink: 0;
          width: 20px;
          height: 48px;
          margin: auto 0;
          border: 1px solid var(--border);
          border-right: none;
          border-radius: 8px 0 0 8px;
          background: var(--bg-panel);
          cursor: pointer;
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: all 0.2s;
          padding: 0;
          position: relative;
        }
        .sidebar-handle:hover {
          background: var(--code-bg);
          color: var(--text-h);
          border-color: var(--primary);
        }
        .sidebar-handle.closed {
          border-radius: 8px 0 0 8px;
          border: 1px solid var(--border);
          border-right: none;
        }

        .skeleton-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 60px;
        }
        .skeleton-spinner {
          width: 36px;
          height: 36px;
          border: 2px solid var(--border);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .skeleton-text {
          font-size: 13px;
          color: var(--text-muted);
          margin: 0;
        }

        .help-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .help-modal {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px 32px;
          max-width: 420px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: var(--shadow-lg);
        }
        .help-title {
          font-family: var(--heading);
          font-size: 18px;
          margin: 0 0 20px;
          color: var(--text-h);
        }
        .help-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }
        .help-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 6px 0;
        }
        .help-key {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          height: 28px;
          padding: 0 8px;
          background: var(--code-bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          font-family: var(--mono);
          font-size: 12px;
          color: var(--text-h);
        }
        .help-action {
          font-size: 13px;
          color: var(--text);
        }
        .help-close {
          width: 100%;
          padding: 10px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg);
          color: var(--text);
          font-family: inherit;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .help-close:hover {
          background: var(--code-bg);
          color: var(--text-h);
        }

        .toast-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 999;
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 340px;
        }
        .toast {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          font-size: 13px;
          animation: toast-in 0.3s ease-out;
        }
        .toast-info { border-left: 3px solid var(--primary); }
        .toast-success { border-left: 3px solid var(--success); }
        .toast-warning { border-left: 3px solid var(--warning); }
        .toast-error { border-left: 3px solid var(--danger); }
        .toast-msg { flex: 1; color: var(--text); }
        .toast-close {
          border: none;
          background: none;
          cursor: pointer;
          color: var(--text);
          opacity: 0.5;
          font-size: 14px;
          padding: 2px 4px;
          transition: opacity 0.2s;
        }
        .toast-close:hover { opacity: 1; }

        @keyframes toast-in {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .action-feedback {
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          padding: 8px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 13px;
          color: var(--text-h);
          z-index: 500;
          box-shadow: var(--shadow);
          animation: feedback-in 0.2s ease-out;
          pointer-events: none;
        }

        @keyframes feedback-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .app-sidebar::-webkit-scrollbar {
          width: 4px;
        }
        .app-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        .app-sidebar::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 2px;
        }
        .app-sidebar::-webkit-scrollbar-thumb:hover {
          background: var(--text-muted);
        }

        .app-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 24px;
          border-top: 1px solid var(--border);
          background: var(--bg-panel);
          font-size: 12px;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 6px var(--primary-glow);
        }

        .footer-status-label {
          color: var(--text);
          font-weight: 500;
          font-size: 12px;
        }

        .footer-separator {
          width: 1px;
          height: 12px;
          background: var(--border);
        }

        .footer-complexity {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--primary);
          font-weight: 600;
        }

        .footer-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .footer-copyright {
          font-size: 11px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .app-header {
            padding: 10px 16px;
          }
          .app-title {
            font-size: 16px;
          }
          .app-version {
            display: none;
          }
          .canvas-area {
            padding: 12px;
          }
          .canvas-algorithm-name {
            font-size: 20px;
          }
          .canvas-header-right {
            display: none;
          }
          .app-sidebar:not(.closed) {
            position: fixed;
            right: 0;
            top: 0;
            bottom: 0;
            width: 280px;
            z-index: 100;
            box-shadow: var(--shadow-lg);
            border-left: 1px solid var(--border);
          }
          .sidebar-handle {
            display: none;
          }
          .canvas-stat-bar {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
