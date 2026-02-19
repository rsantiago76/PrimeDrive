import React from 'react';

interface LocationData {
  name: string;
  utilization: number;
}

const locations: LocationData[] = [
  { name: 'Downtown District', utilization: 87 },
  { name: 'Airport Terminal', utilization: 92 },
  { name: 'Central Station', utilization: 64 },
  { name: 'Tech Park Hub', utilization: 78 },
  { name: 'Marina Bay', utilization: 55 },
  { name: 'Suburban Center', utilization: 41 },
];

export function LocationHeatmapWidget() {
  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return { bg: 'bg-[#10B981]/20', text: 'text-[#10B981]', bar: 'bg-[#10B981]' };
    if (utilization >= 60) return { bg: 'bg-[#22D3EE]/20', text: 'text-[#22D3EE]', bar: 'bg-[#22D3EE]' };
    if (utilization >= 40) return { bg: 'bg-[#F59E0B]/20', text: 'text-[#F59E0B]', bar: 'bg-[#F59E0B]' };
    return { bg: 'bg-[#EF4444]/20', text: 'text-[#EF4444]', bar: 'bg-[#EF4444]' };
  };

  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
      <div className="mb-6">
        <h3 className="text-white font-semibold text-lg mb-1">Location Utilization</h3>
        <p className="text-[#9CA3AF] text-sm">Fleet distribution across locations</p>
      </div>

      <div className="space-y-4">
        {locations.map((location, index) => {
          const colors = getUtilizationColor(location.utilization);
          
          return (
            <div key={index} className="group hover:bg-white/5 rounded-xl p-3 -m-3 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium">{location.name}</span>
                <div className={`px-2 py-1 rounded-full ${colors.bg}`}>
                  <span className={`text-xs font-semibold ${colors.text}`}>{location.utilization}%</span>
                </div>
              </div>
              
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${colors.bar} transition-all duration-500`}
                  style={{ width: `${location.utilization}%` }}
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
            <span className="text-[#9CA3AF]">High (80%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22D3EE]" />
            <span className="text-[#9CA3AF]">Good (60-79%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span className="text-[#9CA3AF]">Medium (40-59%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="text-[#9CA3AF]">Low (&lt;40%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
