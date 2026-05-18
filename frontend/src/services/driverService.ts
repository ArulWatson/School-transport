import apiClient from '../api/axios';
import type { Driver, DriverFormData } from '../types';

export const driverService = {
  getAll: async (): Promise<Driver[]> => {
    const response = await apiClient.get('/drivers');
    return response.data.data ?? response.data;
  },

  getById: async (id: string): Promise<Driver> => {
    const response = await apiClient.get(`/drivers/${id}`);
    return response.data.data ?? response.data;
  },

  create: async (data: DriverFormData): Promise<Driver> => {
    const response = await apiClient.post('/drivers', data);
    return response.data.data ?? response.data;
  },

  update: async (id: string, data: DriverFormData): Promise<Driver> => {
    const response = await apiClient.put(`/drivers/${id}`, data);
    return response.data.data ?? response.data;
  },
};
