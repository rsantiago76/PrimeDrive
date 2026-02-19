import React from 'react';
import { Car, Users, Gauge, Zap, Settings, Rocket } from 'lucide-react';

interface ListingVehicleCardProps {
  name: string;
  category: string;
  specs: {
    seats: string;
    range: string;
    transmission: string;
  };
  dailyRate: string;
  available: boolean;
  powertrain: 'electric' | 'hybrid' | 'gas';
}

export function ListingVehicleCard({ name, category, specs, dailyRate, available, powertrain }: ListingVehicleCardProps) {
  const powertrainConfig = {
    electric: { icon: Zap, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10', label: 'Electric' },
    hybrid: { icon: Gauge, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10', label: 'Hybrid' },
    gas: { icon: Gauge, color: 'text-[#9CA3AF]', bg: 'bg-[#9CA3AF]/10', label: 'Gas' },
  };

  const config = powertrainConfig[powertrain];
  const PowertrainIcon = config.icon;

  return (
    <div className="group backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] overflow-hidden transition-all duration-500 hover:border-[#22D3EE]/40 hover:shadow-[0_0_32px_rgba(34,211,238,0.2)] hover:-translate-y-1">
      {/* Vehicle Render Area */}
      <div className="relative h-56 bg-gradient-to-br from-[#0A0F1E] to-[#111827] border-b border-white/10 overflow-hidden">
        {/* Neon Accent Lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22D3EE]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22D3EE]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Vehicle Silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Car className="w-32 h-32 text-[#22D3EE]/20 group-hover:text-[#22D3EE]/40 transition-all group-hover:scale-110 duration-500" />
        </div>

        {/* Availability Indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-[#111827]/80 border border-white/10">
          <div className={`w-2 h-2 rounded-full ${available ? 'bg-[#10B981] animate-pulse' : 'bg-[#9CA3AF]'}`} />
          <span className={`text-xs font-medium ${available ? 'text-[#10B981]' : 'text-[#9CA3AF]'}`}>
            {available ? 'Available' : 'Reserved'}
          </span>
        </div>

        {/* Powertrain Badge */}
        <div className="absolute top-4 left-4">
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-md ${config.bg} border border-white/10`}>
            <PowertrainIcon className={`w-3.5 h-3.5 ${config.color}`} />
            <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
          </div>
        </div>

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#22D3EE]/0 to-[#22D3EE]/0 group-hover:from-[#22D3EE]/10 group-hover:to-[#22D3EE]/0 transition-all duration-500" />
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Vehicle Name & Category */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white">{name}</h3>
          </div>
          <p className="text-sm text-[#9CA3AF] uppercase tracking-wider">{category}</p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Seats</span>
            </div>
            <p className="text-sm font-semibold text-white">{specs.seats}</p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Gauge className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Range</span>
            </div>
            <p className="text-sm font-semibold text-white">{specs.range}</p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Settings className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Trans.</span>
            </div>
            <p className="text-sm font-semibold text-white">{specs.transmission}</p>
          </div>
        </div>

        {/* Pricing & Action */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-1">Daily Rate</p>
            <p className="text-2xl font-bold text-white">${dailyRate}</p>
          </div>

          <button
            disabled={!available}
            className={`px-5 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              available
                ? 'bg-gradient-to-r from-[#22D3EE] to-[#10B981] hover:shadow-[0_0_24px_rgba(34,211,238,0.4)] text-white transform hover:scale-105'
                : 'bg-white/5 border border-white/10 text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            <Rocket className="w-4 h-4" />
            Deploy
          </button>
        </div>
      </div>
    </div>
  );
}
