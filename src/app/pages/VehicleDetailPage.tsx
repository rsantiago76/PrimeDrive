import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { PageHeader } from '../components/layout/PageHeader';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { VehicleControlHeader } from '../components/VehicleControlHeader';
import { VehicleStatusOverview } from '../components/VehicleStatusOverview';
import { VehicleLocationMap } from '../components/VehicleLocationMap';
import { RentalHistoryTimeline } from '../components/RentalHistoryTimeline';
import { MaintenanceLogs } from '../components/MaintenanceLogs';
import { DiagnosticsSummary } from '../components/DiagnosticsSummary';
import { BookingModal } from '../components/booking/BookingModal';
import { Button } from '../components/ui/Button';
import { Calendar } from 'lucide-react';
import { vehicleData } from '../data/vehicleData';

export function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Get the vehicle data based on the ID from the route
  const vehicle = id ? vehicleData[id] : null;

  // If vehicle not found, show error or redirect
  if (!vehicle) {
    return (
      <>
        <Breadcrumbs
          items={[
            { label: 'Fleet', onClick: () => navigate('/fleet') },
            { label: 'Vehicle Not Found' },
          ]}
        />
        <div className="mt-8 backdrop-blur-md bg-[#111827]/60 border border-white/10 rounded-[16px] p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Vehicle Not Found</h2>
          <p className="text-[#9CA3AF] mb-6">The vehicle you're looking for doesn't exist in our fleet.</p>
          <button
            onClick={() => navigate('/fleet')}
            className="px-6 py-3 bg-[#22D3EE]/10 border border-[#22D3EE]/30 rounded-lg text-[#22D3EE] hover:bg-[#22D3EE]/20 transition-colors"
          >
            Back to Fleet
          </button>
        </div>
      </>
    );
  }

  // Determine status based on availability
  const status = vehicle.available ? 'available' : 'rented';

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Fleet', onClick: () => navigate('/fleet') },
          { label: vehicle.name },
        ]}
      />

      <VehicleControlHeader
        vehicleName={vehicle.name}
        fleetId={vehicle.fleetId}
        status={status}
        onBack={() => navigate('/fleet')}
      />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column - Status & Location */}
        <div className="lg:col-span-2 space-y-8">
          {/* Current Status */}
          <VehicleStatusOverview />

          {/* Location Map */}
          <VehicleLocationMap />

          {/* Rental History */}
          <RentalHistoryTimeline />
        </div>

        {/* Right Column - Diagnostics & Maintenance */}
        <div className="space-y-8">
          {/* Diagnostics */}
          <DiagnosticsSummary />

          {/* Maintenance Logs */}
          <MaintenanceLogs />
        </div>
      </div>

      {/* Booking Button */}
      {status === 'available' && (
        <div className="mt-8 text-center">
          <Button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-6 py-3 bg-[#22D3EE]/10 border border-[#22D3EE]/30 rounded-lg text-[#22D3EE] hover:bg-[#22D3EE]/20 transition-colors"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Now
          </Button>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        vehicleId={vehicle.id}
        vehicleName={vehicle.name}
        fleetId={vehicle.fleetId}
        dailyRate={vehicle.dailyRate}
      />
    </>
  );
}