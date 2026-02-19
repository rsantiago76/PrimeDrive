import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: string;
}

export function GlassCard({ children, className = '', glow = false, glowColor = 'cyan' }: GlassCardProps) {
  const glowStyles = glow
    ? glowColor === 'cyan'
      ? 'shadow-[0_0_30px_rgba(34,211,238,0.25),0_8px_32px_rgba(34,211,238,0.1)]'
      : glowColor === 'green'
      ? 'shadow-[0_0_30px_rgba(16,185,129,0.25),0_8px_32px_rgba(16,185,129,0.1)]'
      : glowColor === 'amber'
      ? 'shadow-[0_0_30px_rgba(245,158,11,0.25),0_8px_32px_rgba(245,158,11,0.1)]'
      : 'shadow-[0_0_30px_rgba(239,68,68,0.25),0_8px_32px_rgba(239,68,68,0.1)]'
    : '';

  return (
    <div
      className={`backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] p-5 ${glowStyles} ${className}`}
      style={{
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        boxShadow: glow ? undefined : '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      {children}
    </div>
  );
}