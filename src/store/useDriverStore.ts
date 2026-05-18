import { create } from 'zustand';
import type { Driver } from '@/types';
import { driversApi } from '@/api/drivers';

interface DriverState {
  drivers: Driver[];
  currentDriver: Driver | null;
  loading: boolean;
  error: string | null;
  fetchDrivers: () => Promise<void>;
  fetchDriver: (id: string) => Promise<void>;
  createDriver: (data: Parameters<typeof driversApi.create>[0]) => Promise<Driver>;
  updateDriver: (id: string, data: Parameters<typeof driversApi.update>[1]) => Promise<Driver>;
}

export const useDriverStore = create<DriverState>((set) => ({
  drivers: [],
  currentDriver: null,
  loading: false,
  error: null,

  fetchDrivers: async () => {
    set({ loading: true, error: null });
    try {
      const drivers = await driversApi.getAll();
      set({ drivers, loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch drivers';
      set({ error: message, loading: false });
    }
  },

  fetchDriver: async (id) => {
    set({ loading: true, error: null });
    try {
      const driver = await driversApi.getById(id);
      set({ currentDriver: driver, loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch driver';
      set({ error: message, loading: false });
    }
  },

  createDriver: async (data) => {
    set({ loading: true, error: null });
    try {
      const driver = await driversApi.create(data);
      set((state) => ({ drivers: [driver, ...state.drivers], loading: false }));
      return driver;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create driver';
      set({ error: message, loading: false });
      throw err;
    }
  },

  updateDriver: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const driver = await driversApi.update(id, data);
      set((state) => ({
        drivers: state.drivers.map((d) => (d.id === id ? driver : d)),
        currentDriver: driver,
        loading: false,
      }));
      return driver;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update driver';
      set({ error: message, loading: false });
      throw err;
    }
  },
}));
