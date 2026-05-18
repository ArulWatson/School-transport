import { useNavigate } from 'react-router-dom';
import { DriverForm } from './DriverForm';
import { useDriverStore } from '@/store/useDriverStore';
import { useToastStore } from '@/store/useToastStore';
import type { DriverFormData } from '@/types';

export function DriverCreate() {
  const navigate = useNavigate();
  const { createDriver, loading } = useDriverStore();
  const addToast = useToastStore((s) => s.addToast);

  const handleSubmit = async (data: DriverFormData) => {
    try {
      await createDriver(data);
      addToast('Driver created successfully', 'success');
      navigate('/drivers');
    } catch {
      addToast('Failed to create driver', 'error');
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Create Driver</h1>
      <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow">
        <DriverForm onSubmit={handleSubmit} submitLabel="Create Driver" loading={loading} />
      </div>
    </div>
  );
}
