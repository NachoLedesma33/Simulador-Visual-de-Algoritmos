import { useCallback, useEffect, useState, useMemo } from 'react';
import { getAlgorithmInfo } from '@/algorithms';
import type { AlgorithmType } from '@/types';

interface RunRecord {
  name: string;
  algorithmId: string;
  steps: number;
  time: number;
  size: number;
}

interface StatsPanelProps {
  algorithmId: AlgorithmType | null;
  currentStep: number;
  totalSteps: number;
  history?: RunRecord[];
}

const COMPLEXITY_LEGENDS: Record<string, string> = {
  'O(1)': 'Constante',
  'O(log n)': 'Logarítmico',
  'O(n)': 'Lineal',
  'O(n log n)': 'Linealítico',
  'O(n²)': 'Cuadrático',
  'O(n³)': 'Cúbico',
  'O(2^n)': 'Exponencial',
};

export function StatsPanel({
  algorithmId,
  currentStep,
  totalSteps,
  history = [],
}: StatsPanelProps) {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const algorithmInfo = algorithmId ? getAlgorithmInfo(algorithmId) : null;

  useEffect(() => {
    if (currentStep > 0 && !startTime) {
      setStartTime(Date.now());
    }
    if (currentStep === 0) {
      setStartTime(null);
      setElapsedTime(0);
    }
  }, [currentStep, startTime]);

  useEffect(() => {
    if (startTime && currentStep > 0 && currentStep < totalSteps - 1) {
      const interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startTime, currentStep, totalSteps]);

  const progressPercent = totalSteps > 0 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  const stepsRemaining = totalSteps - currentStep - 1;
  const msPerStep = currentStep > 0 && elapsedTime > 0 ? elapsedTime / currentStep : 0;
  const estimatedRemaining = msPerStep * stepsRemaining;

  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const copyToClipboard = useCallback(() => {
    const data = JSON.stringify(history, null, 2);
    navigator.clipboard.writeText(data);
  }, [history]);

  const topEfficiency = useMemo(() => {
    if (history.length === 0) return null;
    return history.reduce((best, current) => {
      const bestEff = best.steps / best.size;
      const currentEff = current.steps / current.size;
      return currentEff < bestEff ? current : best;
    }, history[0]);
  }, [history]);

  if (!algorithmId) {
    return null;
  }

  return (
    <div className="stats-panel">
      <div className="sp-header">
        <span className="sp-badge">RENDIMIENTO</span>
      </div>

      <div className="sp-metrics">
        <div className="sp-metric">
          <span className="sp-metric-label">Progreso</span>
          <div className="sp-progress">
            <div className="sp-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="sp-metric-value">
            {currentStep} / {totalSteps - 1}
          </span>
        </div>

        <div className="sp-metric">
          <span className="sp-metric-label">Tiempo</span>
          <span className="sp-metric-value mono">{formatTime(elapsedTime)}</span>
        </div>

        <div className="sp-metric">
          <span className="sp-metric-label">Fin estimado</span>
          <span className="sp-metric-value mono">
            {estimatedRemaining > 0 ? formatTime(estimatedRemaining) : '—'}
          </span>
        </div>
      </div>

      {algorithmInfo && (
        <div className="sp-section">
          <span className="sp-section-title">Complejidad</span>
          <div className="sp-complexity-grid">
            <div className="sp-complexity-item">
              <span className="sp-complexity-label">Tiempo (teórico)</span>
              <span className="sp-complexity-value">{algorithmInfo.complexity.time}</span>
              <span className="sp-complexity-note">
                {COMPLEXITY_LEGENDS[algorithmInfo.complexity.time] || ''}
              </span>
            </div>
            <div className="sp-complexity-item">
              <span className="sp-complexity-label">Espacio</span>
              <span className="sp-complexity-value">{algorithmInfo.complexity.space}</span>
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="sp-section">
          <span className="sp-section-title">Historial</span>
          <div className="sp-history">
            <div className="sp-history-header">
              <span>Algoritmo</span>
              <span>Pasos</span>
              <span>Tiempo</span>
            </div>
            {history.slice(-3).map((record, idx) => (
              <div key={idx} className="sp-history-row">
                <span className="sp-history-name">{record.name}</span>
                <span className="sp-history-steps">{record.steps}</span>
                <span className="sp-history-time">{formatTime(record.time)}</span>
              </div>
            ))}
          </div>
          <button className="sp-export-btn" onClick={copyToClipboard}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 12V3a1 1 0 0 1 1-1h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Copiar JSON
          </button>
        </div>
      )}

      {topEfficiency && (
        <div className="sp-top">
          <span className="sp-top-label">Mejor eficiencia:</span>
          <span className="sp-top-name">{topEfficiency.name}</span>
        </div>
      )}

      <style>{`
        .stats-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 8px;
        }

        .sp-header {
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
        }

        .sp-badge {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .sp-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .sp-metric {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px;
          background: var(--code-bg);
          border-radius: 8px;
        }

        .sp-metric:first-child {
          grid-column: 1 / -1;
        }

        .sp-metric-label {
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .sp-metric-value {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-h);
        }

        .sp-metric-value.mono {
          font-family: var(--mono);
          font-size: 14px;
        }

        .sp-progress {
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
        }

        .sp-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          transition: width 0.1s;
          border-radius: 2px;
        }

        .sp-section {
          padding: 10px;
          background: var(--code-bg);
          border: 1px solid var(--border);
          border-radius: 10px;
        }

        .sp-section-title {
          display: block;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .sp-complexity-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sp-complexity-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sp-complexity-label {
          font-size: 10px;
          color: var(--text-muted);
        }

        .sp-complexity-value {
          font-family: var(--mono);
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
        }

        .sp-complexity-note {
          font-size: 10px;
          color: var(--text-muted);
          font-style: italic;
        }

        .sp-history {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 8px;
        }

        .sp-history-header,
        .sp-history-row {
          display: grid;
          grid-template-columns: 1fr 40px 40px;
          gap: 8px;
          font-size: 11px;
        }

        .sp-history-header {
          font-weight: 600;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
          padding-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sp-history-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--text);
        }

        .sp-history-steps,
        .sp-history-time {
          font-family: var(--mono);
          text-align: right;
          color: var(--text);
          font-size: 10px;
        }

        .sp-export-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          font-size: 11px;
          color: var(--text-muted);
          transition: all 0.2s;
        }

        .sp-export-btn:hover {
          background: var(--code-bg);
          color: var(--text-h);
          border-color: var(--border-hover);
        }

        .sp-top {
          padding: 8px 10px;
          background: rgba(16, 185, 129, 0.06);
          border: 1px solid rgba(16, 185, 129, 0.15);
          border-radius: 8px;
          font-size: 11px;
          display: flex;
          justify-content: space-between;
        }

        .sp-top-label {
          color: var(--text-muted);
        }

        .sp-top-name {
          font-weight: 600;
          color: var(--success);
        }
      `}</style>
    </div>
  );
}
