import { z } from 'zod/v4';

export const vehicleSchema = z.object({
  vehicleNumber: z.string().min(1, 'Vehicle number is required'),
  vehicleType: z.enum(['bus', 'cab']),
  capacity: z.coerce.number().int('Capacity must be an integer').min(1, 'Capacity must be at least 1'),
  assignedDriverId: z.string().optional().default(''),
  status: z.enum(['active', 'inactive', 'maintenance']),
});

export type VehicleSchemaType = z.infer<typeof vehicleSchema>;
