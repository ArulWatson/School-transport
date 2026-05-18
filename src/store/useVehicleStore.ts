import { create } from 'zustand';
import type { Vehicle } from '@/types';
import { vehiclesApi } from '@/api/vehicles';

interface VehicleState {
  vehicles: Vehicle[];
  currentVehicle: Vehicle | null;
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  fetchVehicle: (id: string) => Promise<void>;
  createVehicle: (data: Parameters<typeof vehiclesApi.create>[0]) => Promise<Vehicle>;
  updateVehicle: (id: string, data: Parameters<typeof vehiclesApi.update>[1]) => Promise<Vehicle>;
}

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicles: [],
  currentVehicle: null,
  loading: false,
  error: null,

  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const vehicles = await vehiclesApi.getAll();
      set({ vehicles, loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch vehicles';
      set({ error: message, loading: false });
    }
  },

  fetchVehicle: async (id) => {
    set({ loading: true, error: null });
    try {
      const vehicle = await vehiclesApi.getById(id);
      set({ currentVehicle: vehicle, loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch vehicle';
      set({ error: message, loading: false });
    }
  },

  createVehicle: async (data) => {
    set({ loading: true, error: null });
    try {
      const vehicle = await vehiclesApi.create(data);
      set((state) => ({ vehicles: [vehicle, ...state.vehicles], loading: false }));
      return vehicle;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create vehicle';
      set({ error: message, loading: false });
      throw err;
    }
  },

  updateVehicle: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const vehicle = await vehiclesApi.update(id, data);
      set((state) => ({
        vehicles: state.vehicles.map((v) => (v.id === id ? vehicle : v)),
        currentVehicle: vehicle,
        loading: false,
      }));
      return vehicle;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update vehicle';
      set({ error: message, loading: false });
      throw err;
    }
  },
}));
