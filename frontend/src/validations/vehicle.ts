import { z } from 'zod';

export const vehicleSchema = z.object({
  vehicleNumber: z
    .string()
    .min(1, 'Vehicle number is required')
    .max(20, 'Vehicle number must be at most 20 characters'),
  vehicleType: z.enum(['bus', 'cab'], {
    errorMap: () => ({ message: 'Vehicle type must be Bus or Cab' }),
  }),
  capacity: z
    .number({ invalid_type_error: 'Capacity must be a number' })
    .int('Capacity must be a whole number')
    .positive('Capacity must be a positive number'),
  status: z.enum(['active', 'inactive', 'maintenance'], {
    errorMap: () => ({ message: 'Status must be active, inactive, or maintenance' }),
  }),
  assignedDriverId: z.string().nullable(),
});

export type VehicleSchemaType = z.infer<typeof vehicleSchema>;
