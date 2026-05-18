import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDriverStore } from '../../store/driverStore';
import StatusBadge from '../../components/StatusBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/ErrorState';

export default function DriverDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { selectedDriver, loading, error, fetchDriver, clearSelectedDriver } = useDriverStore();

  useEffect(() => {
    if (id) fetchDriver(id);
    return () => clearSelectedDriver();
  }, [id, fetchDriver, clearSelectedDriver]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={() => id && fetchDriver(id)} />;
  if (!selectedDriver) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6">
        <Link to="/drivers" className="text-sm text-blue-600 hover:underline">
          &larr; Back to Drivers
        </Link>
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-2xl font-bold text-gray-900">{selectedDriver.fullName}</h1>
          <Link
            to={`/drivers/${id}/edit`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
          >
            Edit Driver
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <dl className="divide-y divide-gray-200">
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Full Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{selectedDriver.fullName}</dd>
          </div>
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{selectedDriver.mobileNumber}</dd>
          </div>
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">License Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{selectedDriver.licenseNumber}</dd>
          </div>
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{selectedDriver.address}</dd>
          </div>
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 sm:col-span-2 sm:mt-0">
              <StatusBadge status={selectedDriver.status} />
            </dd>
          </div>
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {new Date(selectedDriver.createdAt).toLocaleString()}
            </dd>
          </div>
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Updated At</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {new Date(selectedDriver.updatedAt).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
