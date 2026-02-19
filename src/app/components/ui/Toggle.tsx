import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, disabled = false }: ToggleProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`w-11 h-6 rounded-full transition-all ${
            checked
              ? 'bg-gradient-to-r from-[#22D3EE] to-[#10B981] shadow-[0_0_16px_rgba(34,211,238,0.4)]'
              : 'bg-white/10'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
      {label && (
        <span className={`text-sm ${checked ? 'text-white' : 'text-[#9CA3AF]'} group-hover:text-white transition-colors`}>
          {label}
        </span>
      )}
    </label>
  );
}
