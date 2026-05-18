import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vehicleSchema, type VehicleSchemaType } from '../../validations/vehicle';
import type { VehicleFormData, Driver } from '../../types';
import { useDriverStore } from '../../store/driverStore';

interface VehicleFormProps {
  defaultValues?: VehicleFormData;
  onSubmit: (data: VehicleFormData) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
}

export default function VehicleForm({ defaultValues, onSubmit, isSubmitting, submitLabel }: VehicleFormProps) {
  const { drivers, fetchDrivers } = useDriverStore();

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const activeDrivers = drivers.filter((d: Driver) => d.status === 'active');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleSchemaType>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: defaultValues || {
      vehicleNumber: '',
      vehicleType: 'bus',
      capacity: 0,
      status: 'active',
      assignedDriverId: null,
    },
  });

  const processSubmit = (data: VehicleSchemaType) => {
    return onSubmit({
      ...data,
      assignedDriverId: data.assignedDriverId || null,
    });
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-6 max-w-lg">
      <div>
        <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700">
          Vehicle Number <span className="text-red-500">*</span>
        </label>
        <input
          id="vehicleNumber"
          type="text"
          {...register('vehicleNumber')}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${
            errors.vehicleNumber ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
        {errors.vehicleNumber && <p className="mt-1 text-sm text-red-600">{errors.vehicleNumber.message}</p>}
      </div>

      <div>
        <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">
          Vehicle Type <span className="text-red-500">*</span>
        </label>
        <select
          id="vehicleType"
          {...register('vehicleType')}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${
            errors.vehicleType ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
        >
          <option value="bus">Bus</option>
          <option value="cab">Cab</option>
        </select>
        {errors.vehicleType && <p className="mt-1 text-sm text-red-600">{errors.vehicleType.message}</p>}
      </div>

      <div>
        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
          Capacity <span className="text-red-500">*</span>
        </label>
        <input
          id="capacity"
          type="number"
          {...register('capacity', { valueAsNumber: true })}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${
            errors.capacity ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          min="1"
        />
        {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity.message}</p>}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status <span className="text-red-500">*</span>
        </label>
        <select
          id="status"
          {...register('status')}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${
            errors.status ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
        </select>
        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
      </div>

      <div>
        <label htmlFor="assignedDriverId" className="block text-sm font-medium text-gray-700">
          Assigned Driver
        </label>
        <select
          id="assignedDriverId"
          {...register('assignedDriverId')}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${
            errors.assignedDriverId ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
        >
          <option value="">No driver assigned</option>
          {activeDrivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.fullName} ({driver.licenseNumber})
            </option>
          ))}
        </select>
        {errors.assignedDriverId && <p className="mt-1 text-sm text-red-600">{errors.assignedDriverId.message}</p>}
        {activeDrivers.length === 0 && (
          <p className="mt-1 text-sm text-yellow-600">No active drivers available for assignment.</p>
        )}
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
