import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  delta?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  sparkline?: React.ReactNode;
}

export function MetricCard({ 
  label, 
  value, 
  delta, 
  icon, 
  iconBg = 'bg-[#22D3EE]/10',
  iconColor = 'text-[#22D3EE]',
  sparkline 
}: MetricCardProps) {
  return (
    <div className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-5 hover:border-[#22D3EE]/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300"
         style={{
           backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
         }}>
      <div className="flex items-start justify-between mb-3">
        {icon && (
          <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shadow-lg`}>
            <div className={iconColor}>
              {icon}
            </div>
          </div>
        )}
        {delta && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
            delta.trend === 'up' 
              ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20' 
              : 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20'
          }`}>
            {delta.trend === 'up' ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span className="text-xs font-medium">
              {delta.trend === 'up' ? '+' : ''}{delta.value}%
            </span>
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">{label}</p>
      {sparkline && (
        <div className="mt-3">
          {sparkline}
        </div>
      )}
    </div>
  );
}