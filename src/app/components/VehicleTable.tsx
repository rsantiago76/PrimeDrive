import React from 'react';
import { StatusBadge } from './StatusBadge';
import { GlassCard } from './GlassCard';

interface Vehicle {
  id: string;
  model: string;
  location: string;
  battery: number;
  range: number;
  status: 'active' | 'maintenance' | 'critical' | 'idle';
  lastUpdate: string;
}

const mockVehicles: Vehicle[] = [
  { id: 'FLT-2847', model: 'Model S Plaid', location: 'San Francisco, CA', battery: 87, range: 348, status: 'active', lastUpdate: '2 min ago' },
  { id: 'FLT-2891', model: 'Cybertruck', location: 'Austin, TX', battery: 42, range: 168, status: 'active', lastUpdate: '5 min ago' },
  { id: 'FLT-2903', model: 'Model 3 LR', location: 'Seattle, WA', battery: 95, range: 310, status: 'active', lastUpdate: '1 min ago' },
  { id: 'FLT-2756', model: 'Model X', location: 'Los Angeles, CA', battery: 23, range: 69, status: 'critical', lastUpdate: '15 min ago' },
  { id: 'FLT-2812', model: 'Model Y', location: 'Portland, OR', battery: 0, range: 0, status: 'maintenance', lastUpdate: '3 hr ago' },
  { id: 'FLT-2634', model: 'Model 3 SR+', location: 'Denver, CO', battery: 100, range: 263, status: 'idle', lastUpdate: '45 min ago' },
  { id: 'FLT-2945', model: 'Model S LR', location: 'Phoenix, AZ', battery: 78, range: 312, status: 'active', lastUpdate: '8 min ago' },
  { id: 'FLT-2701', model: 'Cybertruck', location: 'Las Vegas, NV', battery: 15, range: 60, status: 'critical', lastUpdate: '22 min ago' },
];

export function VehicleTable() {
  return (
    <GlassCard className="overflow-hidden">
      <div className="mb-4">
        <h3 className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">Fleet Overview</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-3 text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">Vehicle ID</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">Model</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">Location</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">Battery</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">Range</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">Status</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {mockVehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-b border-border/30 hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-3">
                  <span className="text-white font-medium text-sm">{vehicle.id}</span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-white text-sm">{vehicle.model}</span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-[#9CA3AF] text-sm">{vehicle.location}</span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          vehicle.battery > 60
                            ? 'bg-[#10B981]'
                            : vehicle.battery > 30
                            ? 'bg-[#F59E0B]'
                            : 'bg-[#EF4444]'
                        }`}
                        style={{ width: `${vehicle.battery}%` }}
                      />
                    </div>
                    <span className="text-white text-sm font-medium">{vehicle.battery}%</span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className="text-white text-sm">{vehicle.range} mi</span>
                </td>
                <td className="py-3 px-3">
                  <StatusBadge status={vehicle.status} label={vehicle.status} />
                </td>
                <td className="py-3 px-3">
                  <span className="text-[#9CA3AF] text-sm">{vehicle.lastUpdate}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
