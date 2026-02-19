import React from 'react';
import { Wrench, Rocket, Calendar, XCircle, MoreVertical, ArrowLeft } from 'lucide-react';

interface VehicleControlHeaderProps {
  vehicleName: string;
  fleetId: string;
  status: 'available' | 'rented' | 'maintenance';
  onBack: () => void;
}

export function VehicleControlHeader({ vehicleName, fleetId, status, onBack }: VehicleControlHeaderProps) {
  const statusConfig = {
    available: { bg: 'bg-[#10B981]/10', text: 'text-[#10B981]', dot: 'bg-[#10B981]', label: 'Available' },
    rented: { bg: 'bg-[#22D3EE]/10', text: 'text-[#22D3EE]', dot: 'bg-[#22D3EE]', label: 'Rented' },
    maintenance: { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]', label: 'Maintenance' },
  };

  const config = statusConfig[status];

  return (
    <div className="backdrop-blur-md bg-[#111827]/80 border-b border-white/10 sticky top-20 z-30">
      <div className="px-8 py-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Fleet</span>
        </button>

        <div className="flex items-start justify-between">
          {/* Vehicle Info */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{vehicleName}</h1>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg}`}>
                <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
                <span className={`text-sm font-medium ${config.text}`}>{config.label}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[#9CA3AF] text-sm">Fleet ID:</span>
                <span className="text-white font-mono text-sm">{fleetId}</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-[#9CA3AF] text-sm">Category:</span>
                <span className="text-white text-sm">Intelligent SUV</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-[#9CA3AF] text-sm">Last Updated:</span>
                <span className="text-white text-sm">2 min ago</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Mark as Maintenance
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#10B981] hover:shadow-[0_0_24px_rgba(34,211,238,0.4)] text-white text-sm font-medium transition-all flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Deploy Vehicle
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Service
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444] text-sm font-medium transition-all flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Disable
            </button>
            <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all">
              <MoreVertical className="w-4 h-4 text-[#9CA3AF]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
