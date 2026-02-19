import React, { useState } from 'react';
import { Car, Zap, Fuel, Gauge, SlidersHorizontal, X } from 'lucide-react';

interface FilterBarProps {
  onFilterChange?: (filters: any) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPowertrain, setSelectedPowertrain] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [availableNow, setAvailableNow] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const vehicleTypes = [
    { id: 'sedan', label: 'Sedan', icon: Car },
    { id: 'suv', label: 'SUV', icon: Car },
    { id: 'truck', label: 'Truck', icon: Car },
    { id: 'van', label: 'Van', icon: Car },
  ];

  const powertrains = [
    { id: 'electric', label: 'Electric', icon: Zap },
    { id: 'hybrid', label: 'Hybrid', icon: Gauge },
    { id: 'gas', label: 'Gas', icon: Fuel },
  ];

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const togglePowertrain = (powertrain: string) => {
    setSelectedPowertrain(prev =>
      prev.includes(powertrain) ? prev.filter(p => p !== powertrain) : [...prev, powertrain]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedPowertrain([]);
    setPriceRange([0, 300]);
    setAvailableNow(false);
  };

  const activeFiltersCount = selectedTypes.length + selectedPowertrain.length + (availableNow ? 1 : 0);

  return (
    <div className="backdrop-blur-md bg-[#111827]/80 border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        {/* Main Filter Row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-white">
            <SlidersHorizontal className="w-5 h-5 text-[#22D3EE]" />
            <span className="font-semibold">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#22D3EE]/20 text-[#22D3EE] text-xs font-medium">
                {activeFiltersCount}
              </span>
            )}
          </div>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="ml-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all"
          >
            {showAdvanced ? 'Simple View' : 'Advanced Filters'}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#EF4444]/10 border border-white/10 hover:border-[#EF4444]/30 text-[#9CA3AF] hover:text-[#EF4444] text-sm font-medium transition-all flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Filter Options */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Vehicle Type */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-3">
              Vehicle Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {vehicleTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleType(type.id)}
                  className={`px-3 py-2.5 rounded-xl border transition-all flex items-center gap-2 justify-center ${
                    selectedTypes.includes(type.id)
                      ? 'bg-[#22D3EE]/10 border-[#22D3EE]/50 text-[#22D3EE] shadow-[0_0_16px_rgba(34,211,238,0.15)]'
                      : 'bg-white/5 border-white/10 text-[#9CA3AF] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Powertrain */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-3">
              Powertrain
            </label>
            <div className="space-y-2">
              {powertrains.map((powertrain) => (
                <button
                  key={powertrain.id}
                  onClick={() => togglePowertrain(powertrain.id)}
                  className={`w-full px-3 py-2.5 rounded-xl border transition-all flex items-center gap-2 ${
                    selectedPowertrain.includes(powertrain.id)
                      ? 'bg-[#10B981]/10 border-[#10B981]/50 text-[#10B981] shadow-[0_0_16px_rgba(16,185,129,0.15)]'
                      : 'bg-white/5 border-white/10 text-[#9CA3AF] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <powertrain.icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{powertrain.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-3">
              Daily Rate
            </label>
            <div className="px-3 py-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-semibold text-sm">${priceRange[0]}</span>
                <span className="text-[#9CA3AF] text-xs">to</span>
                <span className="text-white font-semibold text-sm">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#22D3EE]"
                style={{
                  background: `linear-gradient(to right, #22D3EE 0%, #22D3EE ${(priceRange[1] / 300) * 100}%, rgba(255,255,255,0.1) ${(priceRange[1] / 300) * 100}%, rgba(255,255,255,0.1) 100%)`,
                }}
              />
            </div>
          </div>

          {/* Available Now Toggle */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-3">
              Availability
            </label>
            <button
              onClick={() => setAvailableNow(!availableNow)}
              className={`w-full px-4 py-6 rounded-xl border transition-all ${
                availableNow
                  ? 'bg-[#10B981]/10 border-[#10B981]/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-semibold ${availableNow ? 'text-[#10B981]' : 'text-white'}`}>
                  Available Now
                </span>
                {availableNow && (
                  <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                )}
              </div>
              <div
                className={`w-12 h-6 rounded-full transition-all relative ${
                  availableNow ? 'bg-[#10B981]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                    availableNow ? 'left-[26px]' : 'left-0.5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-2">
                  Minimum Range
                </label>
                <input
                  type="number"
                  placeholder="Miles"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#22D3EE]/50"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-2">
                  Minimum Seats
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#22D3EE]/50 cursor-pointer">
                  <option>Any</option>
                  <option>2+</option>
                  <option>4+</option>
                  <option>5+</option>
                  <option>7+</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#9CA3AF] font-medium mb-2">
                  Transmission
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#22D3EE]/50 cursor-pointer">
                  <option>Any</option>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
