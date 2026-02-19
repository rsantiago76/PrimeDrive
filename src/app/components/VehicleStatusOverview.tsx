import React from 'react';
import { Battery, Users, Gauge, Zap, DollarSign, Calendar } from 'lucide-react';

interface VehicleStatusOverview {
  batteryLevel: number;
  range: string;
  odometer: string;
  lastService: string;
  totalRentals: number;
  totalRevenue: string;
  utilizationRate: number;
  currentCustomer?: string;
}

const vehicleStatus: VehicleStatusOverview = {
  batteryLevel: 87,
  range: '334 mi',
  odometer: '24,847 mi',
  lastService: 'Feb 1, 2026',
  totalRentals: 142,
  totalRevenue: '$42,380',
  utilizationRate: 87,
  currentCustomer: 'Sarah Johnson',
};

export function VehicleStatusOverview() {
  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
      <div className="mb-6">
        <h3 className="text-white font-semibold text-lg mb-1">Current Status</h3>
        <p className="text-[#9CA3AF] text-sm">Live vehicle metrics and performance data</p>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Battery */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-[#22D3EE]/10 border border-[#10B981]/30">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center">
              <Battery className="w-6 h-6 text-[#10B981]" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] font-medium">
              Excellent
            </span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{vehicleStatus.batteryLevel}%</p>
          <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-3">Battery Level</p>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#10B981] to-[#22D3EE] rounded-full"
              style={{ width: `${vehicleStatus.batteryLevel}%` }}
            />
          </div>
        </div>

        {/* Range */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center">
              <Gauge className="w-6 h-6 text-[#22D3EE]" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{vehicleStatus.range}</p>
          <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Estimated Range</p>
        </div>

        {/* Utilization */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#F59E0B]" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{vehicleStatus.utilizationRate}%</p>
          <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Utilization Rate</p>
        </div>
      </div>

      {/* Current Rental Info */}
      {vehicleStatus.currentCustomer && (
        <div className="mb-6 p-4 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#10B981] flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Currently Rented</p>
                <p className="text-[#9CA3AF] text-xs">{vehicleStatus.currentCustomer}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-sm font-semibold">Returns in 3 days</p>
              <p className="text-[#9CA3AF] text-xs">Feb 19, 2026</p>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#9CA3AF]/10 flex items-center justify-center">
              <Gauge className="w-4 h-4 text-[#9CA3AF]" />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Odometer</span>
          </div>
          <p className="text-xl font-bold text-white">{vehicleStatus.odometer}</p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#9CA3AF]/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-[#9CA3AF]" />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Last Service</span>
          </div>
          <p className="text-xl font-bold text-white">{vehicleStatus.lastService}</p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-[#22D3EE]" />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Total Rentals</span>
          </div>
          <p className="text-xl font-bold text-white">{vehicleStatus.totalRentals}</p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-[#10B981]" />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Total Revenue</span>
          </div>
          <p className="text-xl font-bold text-white">{vehicleStatus.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
}
