import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration: number;
  createdAt: number;
}

type ViewMode = 'single' | 'comparison' | 'fullscreen';
type AccentColor = 'purple' | 'blue' | 'green' | 'orange';
type ModalType = 'settings' | 'shortcuts' | 'about' | 'export' | null;

interface UIStore {
  showSidebar: boolean;
  sidebarWidth: number;
  showStats: boolean;
  showPseudocode: boolean;
  showControls: boolean;
  selectedView: ViewMode;
  toasts: Toast[];
  darkMode: boolean;
  accentColor: AccentColor;
  reducedMotion: boolean;
  activeModal: ModalType;
  modalData: Record<string, unknown> | null;
  toggleSidebar: () => void;
  setSidebarWidth: (px: number) => void;
  toggleStats: () => void;
  togglePseudocode: () => void;
  toggleControls: () => void;
  setSelectedView: (view: ViewMode) => void;
  addToast: (message: string, type: Toast['type'], duration?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  toggleDarkMode: () => void;
  setAccentColor: (color: AccentColor) => void;
  setReducedMotion: (value: boolean) => void;
  openModal: (modal: ModalType, data?: Record<string, unknown>) => void;
  closeModal: () => void;
}

function getSystemPreferences(): Pick<UIStore, 'darkMode' | 'reducedMotion'> {
  if (typeof window === 'undefined') {
    return { darkMode: false, reducedMotion: false };
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return { darkMode: prefersDark, reducedMotion: prefersReduced };
}

export const useUIStore = create<UIStore>()(
  devtools(
    (set) => {
      const prefs = getSystemPreferences();
      return {
        showSidebar: true,
        sidebarWidth: 320,
        showStats: true,
        showPseudocode: true,
        showControls: true,
        selectedView: 'single',
        toasts: [],
        darkMode: prefs.darkMode,
        accentColor: 'purple' as const,
        reducedMotion: prefs.reducedMotion,
        activeModal: null,
        modalData: null,

        toggleSidebar: () => set((s) => ({ showSidebar: !s.showSidebar })),

        setSidebarWidth: (px: number) =>
          set({ sidebarWidth: Math.max(240, Math.min(480, px)) }),

        toggleStats: () => set((s) => ({ showStats: !s.showStats })),

        togglePseudocode: () => set((s) => ({ showPseudocode: !s.showPseudocode })),

        toggleControls: () => set((s) => ({ showControls: !s.showControls })),

        setSelectedView: (view) =>
          set({
            selectedView: view,
            showSidebar: view === 'fullscreen' ? false : undefined,
          }),

        addToast: (message, type, duration) => {
          const defaults: Record<Toast['type'], number> = {
            info: 3000,
            success: 3000,
            warning: 5000,
            error: 0,
          };
          const finalDuration = duration ?? defaults[type];
          const newToast: Toast = {
            id: crypto.randomUUID(),
            message,
            type,
            duration: finalDuration,
            createdAt: Date.now(),
          };

          set((s) => {
            let updated = [...s.toasts, newToast];
            if (updated.length > 4) {
              updated = updated
                .sort((a, b) => a.createdAt - b.createdAt)
                .slice(1);
            }
            return { toasts: updated };
          });
        },

        removeToast: (id) =>
          set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

        clearToasts: () => set({ toasts: [] }),

        toggleDarkMode: () => {
          set((s) => {
            const newMode = !s.darkMode;
            if (typeof document !== 'undefined') {
              document.documentElement.classList.toggle('dark', newMode);
            }
            return { darkMode: newMode };
          });
        },

        setAccentColor: (color) => set({ accentColor: color }),

        setReducedMotion: (value) => set({ reducedMotion: value }),

        openModal: (modal, data) =>
          set({ activeModal: modal, modalData: data ?? null }),

        closeModal: () => set({ activeModal: null, modalData: null }),
      };
    },
    { name: 'ui-store' }
  )
);

function selectActiveToasts(state: UIStore): Toast[] {
  const now = Date.now();
  return state.toasts.filter(
    (t) => t.duration === 0 || t.createdAt + t.duration > now
  );
}

export { selectActiveToasts };
export type { UIStore };