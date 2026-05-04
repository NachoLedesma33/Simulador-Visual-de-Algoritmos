import { useCallback, useState, useEffect } from 'react';
import { getAlgorithmTheory } from '@/constants/theory';
import type { AlgorithmTheory, SupportedAlgorithmType } from '@/constants/theory';
import type { AlgorithmType } from '@/types';

interface TheoryModalProps {
  algorithmType: AlgorithmType | null;
  onClose: () => void;
}

export function TheoryModal({ algorithmType, onClose }: TheoryModalProps) {
  const [theory, setTheory] = useState<AlgorithmTheory | null>(null);
  const [activeTab, setActiveTab] = useState<'concept' | 'code' | 'usage'>('concept');

  useEffect(() => {
    if (algorithmType) {
      const theoryData = getAlgorithmTheory(algorithmType as SupportedAlgorithmType);
      setTheory(theoryData);
    }
  }, [algorithmType]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!theory) return null;

  const formatPseudocode = (code: string) => {
    return code.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      let formattedLine = trimmed;
      const indentLevel = line.search(/\S/);

      const keywords = ['function', 'if', 'else', 'while', 'for', 'return', 'const', 'let', 'var', 'in', 'to', 'not', 'true', 'false', 'empty', 'push', 'pop', 'shift', 'continue', 'break'];
      const isKeyword = keywords.some(kw => trimmed.startsWith(kw) || trimmed.includes(` ${kw}`) || trimmed.includes(`(${kw}`));
      const isComment = trimmed.startsWith('//') || trimmed.startsWith('#');
      const isFunction = trimmed.startsWith('function');
      const isControl = /\b(if|while|for|return|else)\b/.test(trimmed);

      return (
        <div 
          key={idx} 
          className={`code-line ${isComment ? 'comment' : ''} ${isKeyword ? 'keyword' : ''} ${isFunction ? 'function' : ''} ${isControl ? 'control' : ''}`}
          style={{ paddingLeft: `${indentLevel * 12}px` }}
        >
          {formattedLine || '\n'}
        </div>
      );
    });
  };

  return (
    <div className="theory-overlay" onClick={onClose}>
      <div className="theory-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Cerrar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="theory-header">
          <span className="theory-category">
            {theory.id === 'bubble' && 'Ordenamiento'}
            {theory.id === 'quick' && 'Ordenamiento'}
            {theory.id === 'merge' && 'Ordenamiento'}
            {theory.id === 'insertion' && 'Ordenamiento'}
            {theory.id === 'selection' && 'Ordenamiento'}
            {theory.id === 'heap' && 'Ordenamiento'}
            {theory.id === 'shell' && 'Ordenamiento'}
            {theory.id === 'radix' && 'Ordenamiento'}
            {theory.id === 'counting' && 'Ordenamiento'}
            {theory.id === 'tim' && 'Ordenamiento'}
            {theory.id === 'bfs' && 'Búsqueda'}
            {theory.id === 'dfs' && 'Búsqueda'}
            {theory.id === 'dijkstra' && 'Búsqueda'}
            {theory.id === 'astar' && 'Búsqueda'}
            {theory.id === 'bidirectional_bfs' && 'Búsqueda'}
            {theory.id === 'greedy_best_first' && 'Búsqueda'}
            {theory.id === 'bellman_ford' && 'Búsqueda'}
            {theory.id === 'floyd_warshall' && 'Búsqueda'}
          </span>
          <h2 className="theory-title">{theory.id}</h2>
        </div>

        <div className="theory-tabs">
          <button
            className={`tab ${activeTab === 'concept' ? 'active' : ''}`}
            onClick={() => setActiveTab('concept')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="tab-icon">
              <circle cx="7" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3 12.5C3 10.5 5 9 7 9C9 9 11 10.5 11 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Concepto
          </button>
          <button
            className={`tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="tab-icon">
              <path d="M4 4L1 7L4 10M10 4L13 7L10 10M9 2L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Pseudocódigo
          </button>
          <button
            className={`tab ${activeTab === 'usage' ? 'active' : ''}`}
            onClick={() => setActiveTab('usage')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="tab-icon">
              <path d="M2 7H12M2 3H12V11H2V3ZM5 2V5M9 2V5M5 9V12M9 9V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Uso
          </button>
        </div>

        <div className="theory-content">
          {activeTab === 'concept' && (
            <div className="tab-content">
              <section className="theory-section">
                <div className="section-header">
                  <span className="section-icon">💡</span>
                  <h3>¿Qué es?</h3>
                </div>
                <p className="section-text">{theory.concept}</p>
              </section>

              <section className="theory-section">
                <div className="section-header">
                  <span className="section-icon">⚙️</span>
                  <h3>Cómo Funciona</h3>
                </div>
                <p className="section-text">{theory.howItWorks}</p>
              </section>

              <section className="theory-section">
                <div className="section-header">
                  <span className="section-icon">🌍</span>
                  <h3>Ejemplo del Mundo Real</h3>
                </div>
                <p className="section-text">{theory.realWorldExample}</p>
              </section>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="tab-content">
              <div className="code-header">
                <span className="code-lang">Pseudocode</span>
                <span className="code-copy">Copiar</span>
              </div>
              <div className="pseudocode-wrapper">
                <pre className="pseudocode">{formatPseudocode(theory.pseudocode)}</pre>
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="tab-content">
              <section className="theory-section">
                <div className="section-header">
                  <span className="section-icon plus">✓</span>
                  <h3>Ventajas</h3>
                </div>
                <ul className="list pros">
                  {theory.advantages.map((adv, idx) => (
                    <li key={idx}>
                      <span className="list-marker pros"/>
                      {adv}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="theory-section">
                <div className="section-header">
                  <span className="section-icon minus">✗</span>
                  <h3>Desventajas</h3>
                </div>
                <ul className="list cons">
                  {theory.disadvantages.map((disadv, idx) => (
                    <li key={idx}>
                      <span className="list-marker cons"/>
                      {disadv}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="theory-section">
                <div className="section-header">
                  <span className="section-icon">📋</span>
                  <h3>Cuándo Usar Este Algoritmo</h3>
                </div>
                <p className="section-text">{theory.whenToUse}</p>
              </section>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .theory-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 900;
          animation: fadeIn 0.2s ease;
          padding: 20px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .theory-modal {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          width: 100%;
          max-width: 680px;
          max-height: 85vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s ease;
          box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.35);
          position: relative;
        }

        @keyframes slideUp {
          from { transform: translateY(20px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--bg);
          border: 1px solid var(--border);
          cursor: pointer;
          color: var(--text);
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          z-index: 10;
        }

        .close-btn:hover {
          background: var(--danger);
          border-color: var(--danger);
          color: white;
        }

        .theory-header {
          text-align: left;
          margin-bottom: 20px;
          padding-right: 40px;
        }

        .theory-category {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: var(--primary);
          font-weight: 600;
          display: inline-block;
          background: var(--primary-surface);
          padding: 4px 10px;
          border-radius: 6px;
        }

        .theory-title {
          font-size: 26px;
          font-weight: 700;
          margin: 12px 0 0;
          color: var(--text-h);
          font-family: var(--heading);
          letter-spacing: -0.02em;
        }

        .theory-tabs {
          display: flex;
          gap: 6px;
          padding: 4px;
          background: var(--bg);
          border-radius: 12px;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        .tab {
          flex: 1;
          padding: 10px 14px;
          border: none;
          background: transparent;
          color: var(--text);
          font-size: 13px;
          font-weight: 500;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .tab-icon {
          display: none;
        }

        .tab:hover {
          color: var(--text-h);
          background: var(--bg-panel);
        }

        .tab.active {
          background: var(--bg-panel);
          color: var(--primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .theory-content {
          flex: 1;
          overflow-y: auto;
          padding-right: 4px;
        }

        .tab-content {
          animation: fadeIn 0.15s ease;
        }

        .theory-section {
          margin-bottom: 22px;
        }

        .theory-section:last-child {
          margin-bottom: 0;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .section-icon {
          font-size: 14px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--code-bg);
          border-radius: 6px;
        }

        .section-icon.plus {
          color: var(--success);
        }

        .section-icon.minus {
          color: var(--danger);
        }

        .theory-section h3 {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-h);
          margin: 0;
        }

        .section-text {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text);
          margin: 0;
          text-align: left;
        }

        .list {
          margin: 0;
          padding-left: 0;
          list-style: none;
        }

        .list li {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text);
          margin-bottom: 8px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          text-align: left;
        }

        .list-marker {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-top: 7px;
          flex-shrink: 0;
        }

        .list-marker.pros {
          background: var(--success);
        }

        .list-marker.cons {
          background: var(--danger);
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .code-lang {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--primary);
          background: var(--primary-surface);
          padding: 4px 10px;
          border-radius: 6px;
        }

        .code-copy {
          font-size: 12px;
          color: var(--text);
          cursor: pointer;
          padding: 4px 10px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .code-copy:hover {
          background: var(--code-bg);
          color: var(--text-h);
        }

        .pseudocode-wrapper {
          background: var(--code-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }

        .pseudocode {
          background: transparent;
          padding: 16px;
          font-family: var(--mono);
          font-size: 12px;
          line-height: 1.7;
          color: var(--text-h);
          overflow-x: auto;
          margin: 0;
          max-height: 350px;
        }

        .code-line {
          white-space: pre;
        }

        .code-line.keyword {
          color: #8b5cf6;
        }

        .code-line.function {
          color: #3b82f6;
        }

        .code-line.control {
          color: #f59e0b;
        }

        .code-line.comment {
          color: var(--text);
          opacity: 0.6;
        }

        @media (max-width: 520px) {
          .theory-modal {
            padding: 20px 16px;
            border-radius: 16px;
          }

          .theory-tabs {
            flex-wrap: wrap;
          }

          .tab {
            min-width: calc(50% - 4px);
          }
        }
      `}</style>
    </div>
  );
}