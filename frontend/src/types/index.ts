export type { Driver, DriverFormData, DriverStatus } from './driver';
export type { Vehicle, VehicleFormData, VehicleType, VehicleStatus } from './vehicle';

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiListResponse<T> {
  data: T[];
  total: number;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
