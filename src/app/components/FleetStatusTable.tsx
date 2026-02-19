import React from 'react';
import { MoreVertical } from 'lucide-react';

interface FleetStatusData {
  vehicleName: string;
  fleetId: string;
  status: 'available' | 'rented' | 'maintenance' | 'overdue';
  location: string;
  nextReturn: string;
}

const fleetData: FleetStatusData[] = [
  { vehicleName: 'Prime Astra', fleetId: 'PD-AST-2847', status: 'rented', location: 'Downtown District', nextReturn: '2026-02-20' },
  { vehicleName: 'Neon Rover', fleetId: 'PD-ROV-2891', status: 'available', location: 'Airport Terminal', nextReturn: '—' },
  { vehicleName: 'Terra Hauler', fleetId: 'PD-TRK-2903', status: 'maintenance', location: 'Central Station', nextReturn: '2026-02-22' },
  { vehicleName: 'CargoX', fleetId: 'PD-VAN-2756', status: 'rented', location: 'Tech Park Hub', nextReturn: '2026-02-19' },
  { vehicleName: 'Prime Astra Sport', fleetId: 'PD-AST-2849', status: 'available', location: 'Marina Bay', nextReturn: '—' },
  { vehicleName: 'Neon Rover Max', fleetId: 'PD-ROV-2892', status: 'overdue', location: 'Suburban Center', nextReturn: '2026-02-18' },
  { vehicleName: 'Terra Hauler Pro', fleetId: 'PD-TRK-2904', status: 'rented', location: 'Downtown District', nextReturn: '2026-02-21' },
  { vehicleName: 'CargoX Extended', fleetId: 'PD-VAN-2757', status: 'maintenance', location: 'Airport Terminal', nextReturn: '2026-02-23' },
];

export function FleetStatusTable() {
  const getStatusConfig = (status: FleetStatusData['status']) => {
    switch (status) {
      case 'available':
        return { bg: 'bg-[#10B981]/10', text: 'text-[#10B981]', dot: 'bg-[#10B981]', label: 'Available' };
      case 'rented':
        return { bg: 'bg-[#22D3EE]/10', text: 'text-[#22D3EE]', dot: 'bg-[#22D3EE]', label: 'Rented' };
      case 'maintenance':
        return { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]', label: 'Maintenance' };
      case 'overdue':
        return { bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', dot: 'bg-[#EF4444]', label: 'Overdue' };
    }
  };

  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">Live Fleet Status</h3>
            <p className="text-[#9CA3AF] text-sm">Real-time vehicle monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs text-[#9CA3AF]">Live</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="text-left py-4 px-6 text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">
                Vehicle Name
              </th>
              <th className="text-left py-4 px-6 text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">
                Fleet ID
              </th>
              <th className="text-left py-4 px-6 text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">
                Status
              </th>
              <th className="text-left py-4 px-6 text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">
                Location
              </th>
              <th className="text-left py-4 px-6 text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">
                Next Return
              </th>
              <th className="text-left py-4 px-6 text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {fleetData.map((vehicle, index) => {
              const statusConfig = getStatusConfig(vehicle.status);
              
              return (
                <tr 
                  key={index} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <span className="text-white font-medium text-sm">{vehicle.vehicleName}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[#9CA3AF] font-mono text-sm">{vehicle.fleetId}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bg}`}>
                      <div className={`w-2 h-2 rounded-full ${statusConfig.dot} ${vehicle.status === 'available' ? 'animate-pulse' : ''}`} />
                      <span className={`text-xs font-medium ${statusConfig.text}`}>{statusConfig.label}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[#9CA3AF] text-sm">{vehicle.location}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-sm ${vehicle.status === 'overdue' ? 'text-[#EF4444] font-semibold' : 'text-white'}`}>
                      {vehicle.nextReturn}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <MoreVertical className="w-4 h-4 text-[#9CA3AF]" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-sm text-[#9CA3AF]">
          Showing <span className="text-white font-semibold">{fleetData.length}</span> of <span className="text-white font-semibold">847</span> vehicles
        </span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white text-sm transition-all">
            Previous
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-[#22D3EE]/20 border border-[#22D3EE]/50 text-[#22D3EE] text-sm">
            1
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white text-sm transition-all">
            2
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white text-sm transition-all">
            3
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#9CA3AF] hover:text-white text-sm transition-all">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
