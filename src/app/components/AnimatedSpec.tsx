import React, { useState, useEffect } from 'react';

interface AnimatedSpecProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  delay?: number;
}

export function AnimatedSpec({ label, value, unit, icon, delay = 0 }: AnimatedSpecProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22D3EE]/20 to-[#10B981]/20 flex items-center justify-center">
          {icon}
        </div>
        <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
      </div>

      <div className="mb-2">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-4xl font-bold text-white">{value}</span>
          <span className="text-lg text-[#22D3EE] font-semibold">{unit}</span>
        </div>
        <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">{label}</p>
      </div>

      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-[#22D3EE] to-[#10B981] rounded-full transition-all duration-1000 ${
            isVisible ? 'w-full' : 'w-0'
          }`}
        />
      </div>
    </div>
  );
}
