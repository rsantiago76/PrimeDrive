import React from 'react';
import { GlassCard } from './GlassCard';

interface KPICardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  glow?: boolean;
  glowColor?: string;
}

export function KPICard({ label, value, change, changeType = 'neutral', glow = false, glowColor = 'cyan' }: KPICardProps) {
  const changeColor =
    changeType === 'positive'
      ? 'text-[#10B981]'
      : changeType === 'negative'
      ? 'text-[#EF4444]'
      : 'text-[#9CA3AF]';

  return (
    <GlassCard glow={glow} glowColor={glowColor}>
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">{label}</p>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-white leading-none">{value}</span>
          {change && (
            <span className={`text-sm font-medium ${changeColor}`}>{change}</span>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
