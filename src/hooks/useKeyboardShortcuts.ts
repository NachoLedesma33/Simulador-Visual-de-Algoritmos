import { useEffect, useCallback, useRef, useState } from 'react';

export interface UseKeyboardShortcutsOptions {
  enabled?: boolean;
}

export interface UseKeyboardShortcutsActions {
  onPlay?: () => void;
  onPause?: () => void;
  onNextStep?: () => void;
  onPreviousStep?: () => void;
  onReset?: () => void;
  onSetSpeed?: (speed: number) => void;
  onToggleComparison?: () => void;
  onToggleTheme?: () => void;
}

const SHORTCUTS = {
  PLAY_PAUSE: 'Space',
  STEP_FORWARD: 'ArrowRight',
  STEP_BACKWARD: 'ArrowLeft',
  RESET: 'KeyR',
  SPEED_UP: 'ArrowUp',
  SPEED_DOWN: 'ArrowDown',
  TOGGLE_COMPARISON: 'KeyC',
  TOGGLE_THEME: 'KeyD',
  HELP: 'KeyH',
};

const STEP_DELAY = 80;
const ACTION_FEEDBACK_DURATION = 600;

export function useKeyboardShortcuts(actions: UseKeyboardShortcutsActions, options: UseKeyboardShortcutsOptions = {}) {
  const { enabled = true } = options;
  const isInputFocused = useRef(false);
  const lastStepTime = useRef(0);
  const [showHelp, setShowHelp] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const hideActionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimeout = useCallback(() => {
    if (hideActionTimeout.current) {
      clearTimeout(hideActionTimeout.current);
      hideActionTimeout.current = null;
    }
  }, []);

  const showActionFeedback = useCallback((action: string) => {
    setLastAction(action);
    clearHideTimeout();
    hideActionTimeout.current = setTimeout(() => {
      setLastAction(null);
    }, ACTION_FEEDBACK_DURATION);
  }, [clearHideTimeout]);

  const checkInputFocus = useCallback((): boolean => {
    const activeElement = document.activeElement;
    if (!activeElement) return false;
    const tagName = activeElement.tagName.toLowerCase();
    if (['input', 'textarea', 'select'].includes(tagName)) return true;
    const editable = activeElement as HTMLElement;
    return editable.isContentEditable;
  }, []);

  useEffect(() => {
    if (!enabled) return () => {};

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInputFocused.current) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const now = Date.now();
      const code = e.code;

      switch (code) {
        case SHORTCUTS.PLAY_PAUSE:
          e.preventDefault();
          actions.onPlay?.();
          showActionFeedback('play');
          break;

        case SHORTCUTS.STEP_FORWARD:
          e.preventDefault();
          if (now - lastStepTime.current > STEP_DELAY) {
            lastStepTime.current = now;
            actions.onNextStep?.();
            showActionFeedback('forward');
          }
          break;

        case SHORTCUTS.STEP_BACKWARD:
          e.preventDefault();
          if (now - lastStepTime.current > STEP_DELAY) {
            lastStepTime.current = now;
            actions.onPreviousStep?.();
            showActionFeedback('backward');
          }
          break;

        case SHORTCUTS.RESET:
          e.preventDefault();
          actions.onReset?.();
          showActionFeedback('reset');
          break;

        case SHORTCUTS.SPEED_UP:
          e.preventDefault();
          actions.onSetSpeed?.(Math.min(100, 50 + 5));
          showActionFeedback('speed');
          break;

        case SHORTCUTS.SPEED_DOWN:
          e.preventDefault();
          actions.onSetSpeed?.(Math.max(1, 50 - 5));
          showActionFeedback('speed');
          break;

        case SHORTCUTS.TOGGLE_COMPARISON:
          e.preventDefault();
          actions.onToggleComparison?.();
          showActionFeedback('comparison');
          break;

        case SHORTCUTS.TOGGLE_THEME:
          e.preventDefault();
          actions.onToggleTheme?.();
          showActionFeedback('theme');
          break;

        case SHORTCUTS.HELP:
          e.preventDefault();
          setShowHelp((prev) => !prev);
          break;

        default:
          break;
      }
    };

    const focusInHandler = () => {
      isInputFocused.current = checkInputFocus();
    };
    const focusOutHandler = () => {
      isInputFocused.current = false;
      setTimeout(() => {
        isInputFocused.current = checkInputFocus();
      }, 10);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', focusInHandler);
    document.addEventListener('focusout', focusOutHandler);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', focusInHandler);
      document.removeEventListener('focusout', focusOutHandler);
      clearHideTimeout();
    };
  }, [enabled, actions, showActionFeedback, checkInputFocus, clearHideTimeout]);

  const shortcutsList = [
    { key: 'Espacio', action: 'Reproducir/Pausar' },
    { key: '→', action: 'Siguiente paso' },
    { key: '←', action: 'Paso anterior' },
    { key: 'R', action: 'Reiniciar' },
    { key: '↑', action: 'Velocidad +' },
    { key: '↓', action: 'Velocidad -' },
    { key: 'C', action: 'Comparar' },
    { key: 'D', action: 'Tema' },
    { key: 'H', action: 'Ayuda' },
  ];

  return {
    showHelp,
    setShowHelp,
    lastAction,
    shortcutsList,
  };
}