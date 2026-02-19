import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Zap, Battery, Users, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { vehicleData } from '../data/vehicleData';
import { useFeaturedVehicles } from '../contexts/FeaturedVehiclesContext';

export function VehicleShowcase() {
  const navigate = useNavigate();
  const { featuredVehicles } = useFeaturedVehicles();
  const vehicles = Object.values(vehicleData);
  
  // Get featured vehicles based on context
  const displayVehicles = vehicles.filter(v => featuredVehicles.has(v.id));
  
  // Fallback to first 3 vehicles if no featured vehicles
  const finalVehicles = displayVehicles.length > 0 ? displayVehicles : vehicles.slice(0, 3);
  
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const currentVehicle = finalVehicles[currentIndex];

  const nextVehicle = () => {
    setCurrentIndex((prev) => (prev + 1) % finalVehicles.length);
  };

  const prevVehicle = () => {
    setCurrentIndex((prev) => (prev - 1 + finalVehicles.length) % finalVehicles.length);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">Featured Vehicle</h2>
          {finalVehicles.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={prevVehicle}
                className="w-8 h-8 rounded-lg bg-[#111827]/60 border border-white/10 flex items-center justify-center hover:bg-[#111827] hover:border-[#22D3EE]/30 transition-all"
                aria-label="Previous vehicle"
              >
                <ChevronLeft className="w-4 h-4 text-[#22D3EE]" />
              </button>
              <span className="text-sm text-[#9CA3AF] font-mono">
                {currentIndex + 1} / {finalVehicles.length}
              </span>
              <button
                onClick={nextVehicle}
                className="w-8 h-8 rounded-lg bg-[#111827]/60 border border-white/10 flex items-center justify-center hover:bg-[#111827] hover:border-[#22D3EE]/30 transition-all"
                aria-label="Next vehicle"
              >
                <ChevronRight className="w-4 h-4 text-[#22D3EE]" />
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => navigate('/fleet')}
          className="text-sm text-[#22D3EE] hover:text-white transition-colors flex items-center gap-2"
        >
          View All Vehicles
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div
        className="backdrop-blur-xl bg-[#111827]/70 border border-white/10 rounded-[16px] overflow-hidden hover:border-[#22D3EE]/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all duration-500 group cursor-pointer"
        onClick={() => navigate(`/fleet/${currentVehicle.id}`)}
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 100%)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            {currentVehicle.heroImage && (
              <>
                <img
                  src={currentVehicle.heroImage}
                  alt={currentVehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1E] via-transparent to-transparent lg:from-transparent lg:to-[#111827]" />
              </>
            )}
            {/* Status Badge */}
            {currentVehicle.available ? (
              <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/20 backdrop-blur-md border border-[#10B981]/30">
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-sm font-semibold text-[#10B981]">Available Now</span>
              </div>
            ) : (
              <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-[#9CA3AF]/20 backdrop-blur-md border border-[#9CA3AF]/30">
                <div className="w-2 h-2 rounded-full bg-[#9CA3AF]" />
                <span className="text-sm font-semibold text-[#9CA3AF]">Currently Rented</span>
              </div>
            )}

            {/* Featured Badge */}
            {currentVehicle.featured && (
              <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F59E0B]/20 backdrop-blur-md border border-[#F59E0B]/30">
                <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                <span className="text-xs font-semibold text-[#F59E0B]">Featured</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <p className="text-sm font-semibold text-[#22D3EE] uppercase tracking-wider mb-2">
                {currentVehicle.category}
              </p>
              <h3 className="text-4xl font-bold text-white mb-3 group-hover:text-[#22D3EE] transition-colors">
                {currentVehicle.name}
              </h3>
              <p className="text-[#9CA3AF] leading-relaxed mb-6">
                {currentVehicle.description}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Battery className="w-4 h-4 text-[#22D3EE]" />
                  <span className="text-xs font-medium text-[#9CA3AF] uppercase">Range</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {currentVehicle.specs.range.value}
                  <span className="text-sm text-[#9CA3AF] ml-1">{currentVehicle.specs.range.unit}</span>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-[#10B981]" />
                  <span className="text-xs font-medium text-[#9CA3AF] uppercase">0-60</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {currentVehicle.specs.acceleration.value}
                  <span className="text-sm text-[#9CA3AF] ml-1">{currentVehicle.specs.acceleration.unit}</span>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-xs font-medium text-[#9CA3AF] uppercase">Seats</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {currentVehicle.specs.seating.value}
                  <span className="text-sm text-[#9CA3AF] ml-1">{currentVehicle.specs.seating.unit}</span>
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#9CA3AF] mb-1">Starting from</p>
                <p className="text-3xl font-bold text-white">
                  ${currentVehicle.dailyRate}
                  <span className="text-lg text-[#9CA3AF]">/day</span>
                </p>
              </div>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#10B981] text-white font-semibold shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all flex items-center gap-2 group-hover:gap-3">
                View Details
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Indicator Dots */}
      {finalVehicles.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {finalVehicles.map((vehicle, index) => (
            <button
              key={vehicle.id}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-[#22D3EE]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`View ${vehicle.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}