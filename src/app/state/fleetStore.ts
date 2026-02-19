import { create } from 'zustand';

export type FleetStatus = 'Available' | 'Rented' | 'Maintenance' | 'In Transit';

export interface FleetVehicle {
  fleetId: string;
  name: string;
  model: string;
  status: FleetStatus;
  location: string;
  battery: number;
  range: number;
  lastMaintenance: string;
  totalTrips: number;
  rating: number;
}

interface FleetStore {
  vehicles: FleetVehicle[];
  getById: (id: string) => FleetVehicle | undefined;
  setStatus: (id: string, status: FleetStatus) => void;
  updateVehicle: (id: string, updates: Partial<FleetVehicle>) => void;
}

// Sample fleet data
const initialFleetData: FleetVehicle[] = [
  {
    fleetId: 'PD-2024-001',
    name: 'Prime Astra',
    model: 'Astra Sedan',
    status: 'Available',
    location: 'Prime-Drive HQ - San Francisco',
    battery: 95,
    range: 320,
    lastMaintenance: '2024-01-15',
    totalTrips: 156,
    rating: 4.8,
  },
  {
    fleetId: 'PD-2024-002',
    name: 'Neon Rover',
    model: 'Rover SUV',
    status: 'Available',
    location: 'Prime-Drive Marina District',
    battery: 88,
    range: 380,
    lastMaintenance: '2024-01-20',
    totalTrips: 203,
    rating: 4.9,
  },
  {
    fleetId: 'PD-2024-003',
    name: 'Terra Hauler',
    model: 'Hauler Truck',
    status: 'Rented',
    location: 'Prime-Drive Silicon Valley',
    battery: 72,
    range: 280,
    lastMaintenance: '2024-01-10',
    totalTrips: 89,
    rating: 4.7,
  },
  {
    fleetId: 'PD-2024-004',
    name: 'CargoX',
    model: 'CargoX Van',
    status: 'Available',
    location: 'Prime-Drive Oakland Airport',
    battery: 91,
    range: 310,
    lastMaintenance: '2024-01-18',
    totalTrips: 134,
    rating: 4.6,
  },
  {
    fleetId: 'PD-2024-005',
    name: 'Velocity Sport',
    model: 'Sport Coupe',
    status: 'Maintenance',
    location: 'Prime-Drive HQ - San Francisco',
    battery: 45,
    range: 150,
    lastMaintenance: '2024-01-22',
    totalTrips: 67,
    rating: 4.9,
  },
];

export const useFleet = create<FleetStore>((set, get) => ({
  vehicles: initialFleetData,
  
  getById: (id: string) => {
    return get().vehicles.find(v => v.fleetId === id);
  },
  
  setStatus: (id: string, status: FleetStatus) => {
    set(state => ({
      vehicles: state.vehicles.map(v =>
        v.fleetId === id ? { ...v, status } : v
      ),
    }));
  },
  
  updateVehicle: (id: string, updates: Partial<FleetVehicle>) => {
    set(state => ({
      vehicles: state.vehicles.map(v =>
        v.fleetId === id ? { ...v, ...updates } : v
      ),
    }));
  },
}));
