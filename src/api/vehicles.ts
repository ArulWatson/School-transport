import apiClient from './client';
import type { Vehicle, VehicleFormData } from '@/types';

export const vehiclesApi = {
  getAll: () => apiClient.get<Vehicle[]>('/vehicles').then((r) => r.data),
  getById: (id: string) => apiClient.get<Vehicle>(`/vehicles/${id}`).then((r) => r.data),
  create: (data: VehicleFormData) => apiClient.post<Vehicle>('/vehicles', data).then((r) => r.data),
  update: (id: string, data: VehicleFormData) =>
    apiClient.put<Vehicle>(`/vehicles/${id}`, data).then((r) => r.data),
};
