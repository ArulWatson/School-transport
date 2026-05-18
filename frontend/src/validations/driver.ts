import { z } from 'zod';

export const driverSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be at most 100 characters'),
  mobileNumber: z
    .string()
    .min(1, 'Mobile number is required')
    .regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  licenseNumber: z
    .string()
    .min(1, 'License number is required')
    .max(50, 'License number must be at most 50 characters'),
  address: z
    .string()
    .min(1, 'Address is required')
    .max(255, 'Address must be at most 255 characters'),
  status: z.enum(['active', 'inactive', 'suspended'], {
    errorMap: () => ({ message: 'Status must be active, inactive, or suspended' }),
  }),
});

export type DriverSchemaType = z.infer<typeof driverSchema>;
