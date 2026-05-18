import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VehicleForm } from './VehicleForm';
import { useVehicleStore } from '@/store/useVehicleStore';
import { useToastStore } from '@/store/useToastStore';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { VehicleFormData } from '@/types';

export function VehicleEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentVehicle, loading, error, fetchVehicle, updateVehicle } = useVehicleStore();
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    if (id) fetchVehicle(id);
  }, [id, fetchVehicle]);

  const handleSubmit = async (data: VehicleFormData) => {
    if (!id) return;
    try {
      await updateVehicle(id, data);
      addToast('Vehicle updated successfully', 'success');
      navigate(`/vehicles/${id}`);
    } catch {
      addToast('Failed to update vehicle', 'error');
    }
  };

  if (loading && !currentVehicle) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => id && fetchVehicle(id)} />;
  if (!currentVehicle) return <ErrorMessage message="Vehicle not found" />;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Edit Vehicle</h1>
      <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow">
        <VehicleForm
          defaultValues={{
            vehicleNumber: currentVehicle.vehicleNumber,
            vehicleType: currentVehicle.vehicleType,
            capacity: currentVehicle.capacity,
            assignedDriverId: currentVehicle.assignedDriverId || '',
            status: currentVehicle.status,
          }}
          onSubmit={handleSubmit}
          submitLabel="Update Vehicle"
          loading={loading}
        />
      </div>
    </div>
  );
}
