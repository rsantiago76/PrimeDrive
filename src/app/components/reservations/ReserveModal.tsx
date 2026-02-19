import { useMemo, useState } from "react";
import { useFleet } from "../../state/fleetStore";
import { useReservations } from "../../state/reservationsStore";

const LOCATION_OPTIONS = [
  'Prime-Drive HQ - San Francisco',
  'Prime-Drive Marina District',
  'Prime-Drive Silicon Valley',
  'Prime-Drive Oakland Airport',
  'Prime-Drive Downtown LA',
  'Prime-Drive Seattle Center',
];

function parseLocalDateTime(input: string) {
  // input is "YYYY-MM-DDTHH:mm" from <input type="datetime-local">
  // Browser interprets it in local time. Convert to ISO safely:
  const dt = new Date(input);
  return dt;
}

function diffDays(start: Date, end: Date) {
  const ms = end.getTime() - start.getTime();
  return Math.max(0, ms / (1000 * 60 * 60 * 24));
}

export default function ReserveModal({
  open,
  onClose,
  fleetId,
}: {
  open: boolean;
  onClose: () => void;
  fleetId: string | null;
}) {
  const { getById, setStatus } = useFleet();
  const { addReservation } = useReservations();

  const vehicle = useMemo(() => (fleetId ? getById(fleetId) : undefined), [fleetId, getById]);

  // basic pricing table by model (tweak freely)
  const dailyRate = useMemo(() => {
    if (!vehicle) return 0;
    switch (vehicle.name) {
      case "Prime Astra": return 95;
      case "Neon Rover": return 135;
      case "Terra Hauler": return 160;
      case "CargoX": return 145;
      case "Velocity Sport": return 180;
      default: return 120;
    }
  }, [vehicle]);

  const [pickupLocation, setPickupLocation] = useState("Prime-Drive HQ - San Francisco");
  const [dropoffLocation, setDropoffLocation] = useState("Prime-Drive HQ - San Francisco");
  const [pickupDT, setPickupDT] = useState("");
  const [returnDT, setReturnDT] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const estimate = useMemo(() => {
    if (!pickupDT || !returnDT) return { days: 0, total: 0 };
    const start = parseLocalDateTime(pickupDT);
    const end = parseLocalDateTime(returnDT);
    const days = diffDays(start, end);
    const billedDays = Math.max(1, Math.ceil(days)); // minimum 1 day
    return { days: billedDays, total: billedDays * dailyRate };
  }, [pickupDT, returnDT, dailyRate]);

  if (!open) return null;

  const canReserve = !!vehicle && vehicle.status !== "Maintenance";

  const confirm = () => {
    setError(null);
    setSuccessId(null);

    if (!vehicle) return;

    if (!canReserve) {
      setError("This vehicle cannot be reserved while in Maintenance.");
      return;
    }

    if (!pickupDT || !returnDT) {
      setError("Select pickup and return date/time.");
      return;
    }

    if (!pickupLocation || !dropoffLocation) {
      setError("Select pickup and dropoff locations.");
      return;
    }

    const start = parseLocalDateTime(pickupDT);
    const end = parseLocalDateTime(returnDT);
    if (!(end.getTime() > start.getTime())) {
      setError("Return date/time must be after pickup date/time.");
      return;
    }

    // create reservation
    const created = addReservation({
      fleetId: vehicle.fleetId,
      vehicleName: vehicle.name,
      pickupLocation,
      dropoffLocation,
      pickupISO: start.toISOString(),
      returnISO: end.toISOString(),
      dailyRate,
      estTotal: estimate.total,
    });

    // update fleet status
    setStatus(vehicle.fleetId, "Rented");

    setSuccessId(created.id);
  };

  const handleReset = () => {
    setPickupDT("");
    setReturnDT("");
    setPickupLocation("Prime-Drive HQ - San Francisco");
    setDropoffLocation("Prime-Drive HQ - San Francisco");
    setError(null);
    setSuccessId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />

      {/* modal */}
      <div className="relative w-full max-w-xl rounded-2xl border border-[#22D3EE]/20 bg-[#0A0F1E]/95 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="text-xs text-[#22D3EE] uppercase tracking-wide">Prime-Drive Reservation</div>
            <div className="mt-1 text-xl font-bold text-white">
              Reserve {vehicle?.name ?? "Vehicle"}
            </div>
            <div className="mt-1 text-sm text-[#9CA3AF]">
              {vehicle?.fleetId} • Status: <span className="text-white">{vehicle?.status ?? "—"}</span>
            </div>
          </div>

          <button
            className="rounded-lg border border-[#22D3EE]/20 bg-[#111827] px-3 py-2 text-xs text-white hover:bg-[#22D3EE]/10 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="grid gap-4">
          {/* Pickup Location */}
          <label className="grid gap-2">
            <span className="text-sm text-[#9CA3AF]">Pickup Location</span>
            <select
              className="rounded-xl border border-[#22D3EE]/20 bg-[#111827] px-4 py-3 text-sm text-white outline-none focus:border-[#22D3EE] focus:ring-2 focus:ring-[#22D3EE]/30 transition-all"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              {LOCATION_OPTIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </label>

          {/* Dropoff Location */}
          <label className="grid gap-2">
            <span className="text-sm text-[#9CA3AF]">Dropoff Location</span>
            <select
              className="rounded-xl border border-[#22D3EE]/20 bg-[#111827] px-4 py-3 text-sm text-white outline-none focus:border-[#22D3EE] focus:ring-2 focus:ring-[#22D3EE]/30 transition-all"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
            >
              {LOCATION_OPTIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm text-[#9CA3AF]">Pickup Date/Time</span>
              <input
                type="datetime-local"
                className="rounded-xl border border-[#22D3EE]/20 bg-[#111827] px-4 py-3 text-sm text-white outline-none focus:border-[#22D3EE] focus:ring-2 focus:ring-[#22D3EE]/30 transition-all"
                value={pickupDT}
                onChange={(e) => setPickupDT(e.target.value)}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-[#9CA3AF]">Return Date/Time</span>
              <input
                type="datetime-local"
                className="rounded-xl border border-[#22D3EE]/20 bg-[#111827] px-4 py-3 text-sm text-white outline-none focus:border-[#22D3EE] focus:ring-2 focus:ring-[#22D3EE]/30 transition-all"
                value={returnDT}
                min={pickupDT}
                onChange={(e) => setReturnDT(e.target.value)}
              />
            </label>
          </div>

          {/* Pricing Summary */}
          <div className="rounded-xl border border-[#22D3EE]/20 bg-[#111827] p-4">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-[#9CA3AF]">Estimated days</span>
              <span className="text-white font-medium">{estimate.days || "—"}</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-[#9CA3AF]">Daily rate</span>
              <span className="text-white font-medium">${dailyRate.toFixed(0)}</span>
            </div>
            <div className="pt-3 border-t border-[#22D3EE]/20 flex items-center justify-between">
              <span className="text-[#9CA3AF]">Estimated total</span>
              <span className="text-2xl font-bold text-[#22D3EE]">${estimate.total.toFixed(0)}</span>
            </div>
          </div>

          {/* Location Note */}
          {pickupLocation !== dropoffLocation && (
            <div className="rounded-xl border border-[#10B981]/20 bg-[#10B981]/10 p-3 text-sm text-[#10B981]">
              ✓ One-way rental: Different pickup and dropoff locations
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Success */}
          {successId && (
            <div className="rounded-xl border border-[#10B981]/30 bg-[#10B981]/10 p-4 text-sm text-[#10B981]">
              <div className="font-semibold mb-1">✓ Reservation created successfully!</div>
              <div className="text-xs font-mono">{successId}</div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-2 flex gap-3">
            <button
              className="flex-1 rounded-xl border border-[#22D3EE]/20 bg-[#111827] px-4 py-3 text-sm font-medium text-white hover:bg-[#22D3EE]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={confirm}
              disabled={!vehicle || !canReserve}
            >
              Confirm Reservation
            </button>
            <button
              className="rounded-xl border border-[#22D3EE]/20 bg-[#111827] px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>

          {!canReserve && vehicle && (
            <div className="text-xs text-[#9CA3AF] text-center">
              Note: Reservations are disabled while a vehicle is in Maintenance.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
