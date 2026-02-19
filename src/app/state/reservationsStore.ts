import { create } from 'zustand';

export interface Reservation {
  id: string;
  fleetId: string;
  vehicleName: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupISO: string;
  returnISO: string;
  dailyRate: number;
  estTotal: number;
  createdAtISO: string;
  status: 'active' | 'completed' | 'cancelled';
}

interface ReservationsStore {
  reservations: Reservation[];
  addReservation: (r: Omit<Reservation, 'id' | 'createdAtISO' | 'status'>) => Reservation;
  cancelReservation: (id: string) => void;
  completeReservation: (id: string) => void;
  getById: (id: string) => Reservation | undefined;
}

export const useReservations = create<ReservationsStore>((set, get) => ({
  reservations: [],
  
  addReservation: (data) => {
    const newReservation: Reservation = {
      ...data,
      id: `RES-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAtISO: new Date().toISOString(),
      status: 'active',
    };
    
    set(state => ({
      reservations: [...state.reservations, newReservation],
    }));
    
    return newReservation;
  },
  
  cancelReservation: (id: string) => {
    set(state => ({
      reservations: state.reservations.map(r =>
        r.id === id ? { ...r, status: 'cancelled' as const } : r
      ),
    }));
  },
  
  completeReservation: (id: string) => {
    set(state => ({
      reservations: state.reservations.map(r =>
        r.id === id ? { ...r, status: 'completed' as const } : r
      ),
    }));
  },
  
  getById: (id: string) => {
    return get().reservations.find(r => r.id === id);
  },
}));
