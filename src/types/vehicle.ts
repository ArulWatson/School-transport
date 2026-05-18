import type { Driver } from './driver';

export type VehicleType = 'bus' | 'cab';
export type VehicleStatus = 'active' | 'inactive' | 'maintenance';

export interface Vehicle {
  id: string;
  vehicleNumber: string;
  vehicleType: VehicleType;
  capacity: number;
  assignedDriverId: string | null;
  assignedDriver: Pick<Driver, 'id' | 'fullName' | 'status'> | null;
  status: VehicleStatus;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleFormData {
  vehicleNumber: string;
  vehicleType: VehicleType;
  capacity: number;
  assignedDriverId: string;
  status: VehicleStatus;
}
