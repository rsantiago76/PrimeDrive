import React from 'react';
import { Car } from 'lucide-react';
import { VehicleData } from '../data/vehicleData';
import { AnimatedSpec } from './AnimatedSpec';
import { BookingSidebar } from './BookingSidebar';
import { LocationHeatmap } from './LocationHeatmap';

interface VehicleDetailPageProps {
  vehicle: VehicleData;
}

export function VehicleDetailPage({ vehicle }: VehicleDetailPageProps) {
  const locations = [
    { name: 'Downtown District', available: 8, total: 12 },
    { name: 'Airport Terminal', available: 5, total: 8 },
    { name: 'Central Station', available: 2, total: 6 },
    { name: 'Tech Park Hub', available: 11, total: 15 },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gradient-to-br from-[#0A0F1E] via-[#111827] to-[#0A0F1E] border-b border-white/10 overflow-hidden">
        {/* Vehicle Hero Image */}
        {vehicle.heroImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={vehicle.heroImage}
              alt={vehicle.name}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/50 to-transparent" />
          </div>
        )}

        {/* Fallback Grid Background for vehicles without images */}
        {!vehicle.heroImage && (
          <>
            <div className="absolute inset-0">
              {[...Array(10)].map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22D3EE]/20 to-transparent"
                  style={{ top: `${(i + 1) * 10}%` }}
                />
              ))}
              {[...Array(10)].map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#22D3EE]/20 to-transparent"
                  style={{ left: `${(i + 1) * 10}%` }}
                />
              ))}
            </div>

            {/* Glowing Accents */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#22D3EE]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Vehicle Silhouette */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <Car className="w-64 h-64 text-[#22D3EE]/30 transform hover:scale-110 transition-transform duration-700" />
            </div>
          </>
        )}

        {/* Vehicle Info Overlay */}
        <div className="absolute bottom-8 left-8 z-10">
          <div className="backdrop-blur-xl bg-[#111827]/80 border border-white/10 rounded-[16px] px-6 py-4 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-bold text-white">{vehicle.name}</h1>
              {vehicle.available && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
                  <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  <span className="text-sm font-medium text-[#10B981]">Available Now</span>
                </div>
              )}
            </div>
            <p className="text-[#9CA3AF] mb-2">{vehicle.category}</p>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#9CA3AF]">Fleet ID:</span>
              <span className="font-mono text-[#22D3EE]">{vehicle.fleetId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            {vehicle.galleryImages && vehicle.galleryImages.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Vehicle Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {vehicle.galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-[16px] overflow-hidden border border-white/10 hover:border-[#22D3EE]/50 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] group cursor-pointer"
                    >
                      <img
                        src={image}
                        alt={`${vehicle.name} view ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {/* Image Label */}
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="backdrop-blur-md bg-[#111827]/80 border border-white/10 rounded-lg px-3 py-1.5">
                          <p className="text-sm font-semibold text-white">
                            {vehicle.id === 'prime-astra' && index === 0 && 'Front Interior'}
                            {vehicle.id === 'prime-astra' && index === 1 && 'Rear Seating'}
                            {vehicle.id === 'prime-astra' && index === 2 && 'Rear Exterior'}
                            {vehicle.id === 'prime-astra' && index === 3 && 'Cargo Space'}
                            {vehicle.id === 'neon-rover' && index === 0 && 'Rear Cabin'}
                            {vehicle.id === 'neon-rover' && index === 1 && 'Rear Exterior'}
                            {vehicle.id === 'neon-rover' && index === 2 && 'Dashboard View'}
                            {vehicle.id === 'neon-rover' && index === 3 && 'Cargo Area'}
                            {vehicle.id === 'cargox' && index === 0 && 'Full-Width Display'}
                            {vehicle.id === 'cargox' && index === 1 && 'Cargo Bay'}
                            {vehicle.id === 'terra-hauler' && index === 0 && 'Rear Seats'}
                            {vehicle.id === 'terra-hauler' && index === 1 && 'Command Center'}
                            {vehicle.id === 'terra-hauler' && index === 2 && 'Cabin Interior'}
                            {vehicle.id === 'terra-hauler' && index === 3 && 'LED Truck Bed'}
                            {vehicle.id !== 'prime-astra' && vehicle.id !== 'neon-rover' && vehicle.id !== 'cargox' && vehicle.id !== 'terra-hauler' && `View ${index + 1}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Animated Specs */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Performance Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatedSpec
                  label={vehicle.specs.range.value > '300' ? 'Extended Range' : 'Range'}
                  value={vehicle.specs.range.value}
                  unit={vehicle.specs.range.unit}
                  icon={vehicle.specs.range.icon}
                  delay={0}
                />
                <AnimatedSpec
                  label="0-60 mph"
                  value={vehicle.specs.acceleration.value}
                  unit={vehicle.specs.acceleration.unit}
                  icon={vehicle.specs.acceleration.icon}
                  delay={200}
                />
                <AnimatedSpec
                  label="Seating Capacity"
                  value={vehicle.specs.seating.value}
                  unit={vehicle.specs.seating.unit}
                  icon={vehicle.specs.seating.icon}
                  delay={400}
                />
              </div>
            </div>

            {/* Description */}
            <div className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
              <h2 className="text-2xl font-bold text-white mb-4">About {vehicle.name}</h2>
              <p className="text-[#9CA3AF] leading-relaxed mb-6">{vehicle.description}</p>
              <div className="space-y-2">
                {vehicle.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                    <span className="text-white">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Intelligent Features</h2>
              <div className="space-y-6">
                {vehicle.features.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {category.items.map((feature, featureIndex) => (
                        <div key={featureIndex} className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#22D3EE]/30 transition-all">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#22D3EE]/20 transition-colors">
                              <div className="text-[#22D3EE]">{feature.icon}</div>
                            </div>
                            <div>
                              <h4 className="text-white font-medium text-sm mb-1">{feature.label}</h4>
                              <p className="text-[#9CA3AF] text-xs">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Heatmap */}
            <LocationHeatmap locations={locations} />
          </div>

          {/* Right Column - Booking Sidebar */}
          <div>
            <BookingSidebar
              vehicleName={vehicle.name}
              dailyRate={vehicle.dailyRate}
              available={vehicle.available}
              fleetId={vehicle.fleetId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}