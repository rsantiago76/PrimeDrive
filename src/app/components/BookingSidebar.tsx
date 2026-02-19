import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CreditCard, Shield, CheckCircle2 } from 'lucide-react';

interface BookingSidebarProps {
  vehicleName: string;
  dailyRate: number;
  available: boolean;
  fleetId: string;
}

export function BookingSidebar({ vehicleName, dailyRate, available, fleetId }: BookingSidebarProps) {
  const [days, setDays] = useState(3);
  const [insurance, setInsurance] = useState(false);
  const [fastTrack, setFastTrack] = useState(false);

  const subtotal = dailyRate * days;
  const insuranceFee = insurance ? 15 * days : 0;
  const fastTrackFee = fastTrack ? 25 : 0;
  const serviceFee = 12;
  const total = subtotal + insuranceFee + fastTrackFee + serviceFee;

  return (
    <div className="sticky top-24 backdrop-blur-md bg-[#111827]/80 border border-white/10 rounded-[16px] p-6 shadow-[0_0_32px_rgba(34,211,238,0.1)]">
      {/* Header */}
      <div className="mb-6 pb-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{vehicleName}</h3>
          {available && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/10">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-medium text-[#10B981]">Available</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
          <span>Fleet ID:</span>
          <span className="font-mono text-white">{fleetId}</span>
        </div>
      </div>

      {/* Date Selection */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-2">
            Pickup Date & Time
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="datetime-local"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#22D3EE]/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-2">
            Return Date & Time
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="datetime-local"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#22D3EE]/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-2">
            Pickup Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <select className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#22D3EE]/50 appearance-none cursor-pointer">
              <option>Downtown District</option>
              <option>Airport Terminal</option>
              <option>Central Station</option>
              <option>Tech Park Hub</option>
            </select>
          </div>
        </div>
      </div>

      {/* Duration Slider */}
      <div className="mb-6 pb-6 border-b border-white/10">
        <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-3">
          Rental Duration: {days} {days === 1 ? 'Day' : 'Days'}
        </label>
        <input
          type="range"
          min="1"
          max="30"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #22D3EE 0%, #22D3EE ${(days / 30) * 100}%, rgba(255,255,255,0.1) ${(days / 30) * 100}%, rgba(255,255,255,0.1) 100%)`,
          }}
        />
      </div>

      {/* Add-ons */}
      <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
        <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-3">
          Add-ons
        </label>

        <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-[#22D3EE]" />
            <div>
              <p className="text-white text-sm font-medium">Premium Insurance</p>
              <p className="text-[#9CA3AF] text-xs">$15/day</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={insurance}
            onChange={(e) => setInsurance(e.target.checked)}
            className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#22D3EE] focus:ring-[#22D3EE]"
          />
        </label>

        <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <div>
              <p className="text-white text-sm font-medium">Fast-Track Deployment</p>
              <p className="text-[#9CA3AF] text-xs">$25 one-time</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={fastTrack}
            onChange={(e) => setFastTrack(e.target.checked)}
            className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#22D3EE] focus:ring-[#22D3EE]"
          />
        </label>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#9CA3AF]">${dailyRate} × {days} days</span>
          <span className="text-white font-medium">${subtotal}</span>
        </div>
        {insurance && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#9CA3AF]">Insurance</span>
            <span className="text-white font-medium">${insuranceFee}</span>
          </div>
        )}
        {fastTrack && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#9CA3AF]">Fast-Track</span>
            <span className="text-white font-medium">${fastTrackFee}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#9CA3AF]">Service Fee</span>
          <span className="text-white font-medium">${serviceFee}</span>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-white font-semibold">Total</span>
          <span className="text-2xl font-bold text-white">${total}</span>
        </div>
      </div>

      {/* Deploy Button */}
      <button
        disabled={!available}
        className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
          available
            ? 'bg-gradient-to-r from-[#22D3EE] to-[#10B981] hover:shadow-[0_0_32px_rgba(34,211,238,0.4)] text-white transform hover:scale-[1.02]'
            : 'bg-white/5 border border-white/10 text-[#9CA3AF] cursor-not-allowed'
        }`}
      >
        <CreditCard className="w-5 h-5" />
        Deploy Prime Astra
      </button>

      {available && (
        <p className="text-center text-[#9CA3AF] text-xs mt-3">
          No payment required now. Pay on pickup.
        </p>
      )}
    </div>
  );
}
