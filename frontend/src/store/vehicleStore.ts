import { create } from 'zustand';
import type { Vehicle, VehicleFormData } from '../types';
import { vehicleService } from '../services/vehicleService';

interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  loading: boolean;
  error: string | null;

  fetchVehicles: () => Promise<void>;
  fetchVehicle: (id: string) => Promise<void>;
  createVehicle: (data: VehicleFormData) => Promise<Vehicle>;
  updateVehicle: (id: string, data: VehicleFormData) => Promise<Vehicle>;
  clearError: () => void;
  clearSelectedVehicle: () => void;
}

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,

  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const vehicles = await vehicleService.getAll();
      set({ vehicles, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch vehicles',
        loading: false,
      });
    }
  },

  fetchVehicle: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const vehicle = await vehicleService.getById(id);
      set({ selectedVehicle: vehicle, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch vehicle',
        loading: false,
      });
    }
  },

  createVehicle: async (data: VehicleFormData) => {
    set({ loading: true, error: null });
    try {
      const vehicle = await vehicleService.create(data);
      set((state) => ({
        vehicles: [...state.vehicles, vehicle],
        loading: false,
      }));
      return vehicle;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to create vehicle',
        loading: false,
      });
      throw error;
    }
  },

  updateVehicle: async (id: string, data: VehicleFormData) => {
    set({ loading: true, error: null });
    try {
      const vehicle = await vehicleService.update(id, data);
      set((state) => ({
        vehicles: state.vehicles.map((v) => (v.id === id ? vehicle : v)),
        selectedVehicle: vehicle,
        loading: false,
      }));
      return vehicle;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update vehicle',
        loading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  clearSelectedVehicle: () => set({ selectedVehicle: null }),
}));
