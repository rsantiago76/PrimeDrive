import React from 'react';
import { Car, Gauge, Users, Zap, ArrowRight } from 'lucide-react';

interface FleetVehicleCardProps {
  name: string;
  category: string;
  image: string;
  specs: {
    range: string;
    seats: string;
    acceleration: string;
    power: string;
  };
  price: string;
  featured?: boolean;
}

export function FleetVehicleCard({ name, category, image, specs, price, featured = false }: FleetVehicleCardProps) {
  return (
    <div
      className={`group backdrop-blur-xl bg-[#111827]/70 border rounded-[16px] p-6 transition-all duration-500 cursor-pointer ${
        featured
          ? 'border-[#22D3EE]/40 shadow-[0_0_40px_rgba(34,211,238,0.25)]'
          : 'border-white/10 hover:border-[#22D3EE]/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]'
      }`}
      style={{
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
      }}
    >
      {/* Category Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] text-xs font-medium uppercase tracking-wider border border-[#22D3EE]/20">
          {category}
        </span>
        {featured && (
          <span className="px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs font-medium uppercase tracking-wider border border-[#10B981]/20">
            Popular
          </span>
        )}
      </div>

      {/* Vehicle Image Placeholder */}
      <div className="relative mb-6 h-40 rounded-xl bg-gradient-to-br from-[#22D3EE]/5 to-[#10B981]/5 border border-white/5 overflow-hidden group-hover:border-[#22D3EE]/20 transition-all">
        <div className="absolute inset-0 flex items-center justify-center">
          <Car className="w-24 h-24 text-[#22D3EE]/20 group-hover:text-[#22D3EE]/40 transition-all group-hover:scale-110 duration-500" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 to-transparent" />
      </div>

      {/* Vehicle Name */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-[#9CA3AF] text-sm">Starting from <span className="text-white font-semibold">{price}</span>/day</p>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center shadow-lg">
            <Gauge className="w-4 h-4 text-[#22D3EE]" />
          </div>
          <div>
            <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Range</p>
            <p className="text-sm font-semibold text-white">{specs.range}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center shadow-lg">
            <Users className="w-4 h-4 text-[#10B981]" />
          </div>
          <div>
            <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Seats</p>
            <p className="text-sm font-semibold text-white">{specs.seats}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center shadow-lg">
            <Zap className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div>
            <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">0-60 mph</p>
            <p className="text-sm font-semibold text-white">{specs.acceleration}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#EF4444]/10 flex items-center justify-center shadow-lg">
            <Zap className="w-4 h-4 text-[#EF4444]" />
          </div>
          <div>
            <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">Power</p>
            <p className="text-sm font-semibold text-white">{specs.power}</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-[#22D3EE] hover:to-[#10B981] border border-white/10 hover:border-transparent text-white font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2">
        View Details
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}