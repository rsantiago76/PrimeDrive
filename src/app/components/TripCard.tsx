import React from 'react';
import { MapPin, Clock, User, ArrowRight } from 'lucide-react';

interface TripCardProps {
  pickup: string;
  destination: string;
  time: string;
  duration: string;
  passenger: string;
  vehicleId: string;
  status: 'scheduled' | 'active' | 'completed';
}

export function TripCard({ pickup, destination, time, duration, passenger, vehicleId, status }: TripCardProps) {
  const statusConfig = {
    scheduled: { color: 'text-[#9CA3AF]', bg: 'bg-[#9CA3AF]/10', label: 'Scheduled' },
    active: { color: 'text-[#22D3EE]', bg: 'bg-[#22D3EE]/10', label: 'Active', glow: true },
    completed: { color: 'text-[#10B981]', bg: 'bg-[#10B981]/10', label: 'Completed' },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[14px] p-4 transition-all duration-300 hover:bg-[#111827]/80 ${
        config.glow ? 'shadow-[0_0_20px_rgba(34,211,238,0.1)]' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#22D3EE]" />
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{pickup}</p>
              <p className="text-[#9CA3AF] text-xs">{time}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-1 mb-3">
            <div className="w-px h-6 bg-white/10" />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{destination}</p>
              <p className="text-[#9CA3AF] text-xs">{duration}</p>
            </div>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${config.bg} ${config.color}`}>
          {config.label}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#22D3EE]/10 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-[#22D3EE]" />
          </div>
          <div>
            <p className="text-white text-xs font-medium">{passenger}</p>
            <p className="text-[#9CA3AF] text-[10px]">{vehicleId}</p>
          </div>
        </div>

        {status === 'active' && (
          <button className="text-[#22D3EE] text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Track
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
