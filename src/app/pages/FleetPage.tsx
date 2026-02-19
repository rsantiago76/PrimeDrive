import React from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/button';
import { SearchInput } from '../components/ui/SearchInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Toggle } from '../components/ui/toggle';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Plus, MapPin, Battery, Zap, Users, ArrowRight, Star } from 'lucide-react';
import { vehicleData } from '../data/vehicleData';
import { useFeaturedVehicles } from '../contexts/FeaturedVehiclesContext';

interface FilterSelectProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function FilterSelect({ placeholder, value, onChange, options }: FilterSelectProps) {
  return (
    <Select value={value || "ALL"} onValueChange={(val) => onChange(val === "ALL" ? "" : val)}>
      <SelectTrigger className="w-full bg-[#111827]/60 border-white/10 text-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value || "ALL"} value={option.value || "ALL"}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function FleetPage() {
  const navigate = useNavigate();
  const { featuredVehicles, toggleFeatured } = useFeaturedVehicles();
  const [search, setSearch] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [availableOnly, setAvailableOnly] = React.useState(false);

  const vehicles = Object.values(vehicleData);

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (search && !vehicle.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter && vehicle.category !== typeFilter) return false;
    if (statusFilter === 'available' && !vehicle.available) return false;
    if (statusFilter === 'unavailable' && vehicle.available) return false;
    if (availableOnly && !vehicle.available) return false;
    return true;
  });

  const handleToggleFeatured = (vehicleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFeatured(vehicleId);
  };

  return (
    <>
      <PageHeader
        title="Fleet Management"
        subtitle="Browse and manage all vehicles in your autonomous fleet"
        action={
          <Button variant="default" size="default">
            <Plus className="mr-2 h-4 w-4" />
            Add Vehicle
          </Button>
        }
      />

      {/* Filters */}
      <div className="mb-6 backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <SearchInput
            placeholder="Search vehicles..."
            value={search}
            onChange={setSearch}
          />
          <FilterSelect
            placeholder="All Types"
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: '', label: 'All Types' },
              { value: 'Executive Sedan', label: 'Executive Sedan' },
              { value: 'Performance Sedan', label: 'Performance Sedan' },
              { value: 'Compact City Car', label: 'Compact City Car' },
              { value: 'Luxury Sedan', label: 'Luxury Sedan' },
              { value: 'Intelligent SUV', label: 'Intelligent SUV' },
              { value: 'Premium SUV', label: 'Premium SUV' },
              { value: 'Heavy-Duty Truck', label: 'Heavy-Duty Truck' },
              { value: 'Commercial Truck', label: 'Commercial Truck' },
              { value: 'Commercial Cargo Van', label: 'Commercial Cargo Van' },
              { value: 'Large Cargo Van', label: 'Large Cargo Van' },
              { value: 'Compact Cargo Van', label: 'Compact Cargo Van' },
              { value: 'Passenger Van', label: 'Passenger Van' },
            ]}
          />
          <FilterSelect
            placeholder="All Statuses"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'available', label: 'Available' },
              { value: 'unavailable', label: 'Unavailable' },
            ]}
          />
          <div className="flex items-center">
            <Toggle
              pressed={availableOnly}
              onPressedChange={setAvailableOnly}
              aria-label="Toggle available only"
              className="gap-2 data-[state=on]:bg-[#22D3EE]/20 data-[state=on]:text-[#22D3EE] border border-white/10 hover:bg-white/5"
            >
              Available Only
            </Toggle>
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => navigate(`/fleet/${vehicle.id}`)}
            className="group backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] overflow-hidden hover:border-[#22D3EE]/50 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] cursor-pointer"
          >
            {/* Vehicle Image */}
            <div className="relative h-64 bg-gradient-to-br from-[#0A0F1E] to-[#111827] overflow-hidden">
              {vehicle.heroImage ? (
                <>
                  <img
                    src={vehicle.heroImage}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/50 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[#22D3EE]/30 w-32 h-32">
                    <Zap className="w-full h-full" />
                  </div>
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                {vehicle.available ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 backdrop-blur-md border border-[#10B981]/30">
                    <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <span className="text-sm font-medium text-[#10B981]">Available</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#9CA3AF]/10 backdrop-blur-md border border-[#9CA3AF]/30">
                    <div className="w-2 h-2 rounded-full bg-[#9CA3AF]" />
                    <span className="text-sm font-medium text-[#9CA3AF]">Unavailable</span>
                  </div>
                )}
              </div>

              {/* Fleet ID */}
              <div className="absolute bottom-4 left-4 z-10">
                <div className="backdrop-blur-md bg-[#111827]/80 border border-white/10 rounded-lg px-3 py-1.5">
                  <span className="text-xs text-[#9CA3AF]">Fleet ID: </span>
                  <span className="text-sm font-mono text-[#22D3EE]">{vehicle.fleetId}</span>
                </div>
              </div>

              {/* Featured Star */}
              <div className="absolute top-4 left-4 z-10">
                <button
                  className={`backdrop-blur-md bg-[#111827]/80 border rounded-lg px-3 py-1.5 transition-all hover:scale-110 ${featuredVehicles.has(vehicle.id)
                    ? 'border-[#FFD700]/50 hover:border-[#FFD700]'
                    : 'border-white/10 hover:border-white/30'
                    }`}
                  onClick={(e) => handleToggleFeatured(vehicle.id, e)}
                  title={featuredVehicles.has(vehicle.id) ? 'Remove from featured' : 'Add to featured'}
                >
                  <Star
                    className={`w-4 h-4 transition-all ${featuredVehicles.has(vehicle.id)
                      ? 'text-[#FFD700] fill-[#FFD700]'
                      : 'text-[#9CA3AF]'
                      }`}
                  />
                </button>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">{vehicle.name}</h3>
                <p className="text-sm text-[#9CA3AF]">{vehicle.category}</p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                    <Battery className="w-4 h-4 text-[#22D3EE]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Range</p>
                    <p className="text-sm font-semibold text-white">{vehicle.specs.range.value} {vehicle.specs.range.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#22D3EE]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">0-60</p>
                    <p className="text-sm font-semibold text-white">{vehicle.specs.acceleration.value} {vehicle.specs.acceleration.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#22D3EE]/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#22D3EE]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Seats</p>
                    <p className="text-sm font-semibold text-white">{vehicle.specs.seating.value}</p>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#9CA3AF] mb-1">Daily Rate</p>
                  <p className="text-2xl font-bold text-white">
                    ${vehicle.dailyRate}
                    <span className="text-sm text-[#9CA3AF] font-normal">/day</span>
                  </p>
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-[#22D3EE] hover:bg-[#22D3EE]/20 transition-colors group"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/fleet/${vehicle.id}`);
                  }}
                >
                  <span className="text-sm font-medium">View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Results Count */}
      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#9CA3AF]">No vehicles found matching your filters.</p>
        </div>
      )}

      {filteredVehicles.length > 0 && (
        <div className="mt-6 text-center text-sm text-[#9CA3AF]">
          Showing <span className="text-white font-semibold">{filteredVehicles.length}</span> of{' '}
          <span className="text-white font-semibold">{vehicles.length}</span> vehicles
        </div>
      )}
    </>
  );
}