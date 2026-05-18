import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useVehicleStore } from '../../store/vehicleStore';
import type { VehicleFormData } from '../../types';
import VehicleForm from './VehicleForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/ErrorState';

export default function VehicleEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedVehicle, loading, error, fetchVehicle, updateVehicle, clearSelectedVehicle } = useVehicleStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) fetchVehicle(id);
    return () => clearSelectedVehicle();
  }, [id, fetchVehicle, clearSelectedVehicle]);

  const handleSubmit = async (data: VehicleFormData) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await updateVehicle(id, data);
      toast.success('Vehicle updated successfully');
      navigate(`/vehicles/${id}`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update vehicle';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={() => id && fetchVehicle(id)} />;
  if (!selectedVehicle) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6">
        <Link to={`/vehicles/${id}`} className="text-sm text-blue-600 hover:underline">
          &larr; Back to Vehicle
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Vehicle</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <VehicleForm
          defaultValues={{
            vehicleNumber: selectedVehicle.vehicleNumber,
            vehicleType: selectedVehicle.vehicleType,
            capacity: selectedVehicle.capacity,
            status: selectedVehicle.status,
            assignedDriverId: selectedVehicle.assignedDriverId,
          }}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Update Vehicle"
        />
      </div>
    </div>
  );
}
