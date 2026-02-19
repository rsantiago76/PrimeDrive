import React from 'react';

interface ReservationFormProps {
  className?: string;
}

export function ReservationForm({ className = '' }: ReservationFormProps) {
  return (
    <div className={`backdrop-blur-md bg-[#111827]/70 border border-white/10 rounded-[16px] p-6 shadow-[0_0_40px_rgba(34,211,238,0.1)] ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Pickup Location */}
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-2">
            Pickup Location
          </label>
          <input
            type="text"
            placeholder="Enter city or address"
            className="w-full px-4 py-3 rounded-xl bg-[#0A0F1E]/60 border border-white/10 text-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#22D3EE]/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all"
          />
        </div>

        {/* Pickup Date & Time */}
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-2">
            Pickup Date & Time
          </label>
          <input
            type="datetime-local"
            className="w-full px-4 py-3 rounded-xl bg-[#0A0F1E]/60 border border-white/10 text-white focus:outline-none focus:border-[#22D3EE]/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all"
          />
        </div>

        {/* Return Date & Time */}
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-2">
            Return Date & Time
          </label>
          <input
            type="datetime-local"
            className="w-full px-4 py-3 rounded-xl bg-[#0A0F1E]/60 border border-white/10 text-white focus:outline-none focus:border-[#22D3EE]/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Vehicle Type */}
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-2">
            Vehicle Type
          </label>
          <select className="w-full px-4 py-3 rounded-xl bg-[#0A0F1E]/60 border border-white/10 text-white focus:outline-none focus:border-[#22D3EE]/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all appearance-none cursor-pointer">
            <option>All Vehicles</option>
            <option>Sedan</option>
            <option>SUV</option>
            <option>Truck</option>
            <option>Cargo Van</option>
          </select>
        </div>

        {/* Advanced Options */}
        <div className="flex items-end">
          <button className="w-full px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#9CA3AF] hover:text-white transition-all text-sm font-medium">
            Advanced Filters
          </button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button className="px-6 py-4 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#10B981] hover:shadow-[0_0_32px_rgba(34,211,238,0.4)] text-white font-semibold transition-all transform hover:scale-[1.02]">
          Reserve a Vehicle
        </button>
        <button className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#22D3EE]/50 text-white font-semibold transition-all">
          Enterprise Solutions
        </button>
      </div>
    </div>
  );
}
