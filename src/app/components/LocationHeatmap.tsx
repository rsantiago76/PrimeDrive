import React from 'react';

interface LocationHeatmapProps {
  locations: Array<{ name: string; available: number; total: number }>;
}

export function LocationHeatmap({ locations }: LocationHeatmapProps) {
  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
      <div className="mb-4">
        <h3 className="text-white font-semibold mb-1">Location Availability</h3>
        <p className="text-[#9CA3AF] text-sm">Real-time fleet distribution</p>
      </div>

      <div className="space-y-3">
        {locations.map((location, index) => {
          const percentage = (location.available / location.total) * 100;
          const isHigh = percentage > 60;
          const isMedium = percentage > 30 && percentage <= 60;
          const isLow = percentage <= 30;

          return (
            <div key={index} className="group hover:bg-white/5 rounded-xl p-3 -m-3 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium">{location.name}</span>
                <span className="text-[#9CA3AF] text-xs">
                  {location.available}/{location.total}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isHigh
                        ? 'bg-gradient-to-r from-[#10B981] to-[#22D3EE]'
                        : isMedium
                        ? 'bg-gradient-to-r from-[#F59E0B] to-[#22D3EE]'
                        : 'bg-gradient-to-r from-[#EF4444] to-[#F59E0B]'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    isHigh ? 'bg-[#10B981]' : isMedium ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'
                  } ${isHigh || isMedium ? 'animate-pulse' : ''}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-[#9CA3AF]">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span className="text-[#9CA3AF]">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="text-[#9CA3AF]">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
}
