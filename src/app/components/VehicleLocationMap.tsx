import React from 'react';
import { MapPin, Navigation, Wifi, Activity } from 'lucide-react';

export function VehicleLocationMap() {
  return (
    <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">Current Location</h3>
            <p className="text-[#9CA3AF] text-sm">Real-time GPS tracking</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs text-[#9CA3AF]">Live</span>
          </div>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="relative h-[400px] bg-gradient-to-br from-[#0A0F1E] to-[#111827] p-6">
        {/* Grid Overlay */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-[#22D3EE]/10"
              style={{ top: `${(i + 1) * 12.5}%` }}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-[#22D3EE]/10"
              style={{ left: `${(i + 1) * 12.5}%` }}
            />
          ))}
        </div>

        {/* Vehicle Position */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="relative">
            {/* Pulsing Circle */}
            <div className="absolute inset-0 -m-8">
              <div className="w-24 h-24 rounded-full border-2 border-[#22D3EE]/30 animate-ping" />
            </div>
            <div className="absolute inset-0 -m-12">
              <div className="w-32 h-32 rounded-full border border-[#22D3EE]/20 animate-pulse" />
            </div>
            
            {/* Vehicle Marker */}
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#10B981] flex items-center justify-center shadow-[0_0_32px_rgba(34,211,238,0.5)]">
              <Navigation className="w-4 h-4 text-white transform rotate-45" />
            </div>

            {/* Info Popup */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 backdrop-blur-md bg-[#111827]/90 border border-[#22D3EE]/30 rounded-xl px-4 py-3 whitespace-nowrap shadow-[0_0_24px_rgba(34,211,238,0.2)]">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-3 h-3 text-[#22D3EE]" />
                <span className="text-white text-sm font-semibold">Tech Park Hub</span>
              </div>
              <p className="text-[#9CA3AF] text-xs">37.7749° N, 122.4194° W</p>
            </div>
          </div>
        </div>

        {/* Route Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 50 350 Q 150 300, 250 250 T 450 150"
            stroke="#22D3EE"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Location Details */}
      <div className="p-6 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-xl bg-white/5">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Navigation className="w-4 h-4 text-[#22D3EE]" />
              <span className="text-xs text-[#9CA3AF]">Speed</span>
            </div>
            <p className="text-white font-semibold">34 mph</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs text-[#9CA3AF]">Status</span>
            </div>
            <p className="text-white font-semibold">In Transit</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Wifi className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-xs text-[#9CA3AF]">Signal</span>
            </div>
            <p className="text-white font-semibold">Excellent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
