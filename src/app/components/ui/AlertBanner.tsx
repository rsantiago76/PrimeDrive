import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertBannerProps {
  type: AlertType;
  message: string;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const alertConfig = {
  success: {
    icon: CheckCircle2,
    bg: 'bg-[#10B981]/10',
    border: 'border-[#10B981]/30',
    text: 'text-[#10B981]',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-[#EF4444]/10',
    border: 'border-[#EF4444]/30',
    text: 'text-[#EF4444]',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-[#F59E0B]/10',
    border: 'border-[#F59E0B]/30',
    text: 'text-[#F59E0B]',
  },
  info: {
    icon: Info,
    bg: 'bg-[#22D3EE]/10',
    border: 'border-[#22D3EE]/30',
    text: 'text-[#22D3EE]',
  },
};

export function AlertBanner({ type, message, onDismiss, action }: AlertBannerProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <div className={`backdrop-blur-md bg-[#111827]/60 border rounded-xl p-4 ${config.border} ${config.bg}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.text} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <p className="text-white text-sm">{message}</p>
          {action && (
            <button
              onClick={action.onClick}
              className={`mt-2 text-xs font-medium ${config.text} hover:underline`}
            >
              {action.label}
            </button>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center flex-shrink-0 transition-all"
          >
            <X className="w-3 h-3 text-[#9CA3AF]" />
          </button>
        )}
      </div>
    </div>
  );
}
