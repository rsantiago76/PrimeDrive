import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'cyan' | 'green' | 'amber' | 'red' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

const colorClasses = {
  cyan: '#22D3EE',
  green: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  gradient: 'url(#progressGradient)',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export function ProgressBar({ 
  value, 
  max = 100, 
  label, 
  showPercentage = false,
  color = 'gradient',
  size = 'md',
  glow = true
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  const bgColor = colorClasses[color];

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-xs text-[#9CA3AF]">{label}</span>}
          {showPercentage && <span className="text-xs text-white font-medium">{percentage}%</span>}
        </div>
      )}
      <div className={`relative w-full ${sizeClasses[size]} bg-white/10 rounded-full overflow-hidden`}>
        <svg width="0" height="0">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: color === 'gradient' ? 'linear-gradient(90deg, #22D3EE 0%, #10B981 100%)' : bgColor,
            boxShadow: glow ? `0 0 8px ${color === 'gradient' ? '#22D3EE' : bgColor}40` : 'none',
          }}
        />
      </div>
    </div>
  );
}
