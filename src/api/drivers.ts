import apiClient from './client';
import type { Driver, DriverFormData } from '@/types';

export const driversApi = {
  getAll: () => apiClient.get<Driver[]>('/drivers').then((r) => r.data),
  getById: (id: string) => apiClient.get<Driver>(`/drivers/${id}`).then((r) => r.data),
  create: (data: DriverFormData) => apiClient.post<Driver>('/drivers', data).then((r) => r.data),
  update: (id: string, data: DriverFormData) =>
    apiClient.put<Driver>(`/drivers/${id}`, data).then((r) => r.data),
};
