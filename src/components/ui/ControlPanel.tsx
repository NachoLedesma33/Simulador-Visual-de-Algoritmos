import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAlgorithmStore, selectIsPlaying } from '@/store';
import { getAlgorithmInfo, getAlgorithmsByCategory, ALGORITHM_CATEGORIES } from '@/algorithms';
import type { AlgorithmType, AlgorithmCategory } from '@/types';

const CATEGORIES: AlgorithmCategory[] = ['sorting', 'pathfinding'];

interface ControlPanelProps {
  onDataGenerate?: (type: 'random' | 'nearly' | 'reversed') => void;
  onGridGenerate?: (type: 'clear' | 'random') => void;
}

export function ControlPanel({
  onDataGenerate,
  onGridGenerate,
}: ControlPanelProps) {
  const state = useAlgorithmStore();
  const isPlaying = selectIsPlaying(state);

  const algorithmOptions = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      category: cat,
      label: cat === 'sorting' ? 'Ordenamiento' : 'Búsqueda de Caminos',
      algorithms: getAlgorithmsByCategory(cat),
    }));
  }, []);

  const selectedAlgorithm = state.currentAlgorithm;
  const algorithmInfo = selectedAlgorithm ? getAlgorithmInfo(selectedAlgorithm) : null;

  const [showStats, setShowStats] = useState(true);

  const handleAlgorithmChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const type = e.target.value as AlgorithmType;
      if (type) {
        state.setAlgorithm(type);
      }
    },
    []
  );

  const handleSpeedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      state.setSpeed(value);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (isPlaying) {
          state.pause();
        } else {
          state.play();
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        state.nextStep();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        state.previousStep();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        state.reset();
      }
    },
    [isPlaying]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isPlaying && state.delay > 0) {
      interval = setInterval(() => {
        if (state.currentStep < state.totalSteps - 1) {
          state.nextStep();
        } else {
          state.pause();
        }
      }, state.delay);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, state.delay, state.currentStep, state.totalSteps]);

  const statusBadge = useMemo(() => {
    switch (state.state) {
      case 'running':
        return { color: '#3b82f6', label: 'Ejecutando', icon: '▶' };
      case 'paused':
        return { color: '#f59e0b', label: 'Pausado', icon: '⏸' };
      case 'completed':
        return { color: '#22c55e', label: 'Completado', icon: '✓' };
      default:
        return { color: '#94a3b8', label: 'Listo', icon: '○' };
    }
  }, [state.state]);

  return (
    <div className="control-panel">
      <div className="panel-header">
        <div className="panel-indicator"/>
        <span className="panel-title">Panel de Control</span>
      </div>

      <div className="panel-section">
        <label className="field-label">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="label-icon">
            <path d="M2 4h10M2 7h10M2 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Algoritmo
        </label>
        <div className="select-wrapper">
          <select
            className="algorithm-select"
            value={selectedAlgorithm || ''}
            onChange={handleAlgorithmChange}
          >
            <option value="" disabled>Seleccionar algoritmo...</option>
            {algorithmOptions.map(({ category, label, algorithms }) => (
              <optgroup key={category} label={label}>
                {algorithms.map((algo) => {
                  const info = getAlgorithmInfo(algo);
                  return (
                    <option key={algo} value={algo}>
                      {info.name}
                    </option>
                  );
                })}
              </optgroup>
            ))}
          </select>
          <svg className="select-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div className="panel-section playback-section">
        <div className="playback-controls">
          <button
            className={`control-btn step-btn ${isPlaying ? 'active playing' : ''}`}
            onClick={state.reset}
            disabled={!selectedAlgorithm}
            title="Reiniciar (R)"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8a6 6 0 1 1 1.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 3V8h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            className={`control-btn prev-btn ${!selectedAlgorithm || state.currentStep === 0 ? 'disabled' : ''}`}
            onClick={state.previousStep}
            disabled={!selectedAlgorithm || state.currentStep === 0}
            title="Anterior (←)"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            className={`control-btn play-btn ${isPlaying ? 'pause' : ''}`}
            onClick={isPlaying ? state.pause : state.play}
            disabled={!selectedAlgorithm}
            title={isPlaying ? 'Pausar (Espacio)' : 'Iniciar (Espacio)'}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="5" y="4" width="3" height="12" rx="1" fill="currentColor"/>
                <rect x="12" y="4" width="3" height="12" rx="1" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 3L17 10L5 17V3Z" fill="currentColor"/>
              </svg>
            )}
          </button>

          <button
            className={`control-btn next-btn ${!selectedAlgorithm || state.currentStep >= state.totalSteps - 1 ? 'disabled' : ''}`}
            onClick={state.nextStep}
            disabled={!selectedAlgorithm || state.currentStep >= state.totalSteps - 1}
            title="Siguiente (→)"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            className="control-btn stop-btn"
            onClick={() => state.reset()}
            disabled={!selectedAlgorithm}
            title="Ir al inicio"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3V13h2V3H3ZM9 3V13h4V3H9Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="panel-section">
        <div className="speed-display">
          <label className="field-label">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="label-icon">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Velocidad
          </label>
          <span className="speed-value">{state.speed}%</span>
        </div>
        <div className="slider-wrapper">
          <input
            type="range"
            className="speed-slider"
            min="1"
            max="100"
            value={state.speed}
            onChange={handleSpeedChange}
          />
          <div className="slider-track">
            <div className="slider-fill" style={{ width: `${state.speed}%` }}/>
          </div>
        </div>
      </div>

      <div className="panel-section status-section">
        <div className="status-badge" style={{ '--status-color': statusBadge.color } as any}>
          <span className="status-dot"/>
          <span className="status-text">{statusBadge.label}</span>
          <span className="status-step">
            {state.currentStep + 1} / {state.totalSteps || 1}
          </span>
        </div>
      </div>

      {selectedAlgorithm && algorithmInfo && (
        <>
          <button
            className="info-toggle-btn"
            onClick={() => setShowStats(!showStats)}
          >
            <span>Información</span>
            <svg className={`toggle-arrow ${showStats ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {showStats && (
            <div className="stats-panel">
              <div className="complexity-grid">
                <div className="complexity-item">
                  <span className="complexity-label">Tiempo</span>
                  <span className="complexity-value">{algorithmInfo.complexity.time}</span>
                </div>
                <div className="complexity-item">
                  <span className="complexity-label">Espacio</span>
                  <span className="complexity-value">{algorithmInfo.complexity.space}</span>
                </div>
              </div>
              {algorithmInfo.bestCase && (
                <div className="complexity-item best">
                  <span className="complexity-label">Mejor caso</span>
                  <span className="complexity-value">{algorithmInfo.bestCase}</span>
                </div>
              )}
              {algorithmInfo.worstCase && (
                <div className="complexity-item worst">
                  <span className="complexity-label">Peor caso</span>
                  <span className="complexity-value">{algorithmInfo.worstCase}</span>
                </div>
              )}
              <p className="stat-description">{algorithmInfo.description}</p>
            </div>
          )}
        </>
      )}

      <div className="panel-section">
        <label className="field-label">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="label-icon">
            <rect x="2" y="2" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Datos
        </label>
        <div className="generator-buttons">
          {selectedAlgorithm &&
            ALGORITHM_CATEGORIES[selectedAlgorithm] === 'sorting' && (
              <div className="button-group">
                <button
                  className="gen-btn"
                  onClick={() => onDataGenerate?.('random')}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 12c0-2 2-4 4-4s4 2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Aleatorio
                </button>
                <button
                  className="gen-btn"
                  onClick={() => onDataGenerate?.('nearly')}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 10L6 6L9 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M2 3h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Casi Ord.
                </button>
                <button
                  className="gen-btn"
                  onClick={() => onDataGenerate?.('reversed')}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 10L5 6L9 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Inverso
                </button>
              </div>
            )}

          {selectedAlgorithm &&
            ALGORITHM_CATEGORIES[selectedAlgorithm] === 'pathfinding' && (
              <div className="button-group">
                <button
                  className="gen-btn"
                  onClick={() => onGridGenerate?.('clear')}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Limpiar
                </button>
                <button
                  className="gen-btn"
                  onClick={() => onGridGenerate?.('random')}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
      </div>

      <style>{`
        .control-panel {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 20px;
          background: var(--bg);
          border-radius: 16px;
          font-family: var(--sans);
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }

        .panel-indicator {
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--primary);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .panel-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-h);
          letter-spacing: 0.02em;
        }

        .panel-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text);
        }

        .label-icon {
          opacity: 0.7;
        }

        .select-wrapper {
          position: relative;
        }

        .algorithm-select {
          width: 100%;
          padding: 12px 36px 12px 12px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--bg-panel);
          color: var(--text-h);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          appearance: none;
          font-family: inherit;
        }

        .algorithm-select:hover {
          border-color: var(--primary);
        }

        .algorithm-select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-surface);
        }

        .select-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text);
          pointer-events: none;
        }

        .playback-section {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px;
        }

        .playback-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .control-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: var(--text);
        }

        .control-btn.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .step-btn {
          width: 34px;
          height: 34px;
        }

        .step-btn:hover:not(.disabled) {
          background: var(--code-bg);
          color: var(--text-h);
        }

        .prev-btn, .next-btn {
          width: 34px;
          height: 34px;
        }

        .prev-btn:hover:not(.disabled), .next-btn:hover:not(.disabled) {
          background: var(--code-bg);
          color: var(--text-h);
        }

        .play-btn {
          width: 48px;
          height: 48px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
        }

        .play-btn:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: scale(1.05);
        }

        .play-btn.pause {
          background: var(--danger);
        }

        .stop-btn {
          width: 34px;
          height: 34px;
        }

        .stop-btn:hover:not(.disabled) {
          background: var(--code-bg);
          color: var(--text-h);
        }

        .speed-display {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .speed-value {
          font-size: 14px;
          font-weight: 600;
          font-family: var(--mono);
          color: var(--primary);
        }

        .slider-wrapper {
          position: relative;
          height: 6px;
        }

        .speed-slider {
          position: absolute;
          width: 100%;
          height: 6px;
          opacity: 0;
          cursor: pointer;
          z-index: 2;
        }

        .slider-track {
          position: absolute;
          width: 100%;
          height: 6px;
          background: var(--code-bg);
          border-radius: 3px;
          overflow: hidden;
        }

        .slider-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--primary-hover));
          border-radius: 3px;
          transition: width 0.1s;
        }

        .status-section {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 4px;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          background: var(--bg);
          border-radius: 8px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--status-color);
          box-shadow: 0 0 6px var(--status-color);
        }

        .status-text {
          flex: 1;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-h);
        }

        .status-step {
          font-size: 12px;
          font-family: var(--mono);
          color: var(--text);
        }

        .info-toggle-btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-h);
          transition: all 0.2s;
        }

        .info-toggle-btn:hover {
          background: var(--code-bg);
        }

        .toggle-arrow {
          transition: transform 0.2s;
        }

        .toggle-arrow.open {
          transform: rotate(180deg);
        }

        .stats-panel {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px;
        }

        .complexity-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }

        .complexity-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .complexity-item.best {
          background: var(--success-surface);
          padding: 8px 10px;
          border-radius: 8px;
          margin-bottom: 6px;
        }

        .complexity-item.worst {
          background: var(--danger-surface);
          padding: 8px 10px;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .complexity-label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text);
        }

        .complexity-value {
          font-size: 14px;
          font-weight: 600;
          font-family: var(--mono);
          color: var(--text-h);
        }

        .stat-description {
          font-size: 12px;
          line-height: 1.5;
          color: var(--text);
          margin: 0;
        }

        .generator-buttons {
          margin-top: 4px;
        }

        .button-group {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .gen-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 500;
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 9px;
          color: var(--text);
          cursor: pointer;
          transition: all 0.2s;
        }

        .gen-btn:hover {
          background: var(--primary-surface);
          border-color: var(--primary);
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}