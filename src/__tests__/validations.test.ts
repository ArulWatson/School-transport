import { describe, it, expect } from 'vitest';
import { driverSchema } from '@/validations/driver';
import { vehicleSchema } from '@/validations/vehicle';

describe('Driver Validation', () => {
  it('should validate a valid driver', () => {
    const result = driverSchema.safeParse({
      fullName: 'John Doe',
      mobileNumber: '1234567890',
      licenseNumber: 'DL-12345',
      address: '123 Main St',
      status: 'active',
    });
    expect(result.success).toBe(true);
  });

  it('should reject empty full name', () => {
    const result = driverSchema.safeParse({
      fullName: '',
      mobileNumber: '1234567890',
      licenseNumber: 'DL-12345',
      address: '123 Main St',
      status: 'active',
    });
    expect(result.success).toBe(false);
  });

  it('should reject invalid mobile number', () => {
    const result = driverSchema.safeParse({
      fullName: 'John Doe',
      mobileNumber: '123',
      licenseNumber: 'DL-12345',
      address: '123 Main St',
      status: 'active',
    });
    expect(result.success).toBe(false);
  });

  it('should reject invalid status', () => {
    const result = driverSchema.safeParse({
      fullName: 'John Doe',
      mobileNumber: '1234567890',
      licenseNumber: 'DL-12345',
      address: '123 Main St',
      status: 'unknown',
    });
    expect(result.success).toBe(false);
  });
});

describe('Vehicle Validation', () => {
  it('should validate a valid vehicle', () => {
    const result = vehicleSchema.safeParse({
      vehicleNumber: 'KA-01-1234',
      vehicleType: 'bus',
      capacity: 40,
      assignedDriverId: '',
      status: 'active',
    });
    expect(result.success).toBe(true);
  });

  it('should reject empty vehicle number', () => {
    const result = vehicleSchema.safeParse({
      vehicleNumber: '',
      vehicleType: 'bus',
      capacity: 40,
      status: 'active',
    });
    expect(result.success).toBe(false);
  });

  it('should reject invalid vehicle type', () => {
    const result = vehicleSchema.safeParse({
      vehicleNumber: 'KA-01-1234',
      vehicleType: 'truck',
      capacity: 40,
      status: 'active',
    });
    expect(result.success).toBe(false);
  });

  it('should reject zero capacity', () => {
    const result = vehicleSchema.safeParse({
      vehicleNumber: 'KA-01-1234',
      vehicleType: 'bus',
      capacity: 0,
      status: 'active',
    });
    expect(result.success).toBe(false);
  });

  it('should coerce string capacity to number', () => {
    const result = vehicleSchema.safeParse({
      vehicleNumber: 'KA-01-1234',
      vehicleType: 'cab',
      capacity: '4',
      status: 'active',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.capacity).toBe(4);
    }
  });
});
