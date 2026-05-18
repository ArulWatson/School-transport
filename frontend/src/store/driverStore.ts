import { create } from 'zustand';
import type { Driver } from '../types';
import { driverService } from '../services/driverService';
import type { DriverFormData } from '../types';

interface DriverState {
  drivers: Driver[];
  selectedDriver: Driver | null;
  loading: boolean;
  error: string | null;

  fetchDrivers: () => Promise<void>;
  fetchDriver: (id: string) => Promise<void>;
  createDriver: (data: DriverFormData) => Promise<Driver>;
  updateDriver: (id: string, data: DriverFormData) => Promise<Driver>;
  clearError: () => void;
  clearSelectedDriver: () => void;
}

export const useDriverStore = create<DriverState>((set) => ({
  drivers: [],
  selectedDriver: null,
  loading: false,
  error: null,

  fetchDrivers: async () => {
    set({ loading: true, error: null });
    try {
      const drivers = await driverService.getAll();
      set({ drivers, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch drivers',
        loading: false,
      });
    }
  },

  fetchDriver: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const driver = await driverService.getById(id);
      set({ selectedDriver: driver, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to fetch driver',
        loading: false,
      });
    }
  },

  createDriver: async (data: DriverFormData) => {
    set({ loading: true, error: null });
    try {
      const driver = await driverService.create(data);
      set((state) => ({
        drivers: [...state.drivers, driver],
        loading: false,
      }));
      return driver;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to create driver',
        loading: false,
      });
      throw error;
    }
  },

  updateDriver: async (id: string, data: DriverFormData) => {
    set({ loading: true, error: null });
    try {
      const driver = await driverService.update(id, data);
      set((state) => ({
        drivers: state.drivers.map((d) => (d.id === id ? driver : d)),
        selectedDriver: driver,
        loading: false,
      }));
      return driver;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Failed to update driver',
        loading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
  clearSelectedDriver: () => set({ selectedDriver: null }),
}));
