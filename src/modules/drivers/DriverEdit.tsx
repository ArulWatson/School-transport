import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DriverForm } from './DriverForm';
import { useDriverStore } from '@/store/useDriverStore';
import { useToastStore } from '@/store/useToastStore';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { DriverFormData } from '@/types';

export function DriverEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentDriver, loading, error, fetchDriver, updateDriver } = useDriverStore();
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    if (id) fetchDriver(id);
  }, [id, fetchDriver]);

  const handleSubmit = async (data: DriverFormData) => {
    if (!id) return;
    try {
      await updateDriver(id, data);
      addToast('Driver updated successfully', 'success');
      navigate(`/drivers/${id}`);
    } catch {
      addToast('Failed to update driver', 'error');
    }
  };

  if (loading && !currentDriver) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => id && fetchDriver(id)} />;
  if (!currentDriver) return <ErrorMessage message="Driver not found" />;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Edit Driver</h1>
      <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow">
        <DriverForm
          defaultValues={{
            fullName: currentDriver.fullName,
            mobileNumber: currentDriver.mobileNumber,
            licenseNumber: currentDriver.licenseNumber,
            address: currentDriver.address,
            status: currentDriver.status,
          }}
          onSubmit={handleSubmit}
          submitLabel="Update Driver"
          loading={loading}
        />
      </div>
    </div>
  );
}
