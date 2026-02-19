import React from 'react';

type StatusType = 'available' | 'rented' | 'maintenance' | 'overdue' | 'active' | 'inactive' | 'completed' | 'scheduled' | 'urgent' | 'excellent' | 'good' | 'warning' | 'critical';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

const statusConfig: Record<StatusType, { bg: string; text: string; dot: string; label: string }> = {
  available: { bg: 'bg-[#10B981]/10', text: 'text-[#10B981]', dot: 'bg-[#10B981]', label: 'Available' },
  rented: { bg: 'bg-[#22D3EE]/10', text: 'text-[#22D3EE]', dot: 'bg-[#22D3EE]', label: 'Rented' },
  maintenance: { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]', label: 'Maintenance' },
  overdue: { bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', dot: 'bg-[#EF4444]', label: 'Overdue' },
  active: { bg: 'bg-[#22D3EE]/10', text: 'text-[#22D3EE]', dot: 'bg-[#22D3EE]', label: 'Active' },
  inactive: { bg: 'bg-[#6B7280]/10', text: 'text-[#6B7280]', dot: 'bg-[#6B7280]', label: 'Inactive' },
  completed: { bg: 'bg-[#10B981]/10', text: 'text-[#10B981]', dot: 'bg-[#10B981]', label: 'Completed' },
  scheduled: { bg: 'bg-[#22D3EE]/10', text: 'text-[#22D3EE]', dot: 'bg-[#22D3EE]', label: 'Scheduled' },
  urgent: { bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', dot: 'bg-[#EF4444]', label: 'Urgent' },
  excellent: { bg: 'bg-[#10B981]/10', text: 'text-[#10B981]', dot: 'bg-[#10B981]', label: 'Excellent' },
  good: { bg: 'bg-[#22D3EE]/10', text: 'text-[#22D3EE]', dot: 'bg-[#22D3EE]', label: 'Good' },
  warning: { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]', label: 'Warning' },
  critical: { bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', dot: 'bg-[#EF4444]', label: 'Critical' },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-sm',
};

export function StatusBadge({ status, label, size = 'md', showDot = false }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.active; // Fallback to 'active' if status not found
  const displayLabel = label || (config ? config.label : status);

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full ${config.bg} ${config.text} ${sizeClasses[size]} font-medium`}>
      {showDot && <div className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />}
      <span>{displayLabel}</span>
    </div>
  );
}