import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDriverStore } from '../../store/driverStore';
import type { DriverFormData } from '../../types';
import DriverForm from './DriverForm';

export default function DriverCreatePage() {
  const navigate = useNavigate();
  const { createDriver } = useDriverStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: DriverFormData) => {
    setIsSubmitting(true);
    try {
      await createDriver(data);
      toast.success('Driver created successfully');
      navigate('/drivers');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create driver';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link to="/drivers" className="text-sm text-blue-600 hover:underline">
          &larr; Back to Drivers
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Create Driver</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <DriverForm onSubmit={handleSubmit} isSubmitting={isSubmitting} submitLabel="Create Driver" />
      </div>
    </div>
  );
}
