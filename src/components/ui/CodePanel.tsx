import { useCallback, useMemo } from 'react';
import { getPseudocode, type PseudocodeBlock } from '@/constants/pseudocode';

interface CodePanelProps {
  algorithmId: string | null;
  currentLine?: number;
  explanation?: string;
}

const KEYWORDS = ['procedure', 'for', 'while', 'if', 'else', 'return', 'function', 'def', 'not', 'and', 'or', 'in', 'True', 'False', 'null', 'None'];

function highlightSyntax(code: string) {
  const words = code.split(/(\s+|[(),:\[\]])/g);
  const elements: React.ReactNode[] = [];

  words.forEach((word, idx) => {
    if (KEYWORDS.includes(word)) {
      elements.push(<span key={idx} className="keyword">{word}</span>);
    } else if (!isNaN(Number(word))) {
      elements.push(<span key={idx} className="number">{word}</span>);
    } else {
      elements.push(<span key={idx}>{word}</span>);
    }
  });

  return elements;
}

export function CodePanel({
  algorithmId,
  currentLine,
  explanation,
}: CodePanelProps) {
  const pseudocode = useMemo((): PseudocodeBlock | null => {
    if (!algorithmId) return null;
    return getPseudocode(algorithmId);
  }, [algorithmId]);

  const handleCopy = useCallback(() => {
    if (!pseudocode) return;

    const text = pseudocode.lines
      .map((line) => line.code)
      .filter((code) => code.trim())
      .join('\n');

    navigator.clipboard.writeText(text);
  }, [pseudocode]);

  if (!pseudocode) {
    return (
      <div className="code-panel empty">
        <p className="empty-text">Selecciona un algoritmo para ver el pseudocódigo</p>
        <style>{`
          .code-panel {
            padding: 14px;
            background: var(--code-bg);
            border: 1px solid var(--border);
            border-radius: 10px;
            font-family: var(--mono);
            font-size: 12px;
            margin-top: 8px;
          }
          .code-panel.empty {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .empty-text {
            color: var(--text-muted);
            font-size: 12px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="code-panel">
      <div className="cp-header">
        <div className="cp-header-left">
          <span className="cp-badge">PSEUDOCODE</span>
          <span className="cp-name">{pseudocode.name}</span>
        </div>
        <button className="cp-copy-btn" onClick={handleCopy} title="Copiar">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M2 12V3a1 1 0 0 1 1-1h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="code-lines">
        {pseudocode.lines.map((line) => (
          <div
            key={line.id}
            className={`code-line ${currentLine === line.id ? 'highlighted' : ''}`}
          >
            <span className="line-number">{line.id}</span>
            <span className="line-code">{highlightSyntax(line.code)}</span>
            {line.comment && (
              <span className="line-comment">// {line.comment}</span>
            )}
          </div>
        ))}
      </div>

      {explanation && (
        <div className="explanation-box">
          <span className="explanation-label">Paso actual:</span>
          <span className="explanation-text">{explanation}</span>
        </div>
      )}

      <style>{`
        .code-panel {
          display: flex;
          flex-direction: column;
          padding: 12px;
          background: var(--code-bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          font-family: var(--mono);
          font-size: 12px;
          margin-top: 8px;
          overflow: hidden;
        }

        .cp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
        }

        .cp-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cp-badge {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--primary);
          text-transform: uppercase;
          background: var(--primary-dim);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .cp-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-h);
        }

        .cp-copy-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 6px;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.2s;
        }

        .cp-copy-btn:hover {
          background: var(--bg-card);
          color: var(--text-h);
          border-color: var(--border-hover);
        }

        .code-lines {
          flex: 1;
          overflow-y: auto;
          max-height: 300px;
        }

        .code-line {
          display: flex;
          gap: 8px;
          padding: 3px 6px;
          border-radius: 4px;
          line-height: 1.5;
        }

        .code-line.highlighted {
          background: rgba(34, 211, 238, 0.1);
          border-left: 2px solid var(--primary);
        }

        .line-number {
          min-width: 18px;
          color: var(--text-muted);
          opacity: 0.5;
          user-select: none;
          text-align: right;
          font-size: 11px;
        }

        .line-code {
          flex: 1;
          color: var(--text);
          white-space: pre;
        }

        .line-code .keyword {
          color: #22d3ee;
          font-weight: 500;
        }

        .line-code .number {
          color: #f43f5e;
        }

        .line-comment {
          display: none;
          font-size: 10px;
          color: var(--text-muted);
          font-style: italic;
        }

        .code-line.highlighted .line-comment {
          display: block;
        }

        .explanation-box {
          margin-top: 8px;
          padding: 8px 10px;
          background: rgba(34, 211, 238, 0.08);
          border-radius: 6px;
          border-left: 2px solid var(--primary);
        }

        .explanation-label {
          display: block;
          font-size: 10px;
          color: var(--text-muted);
          margin-bottom: 2px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .explanation-text {
          font-size: 12px;
          color: var(--text);
        }
      `}</style>
    </div>
  );
}
