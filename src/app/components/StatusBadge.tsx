import React from 'react';

interface StatusBadgeProps {
  status: 'active' | 'maintenance' | 'critical' | 'idle';
  label: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      color: 'bg-[#10B981]',
      textColor: 'text-[#10B981]',
      bgColor: 'bg-[#10B981]/10',
    },
    maintenance: {
      color: 'bg-[#F59E0B]',
      textColor: 'text-[#F59E0B]',
      bgColor: 'bg-[#F59E0B]/10',
    },
    critical: {
      color: 'bg-[#EF4444]',
      textColor: 'text-[#EF4444]',
      bgColor: 'bg-[#EF4444]/10',
    },
    idle: {
      color: 'bg-[#9CA3AF]',
      textColor: 'text-[#9CA3AF]',
      bgColor: 'bg-[#9CA3AF]/10',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bgColor} ${config.textColor} text-xs font-medium`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.color}`} />
      {label}
    </span>
  );
}
