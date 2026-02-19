import React, { createContext, useContext, useMemo, useState } from "react";

export type Reservation = {
  id: string;
  fleetId: string;
  vehicleName: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupISO: string;  // ISO strings so they're easy to store
  returnISO: string;
  dailyRate: number;
  estTotal: number;
  createdAtISO: string;
};

type Ctx = {
  reservations: Reservation[];
  addReservation: (r: Omit<Reservation, "id" | "createdAtISO">) => Reservation;
  cancelReservation: (id: string) => void;
};

const ReservationsContext = createContext<Ctx | null>(null);

function uid() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

export function ReservationsProvider({ children }: { children: React.ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const addReservation: Ctx["addReservation"] = (r) => {
    const created: Reservation = {
      ...r,
      id: `RSV-${uid()}`,
      createdAtISO: new Date().toISOString(),
    };
    setReservations((prev) => [created, ...prev]);
    return created;
  };

  const cancelReservation = (id: string) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const value = useMemo(() => ({ reservations, addReservation, cancelReservation }), [reservations]);
  return (
    <ReservationsContext.Provider value={value}>
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  const ctx = useContext(ReservationsContext);
  if (!ctx) throw new Error("useReservations must be used inside ReservationsProvider");
  return ctx;
}