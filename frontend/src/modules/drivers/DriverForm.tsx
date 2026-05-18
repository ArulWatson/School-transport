import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { driverSchema, type DriverSchemaType } from '../../validations/driver';
import type { DriverFormData } from '../../types';

interface DriverFormProps {
  defaultValues?: DriverFormData;
  onSubmit: (data: DriverFormData) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
}

export default function DriverForm({ defaultValues, onSubmit, isSubmitting, submitLabel }: DriverFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DriverSchemaType>({
    resolver: zodResolver(driverSchema),
    defaultValues: defaultValues || {
      fullName: '',
      mobileNumber: '',
      licenseNumber: '',
      address: '',
      status: 'active',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          {...register('fullName')}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${
            errors.fullName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <input
          id="mobileNumber"
          type="text"
          {...register('mobileNumber')}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${
            errors.mobileNumber ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          placeholder="1234567890"
        />
        {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>}
      </div>

      <div>
        <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
          License Number <span className="text-red-500">*</span>
        </label>
        <input
          id="licenseNumber"
          type="text"
          {...register('licenseNumber')}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${
            errors.licenseNumber ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
        {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber.message}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          rows={3}
          {...register('address')}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${
            errors.address ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
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
          <option value="suspended">Suspended</option>
        </select>
        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
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
