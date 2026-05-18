import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useVehicleStore } from '../../store/vehicleStore';
import type { VehicleFormData } from '../../types';
import VehicleForm from './VehicleForm';

export default function VehicleCreatePage() {
  const navigate = useNavigate();
  const { createVehicle } = useVehicleStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: VehicleFormData) => {
    setIsSubmitting(true);
    try {
      await createVehicle(data);
      toast.success('Vehicle created successfully');
      navigate('/vehicles');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create vehicle';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link to="/vehicles" className="text-sm text-blue-600 hover:underline">
          &larr; Back to Vehicles
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Create Vehicle</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <VehicleForm onSubmit={handleSubmit} isSubmitting={isSubmitting} submitLabel="Create Vehicle" />
      </div>
    </div>
  );
}
