import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-gradient-to-r from-[#22D3EE] to-[#10B981] hover:shadow-[0_0_30px_rgba(34,211,238,0.5),0_0_60px_rgba(16,185,129,0.3)] text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300',
  secondary: 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#22D3EE]/30 text-white backdrop-blur-md transition-all duration-300',
  danger: 'bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 hover:border-[#EF4444]/50 text-[#EF4444] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300',
  ghost: 'bg-transparent hover:bg-white/5 text-[#9CA3AF] hover:text-white transition-all duration-300',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : icon ? (
        <div className="w-4 h-4">{icon}</div>
      ) : null}
      {children}
    </button>
  );
}