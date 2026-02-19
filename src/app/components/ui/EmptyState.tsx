import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
          <div className="text-[#9CA3AF]">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      {description && (
        <p className="text-[#9CA3AF] text-sm text-center max-w-md mb-6">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#10B981] hover:shadow-[0_0_24px_rgba(34,211,238,0.4)] text-white text-sm font-medium transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
