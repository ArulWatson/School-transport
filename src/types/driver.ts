export type DriverStatus = 'active' | 'inactive' | 'suspended';

export interface Driver {
  id: string;
  fullName: string;
  mobileNumber: string;
  licenseNumber: string;
  address: string;
  status: DriverStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DriverFormData {
  fullName: string;
  mobileNumber: string;
  licenseNumber: string;
  address: string;
  status: DriverStatus;
}
