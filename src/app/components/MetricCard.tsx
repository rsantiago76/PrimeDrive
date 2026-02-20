import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  change?: number;
  suffix?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  highlight?: boolean;
}

export function MetricCard({ label, value, change, suffix, icon, trend = 'neutral', highlight = false }: MetricCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-3.5 h-3.5" />;
    if (trend === 'down') return <TrendingDown className="w-3.5 h-3.5" />;
    return <Minus className="w-3.5 h-3.5" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-[#10B981]';
    if (trend === 'down') return 'text-[#EF4444]';
    return 'text-[#9CA3AF]';
  };

  return (
    <div
      className={`backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[14px] p-5 transition-all duration-300 ${
        highlight ? 'shadow-[0_0_24px_rgba(34,211,238,0.15)] border-[#22D3EE]/30' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">{label}</p>
        {icon && <div className="text-[#22D3EE]">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold text-white leading-none">{value}</span>
        {suffix && <span className="text-sm text-[#9CA3AF] font-medium">{suffix}</span>}
      </div>

      {change !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-medium ${getTrendColor()}`}>
          {getTrendIcon()}
          <span>{Math.abs(change)}%</span>
          <span className="text-[#9CA3AF]">vs last week</span>
        </div>
      )}
    </div>
  );
}
