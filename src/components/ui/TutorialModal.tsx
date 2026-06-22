import { useState, useEffect, useCallback } from 'react';

interface TutorialStep {
  id: number;
  title: string;
  content: string;
  icon: string;
  highlight?: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    title: '¡Bienvenido!',
    content:
      'Aprende algoritmos visualmente. Observa cómo trabajan los algoritmos de ordenamiento y búsqueda de caminos en tiempo real.',
    icon: '✨',
  },
  {
    id: 2,
    title: 'Algoritmos de Ordenamiento',
    content:
      'Visualiza Bubble Sort, Quick Sort, Merge Sort y más. Cada barra representa un número. Mira cómo se comparan e intercambian posiciones.',
    icon: '📊',
    highlight: '.canvas-area',
  },
  {
    id: 3,
    title: 'Búsqueda de Caminos',
    content:
      'Explora BFS, DFS, Dijkstra y A*. El grid muestra obstáculos (paredes), el inicio (verde) y el objetivo (rojo).',
    icon: '🗺️',
    highlight: '.canvas-area',
  },
  {
    id: 4,
    title: 'Controles de Reproducción',
    content:
      'Usa los botones ▶⏸ para reproducir/pausar. La barra de velocidad controla qué tan rápido avanza el algoritmo.',
    icon: '🎮',
    highlight: '.control-panel',
  },
  {
    id: 5,
    title: 'Editor de Datos',
    content:
      'Genera arrays aleatorios, casi ordenados o invertidos. Para pathfinding, dibuja paredes directamente en el grid o usa generadores.',
    icon: '🎲',
  },
  {
    id: 6,
    title: 'Atajos de Teclado',
    content:
      'Espacio = Play/Pause, Flechas = navegar pasos, R = reiniciar, D = tema oscuro. ¡Todo sin despegar la vista del canvas!',
    icon: '⌨️',
  },
  {
    id: 7,
    title: '¡Listo para Comenzar!',
    content:
      'Ahora tienes todo lo necesario. Selecciona un algoritmo y observa cómo funciona. ¡Diviértete aprendiendo!',
    icon: '🚀',
  },
];

interface TutorialModalProps {
  onComplete?: () => void;
}

export function TutorialModal({ onComplete }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const STORAGE_KEY = 'algovis-tutorial-seen';

  useEffect(() => {
    const hasSeen = localStorage.getItem(STORAGE_KEY);
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, 'true');
    onComplete?.();
  }, [onComplete]);

  const handleNext = useCallback(() => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleClose();
    }
  }, [currentStep, handleClose]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.code) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
      }
    },
    [isOpen, handleClose, handleNext, handlePrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  const step = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100;

  return (
    <div className="tut-overlay" onClick={handleSkip}>
      <div
        className="tut-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tut-title"
      >
        <button className="tut-close" onClick={handleClose} aria-label="Cerrar">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="tut-icon-wrap">
          <span className="tut-icon">{step.icon}</span>
        </div>

        <h2 id="tut-title" className="tut-title">
          {step.title}
        </h2>

        <p className="tut-content">{step.content}</p>

        <div className="tut-dots">
          {TUTORIAL_STEPS.map((_, idx) => (
            <span
              key={idx}
              className={`tut-dot ${idx === currentStep ? 'active' : ''} ${
                idx < currentStep ? 'completed' : ''
              }`}
            />
          ))}
        </div>

        <div className="tut-progress">
          <div className="tut-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="tut-actions">
          {currentStep > 0 && (
            <button className="tut-btn tut-btn-secondary" onClick={handlePrev}>
              ← Atrás
            </button>
          )}

          <button className="tut-btn tut-btn-ghost" onClick={handleSkip}>
            Saltar
          </button>

          <button className="tut-btn tut-btn-primary" onClick={handleNext}>
            {isLastStep ? '¡Comenzar!' : 'Siguiente →'}
          </button>
        </div>
      </div>

      <style>{`
        .tut-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: tutFadeIn 0.3s ease;
        }

        @keyframes tutFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .tut-modal {
          background: var(--bg-panel);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px;
          max-width: 400px;
          width: 90%;
          position: relative;
          animation: tutSlideUp 0.4s ease;
          box-shadow: var(--shadow-lg), 0 0 60px rgba(34, 211, 238, 0.05);
        }

        @keyframes tutSlideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .tut-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--bg-card);
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
        }

        .tut-close:hover {
          background: var(--danger-dim);
          border-color: var(--danger);
          color: var(--danger);
        }

        .tut-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .tut-icon {
          font-size: 32px;
          line-height: 1;
        }

        .tut-title {
          font-size: 22px;
          font-weight: 700;
          text-align: center;
          margin: 0 0 12px;
          color: var(--text-h);
        }

        .tut-content {
          font-size: 14px;
          text-align: center;
          line-height: 1.6;
          color: var(--text);
          margin: 0 0 24px;
          min-height: 80px;
        }

        .tut-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .tut-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border);
          transition: all 0.3s;
        }

        .tut-dot.active {
          background: var(--primary);
          box-shadow: 0 0 8px var(--primary-glow);
          transform: scale(1.3);
        }

        .tut-dot.completed {
          background: var(--primary);
          opacity: 0.4;
        }

        .tut-progress {
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          margin-bottom: 24px;
          overflow: hidden;
        }

        .tut-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          transition: width 0.3s ease;
          border-radius: 2px;
        }

        .tut-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .tut-btn {
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          font-family: inherit;
        }

        .tut-btn-primary {
          background: var(--primary);
          color: #000;
          flex: 1;
        }

        .tut-btn-primary:hover {
          background: var(--primary-hover);
          box-shadow: 0 0 20px var(--primary-glow);
        }

        .tut-btn-secondary {
          background: var(--bg-card);
          color: var(--text);
          border: 1px solid var(--border);
        }

        .tut-btn-secondary:hover {
          background: var(--code-bg);
          border-color: var(--border-hover);
          color: var(--text-h);
        }

        .tut-btn-ghost {
          background: transparent;
          color: var(--text-muted);
        }

        .tut-btn-ghost:hover {
          color: var(--text);
        }

        @media (max-width: 480px) {
          .tut-modal {
            padding: 24px 20px;
          }

          .tut-icon {
            font-size: 28px;
          }

          .tut-title {
            font-size: 20px;
          }

          .tut-content {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
