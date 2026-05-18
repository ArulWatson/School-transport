import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { vehicleSchema, type VehicleSchemaType } from '@/validations/vehicle';
import { useDriverStore } from '@/store/useDriverStore';
import type { VehicleFormData } from '@/types';

interface VehicleFormProps {
  defaultValues?: VehicleFormData;
  onSubmit: (data: VehicleFormData) => Promise<void>;
  submitLabel: string;
  loading?: boolean;
}

export function VehicleForm({ defaultValues, onSubmit, submitLabel, loading }: VehicleFormProps) {
  const { drivers, fetchDrivers } = useDriverStore();

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const activeDrivers = drivers.filter((d) => d.status === 'active');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleSchemaType>({
    resolver: standardSchemaResolver(vehicleSchema),
    defaultValues: defaultValues || {
      vehicleNumber: '',
      vehicleType: 'bus',
      capacity: 1,
      assignedDriverId: '',
      status: 'active',
    },
  });

  const handleFormSubmit = async (data: VehicleSchemaType) => {
    await onSubmit(data as VehicleFormData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
        <input
          {...register('vehicleNumber')}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter vehicle number"
        />
        {errors.vehicleNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicleNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
        <select
          {...register('vehicleType')}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="bus">Bus</option>
          <option value="cab">Cab</option>
        </select>
        {errors.vehicleType && (
          <p className="mt-1 text-sm text-red-600">{errors.vehicleType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Capacity</label>
        <input
          type="number"
          {...register('capacity')}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter capacity"
          min={1}
        />
        {errors.capacity && (
          <p className="mt-1 text-sm text-red-600">{errors.capacity.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Assigned Driver</label>
        <select
          {...register('assignedDriverId')}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">No driver assigned</option>
          {activeDrivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.fullName} ({driver.licenseNumber})
            </option>
          ))}
        </select>
        {errors.assignedDriverId && (
          <p className="mt-1 text-sm text-red-600">{errors.assignedDriverId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          {...register('status')}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
