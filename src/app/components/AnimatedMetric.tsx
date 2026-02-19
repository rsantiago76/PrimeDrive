import React, { useEffect, useState } from 'react';

interface AnimatedMetricProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: React.ReactNode;
  color?: string;
}

export function AnimatedMetric({ label, value, suffix = '', prefix = '', icon, color = '#22D3EE' }: AnimatedMetricProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6 hover:border-white/20 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div 
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${color}15` }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
      </div>

      <div className="mb-2">
        <p className="text-4xl font-bold text-white mb-1">
          {prefix}{count.toLocaleString()}{suffix}
        </p>
        <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">{label}</p>
      </div>

      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-2000 ease-out"
          style={{ 
            width: `${(count / value) * 100}%`,
            background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`
          }}
        />
      </div>
    </div>
  );
}
