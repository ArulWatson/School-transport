export type VehicleType = 'bus' | 'cab';
export type VehicleStatus = 'active' | 'inactive' | 'maintenance';

export interface Vehicle {
  id: string;
  vehicleNumber: string;
  vehicleType: VehicleType;
  capacity: number;
  status: VehicleStatus;
  assignedDriverId: string | null;
  assignedDriver?: {
    id: string;
    fullName: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleFormData {
  vehicleNumber: string;
  vehicleType: VehicleType;
  capacity: number;
  status: VehicleStatus;
  assignedDriverId: string | null;
}
