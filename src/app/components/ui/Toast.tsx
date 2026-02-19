import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

const toastConfig = {
  success: {
    icon: CheckCircle2,
    bg: 'bg-[#10B981]/10',
    border: 'border-[#10B981]/30',
    text: 'text-[#10B981]',
    glow: 'shadow-[0_0_24px_rgba(16,185,129,0.2)]',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-[#EF4444]/10',
    border: 'border-[#EF4444]/30',
    text: 'text-[#EF4444]',
    glow: 'shadow-[0_0_24px_rgba(239,68,68,0.2)]',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-[#F59E0B]/10',
    border: 'border-[#F59E0B]/30',
    text: 'text-[#F59E0B]',
    glow: 'shadow-[0_0_24px_rgba(245,158,11,0.2)]',
  },
  info: {
    icon: Info,
    bg: 'bg-[#22D3EE]/10',
    border: 'border-[#22D3EE]/30',
    text: 'text-[#22D3EE]',
    glow: 'shadow-[0_0_24px_rgba(34,211,238,0.2)]',
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const showToast = React.useCallback((type: ToastType, message: string, duration = 5000) => {
    const id = Math.random().toString(36).substring(7);
    const toast: Toast = { id, type, message, duration };
    
    setToasts((prev) => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => {
          const config = toastConfig[toast.type];
          const Icon = config.icon;

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto backdrop-blur-md bg-[#111827]/95 border rounded-xl p-4 ${config.border} ${config.glow} min-w-[300px] max-w-md animate-in slide-in-from-right-full`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${config.text}`} />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{toast.message}</p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center flex-shrink-0 transition-all"
                >
                  <X className="w-3 h-3 text-[#9CA3AF]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
