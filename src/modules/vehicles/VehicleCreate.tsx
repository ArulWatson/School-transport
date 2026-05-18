import { useNavigate } from 'react-router-dom';
import { VehicleForm } from './VehicleForm';
import { useVehicleStore } from '@/store/useVehicleStore';
import { useToastStore } from '@/store/useToastStore';
import type { VehicleFormData } from '@/types';

export function VehicleCreate() {
  const navigate = useNavigate();
  const { createVehicle, loading } = useVehicleStore();
  const addToast = useToastStore((s) => s.addToast);

  const handleSubmit = async (data: VehicleFormData) => {
    try {
      await createVehicle(data);
      addToast('Vehicle created successfully', 'success');
      navigate('/vehicles');
    } catch {
      addToast('Failed to create vehicle', 'error');
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Create Vehicle</h1>
      <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow">
        <VehicleForm onSubmit={handleSubmit} submitLabel="Create Vehicle" loading={loading} />
      </div>
    </div>
  );
}
