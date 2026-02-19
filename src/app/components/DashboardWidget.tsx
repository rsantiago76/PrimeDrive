import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardWidgetProps {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  color?: string;
}

export function DashboardWidget({ label, value, change, icon, trend = 'up', color = '#22D3EE' }: DashboardWidgetProps) {
  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6 hover:border-white/20 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
            trend === 'up' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'
          }`}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="text-xs font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>

      <div className="mb-1">
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">{label}</p>
    </div>
  );
}
