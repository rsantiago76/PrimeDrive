import React from 'react';
import { Filter } from 'lucide-react';

interface RentalFiltersProps {
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

export function RentalFilters({ statusFilter, onStatusChange }: RentalFiltersProps) {
  const statuses = [
    { value: 'all', label: 'All Rentals', count: 342 },
    { value: 'active', label: 'Active', count: 287 },
    { value: 'pending', label: 'Pending', count: 28 },
    { value: 'completed', label: 'Completed', count: 22 },
    { value: 'overdue', label: 'Overdue', count: 5 },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
        <Filter className="w-4 h-4" />
        <span className="hidden lg:inline">Status:</span>
      </div>
      <div className="flex items-center gap-2">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => onStatusChange(status.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === status.value
                ? 'bg-gradient-to-r from-[#22D3EE] to-[#10B981] text-white shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                : 'bg-white/5 text-[#9CA3AF] hover:bg-white/10 hover:text-white'
            }`}
          >
            {status.label}
            <span className={`ml-2 text-xs ${statusFilter === status.value ? 'opacity-90' : 'opacity-60'}`}>
              {status.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
