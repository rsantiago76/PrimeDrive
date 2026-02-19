import React from 'react';
import { MapPin, Clock, Battery, Wifi, User, ChevronRight } from 'lucide-react';

interface VehicleCardProps {
  id: string;
  model: string;
  battery: number;
  eta: string;
  passengers: number;
  distance: string;
  status: 'available' | 'in-transit' | 'charging';
  location: string;
}

export function VehicleCard({ id, model, battery, eta, passengers, distance, status, location }: VehicleCardProps) {
  const statusConfig = {
    available: { color: 'text-[#10B981]', bg: 'bg-[#10B981]/10', label: 'Available' },
    'in-transit': { color: 'text-[#22D3EE]', bg: 'bg-[#22D3EE]/10', label: 'In Transit' },
    charging: { color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10', label: 'Charging' },
  };

  const config = statusConfig[status];

  return (
    <div className="group backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[14px] p-5 hover:bg-[#111827]/80 hover:border-[#22D3EE]/30 transition-all duration-300 cursor-pointer hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-semibold">{model}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${config.bg} ${config.color}`}>
              {config.label}
            </span>
          </div>
          <p className="text-[#9CA3AF] text-xs">ID: {id}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#22D3EE] transition-colors" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
            <Battery className="w-4 h-4 text-[#10B981]" />
          </div>
          <div>
            <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Battery</p>
            <p className="text-sm font-semibold text-white">{battery}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-[#22D3EE]" />
          </div>
          <div>
            <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">ETA</p>
            <p className="text-sm font-semibold text-white">{eta}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-[#9CA3AF] text-xs">
          <MapPin className="w-3.5 h-3.5" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#9CA3AF] text-xs">
          <User className="w-3.5 h-3.5" />
          <span>{passengers}/4</span>
        </div>
      </div>
    </div>
  );
}
