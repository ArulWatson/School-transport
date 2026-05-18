import { z } from 'zod/v4';

export const driverSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  mobileNumber: z
    .string()
    .min(1, 'Mobile number is required')
    .regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  licenseNumber: z.string().min(1, 'License number is required'),
  address: z.string().min(1, 'Address is required'),
  status: z.enum(['active', 'inactive', 'suspended']),
});

export type DriverSchemaType = z.infer<typeof driverSchema>;
