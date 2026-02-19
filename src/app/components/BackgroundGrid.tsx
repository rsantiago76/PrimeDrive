import React from 'react';

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E] via-[#111827] to-[#0A0F1E]" />
      
      {/* Enhanced radial glow effects - MUCH MORE VISIBLE */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#22D3EE]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#10B981]/10 rounded-full blur-[120px] animate-pulse" 
           style={{ animationDelay: '1s', animationDuration: '4s' }} />
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[#22D3EE]/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      
      {/* Vertical lines */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-white/[0.05]"
            style={{ left: `${(i + 1) * 5}%` }}
          />
        ))}
      </div>
      {/* Horizontal lines */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-white/[0.05]"
            style={{ top: `${(i + 1) * 5}%` }}
          />
        ))}
      </div>
    </div>
  );
}