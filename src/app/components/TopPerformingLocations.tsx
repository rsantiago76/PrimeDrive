import React from 'react';
import { TrendingUp, MapPin, DollarSign, Car } from 'lucide-react';

interface LocationPerformance {
  name: string;
  revenue: number;
  rentals: number;
  utilization: number;
  vehicles: number;
  growth: number;
}

const locations: LocationPerformance[] = [
  {
    name: 'Airport Terminal',
    revenue: 124800,
    rentals: 1248,
    utilization: 92,
    vehicles: 85,
    growth: 18.4,
  },
  {
    name: 'Downtown District',
    revenue: 108600,
    rentals: 1086,
    utilization: 87,
    vehicles: 124,
    growth: 12.7,
  },
  {
    name: 'Tech Park Hub',
    revenue: 96400,
    rentals: 964,
    utilization: 84,
    vehicles: 98,
    growth: 15.2,
  },
  {
    name: 'Central Station',
    revenue: 87200,
    rentals: 872,
    utilization: 78,
    vehicles: 112,
    growth: 8.9,
  },
  {
    name: 'Marina Bay',
    revenue: 72400,
    rentals: 724,
    utilization: 71,
    vehicles: 89,
    growth: 6.3,
  },
];

export function TopPerformingLocations() {
  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">Top Performing Locations</h3>
            <p className="text-[#9CA3AF] text-sm">Revenue and utilization by location</p>
          </div>
          <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#9CA3AF] hover:text-white text-xs transition-all flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            View Map
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {locations.map((location, index) => {
          const isTop = index === 0;
          const utilizationColor = 
            location.utilization >= 85 ? '#10B981' : 
            location.utilization >= 70 ? '#22D3EE' : 
            '#F59E0B';

          return (
            <div
              key={index}
              className={`backdrop-blur-md bg-white/5 border rounded-xl p-4 hover:bg-white/10 transition-all group ${
                isTop ? 'border-[#22D3EE]/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-white/10'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  {/* Rank Badge */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isTop 
                      ? 'bg-gradient-to-br from-[#22D3EE]/30 to-[#10B981]/30 border border-[#22D3EE]/50' 
                      : 'bg-white/5 border border-white/10'
                  }`}>
                    <span className={`font-bold text-sm ${isTop ? 'text-[#22D3EE]' : 'text-[#9CA3AF]'}`}>
                      #{index + 1}
                    </span>
                  </div>

                  {/* Location Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-white font-semibold">{location.name}</h4>
                      {isTop && (
                        <span className="px-2 py-0.5 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] text-xs font-medium">
                          Top Performer
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {/* Revenue */}
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <DollarSign className="w-3 h-3 text-[#9CA3AF]" />
                          <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Revenue</span>
                        </div>
                        <p className="text-white font-semibold">${(location.revenue / 1000).toFixed(1)}k</p>
                      </div>

                      {/* Rentals */}
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Car className="w-3 h-3 text-[#9CA3AF]" />
                          <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Rentals</span>
                        </div>
                        <p className="text-white font-semibold">{location.rentals}</p>
                      </div>

                      {/* Utilization */}
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <TrendingUp className="w-3 h-3 text-[#9CA3AF]" />
                          <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Utilization</span>
                        </div>
                        <p className="text-white font-semibold">{location.utilization}%</p>
                      </div>

                      {/* Vehicles */}
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <MapPin className="w-3 h-3 text-[#9CA3AF]" />
                          <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Vehicles</span>
                        </div>
                        <p className="text-white font-semibold">{location.vehicles}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Growth Indicator */}
                <div className="text-right ml-4">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${
                    location.growth >= 10 
                      ? 'bg-[#10B981]/10 text-[#10B981]' 
                      : 'bg-[#22D3EE]/10 text-[#22D3EE]'
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-medium">+{location.growth}%</span>
                  </div>
                </div>
              </div>

              {/* Utilization Bar */}
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${location.utilization}%`,
                    backgroundColor: utilizationColor,
                    boxShadow: `0 0 8px ${utilizationColor}40`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
        <div className="text-center p-3 rounded-xl bg-white/5">
          <p className="text-[#9CA3AF] text-xs mb-1">Total Locations</p>
          <p className="text-white font-bold text-xl">24</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-white/5">
          <p className="text-[#9CA3AF] text-xs mb-1">Avg. Revenue</p>
          <p className="text-white font-bold text-xl">$98k</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-white/5">
          <p className="text-[#9CA3AF] text-xs mb-1">Avg. Utilization</p>
          <p className="text-white font-bold text-xl">82%</p>
        </div>
      </div>
    </div>
  );
}
