'use client';

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

// ═══════════════════════════════════════
// Types
// ═══════════════════════════════════════

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  createdAt: number;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

// ═══════════════════════════════════════
// Constants
// ═══════════════════════════════════════

const TOAST_DURATION = 2500;
const MAX_TOASTS = 3;

const TYPE_CONFIG: Record<ToastType, { color: string; icon: typeof CheckCircle2 }> = {
  success: { color: '#C4622D', icon: CheckCircle2 },   // rust
  error:   { color: '#DC2626', icon: AlertCircle },     // red
  info:    { color: '#B8962E', icon: Info },             // gold
};

// ═══════════════════════════════════════
// Context
// ═══════════════════════════════════════

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    // Provide a graceful fallback during SSR or if used outside provider
    return {
      success: (msg: string) => console.log('Toast success:', msg),
      error: (msg: string) => console.error('Toast error:', msg),
      info: (msg: string) => console.info('Toast info:', msg),
    };
  }
  return context;
}

// ═══════════════════════════════════════
// Single Toast Component
// ═══════════════════════════════════════

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const config = TYPE_CONFIG[toast.type];
  const Icon = config.icon;

  useEffect(() => {
    const exitTimer = setTimeout(() => setIsExiting(true), TOAST_DURATION - 300);
    const removeTimer = setTimeout(() => onDismiss(toast.id), TOAST_DURATION);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [toast.id, onDismiss]);

  return (
    <div
      onClick={() => onDismiss(toast.id)}
      className="relative overflow-hidden cursor-pointer select-none"
      style={{
        animation: isExiting
          ? 'toastSlideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          : 'toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <div
        className="flex items-center gap-3 bg-[#141414] border border-[#1E1E1E] px-4 py-3 min-w-[280px] max-w-[420px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={{ borderLeftWidth: '3px', borderLeftColor: config.color }}
      >
        <Icon size={16} style={{ color: config.color, flexShrink: 0 }} />
        <span className="font-mono text-[11px] text-[#F5F0E8] leading-snug flex-1">
          {toast.message}
        </span>
        <X size={12} className="text-[#8A9A9E] hover:text-[#F5F0E8] transition-colors flex-shrink-0" />
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{
          backgroundColor: config.color,
          animation: `toastProgress ${TOAST_DURATION}ms linear forwards`,
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════
// Toast Provider
// ═══════════════════════════════════════

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => {
      const next = [...prev, { id, type, message, createdAt: Date.now() }];
      // Keep only the latest MAX_TOASTS
      return next.slice(-MAX_TOASTS);
    });
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const contextValue: ToastContextValue = {
    success: useCallback((msg: string) => addToast('success', msg), [addToast]),
    error: useCallback((msg: string) => addToast('error', msg), [addToast]),
    info: useCallback((msg: string) => addToast('info', msg), [addToast]),
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Toast Container — bottom center, fixed */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9998] flex flex-col-reverse gap-2 pointer-events-none"
        style={{ maxWidth: 'calc(100vw - 32px)' }}
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={dismissToast} />
          </div>
        ))}
      </div>

      {/* Keyframes injected once */}
      <style jsx global>{`
        @keyframes toastSlideIn {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes toastSlideOut {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(8px) scale(0.96);
          }
        }
        @keyframes toastProgress {
          0% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
