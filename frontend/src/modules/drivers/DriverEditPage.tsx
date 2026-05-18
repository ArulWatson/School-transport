import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDriverStore } from '../../store/driverStore';
import type { DriverFormData } from '../../types';
import DriverForm from './DriverForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/ErrorState';

export default function DriverEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedDriver, loading, error, fetchDriver, updateDriver, clearSelectedDriver } = useDriverStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) fetchDriver(id);
    return () => clearSelectedDriver();
  }, [id, fetchDriver, clearSelectedDriver]);

  const handleSubmit = async (data: DriverFormData) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await updateDriver(id, data);
      toast.success('Driver updated successfully');
      navigate(`/drivers/${id}`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update driver';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={() => id && fetchDriver(id)} />;
  if (!selectedDriver) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6">
        <Link to={`/drivers/${id}`} className="text-sm text-blue-600 hover:underline">
          &larr; Back to Driver
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Driver</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <DriverForm
          defaultValues={{
            fullName: selectedDriver.fullName,
            mobileNumber: selectedDriver.mobileNumber,
            licenseNumber: selectedDriver.licenseNumber,
            address: selectedDriver.address,
            status: selectedDriver.status,
          }}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Update Driver"
        />
      </div>
    </div>
  );
}
