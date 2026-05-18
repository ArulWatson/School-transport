import apiClient from '../api/axios';
import type { Vehicle, VehicleFormData } from '../types';

export const vehicleService = {
  getAll: async (): Promise<Vehicle[]> => {
    const response = await apiClient.get('/vehicles');
    return response.data.data ?? response.data;
  },

  getById: async (id: string): Promise<Vehicle> => {
    const response = await apiClient.get(`/vehicles/${id}`);
    return response.data.data ?? response.data;
  },

  create: async (data: VehicleFormData): Promise<Vehicle> => {
    const response = await apiClient.post('/vehicles', data);
    return response.data.data ?? response.data;
  },

  update: async (id: string, data: VehicleFormData): Promise<Vehicle> => {
    const response = await apiClient.put(`/vehicles/${id}`, data);
    return response.data.data ?? response.data;
  },
};
