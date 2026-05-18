import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDriverStore } from '@/store/useDriverStore';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { StatusBadge } from '@/components/StatusBadge';

export function DriverDetail() {
  const { id } = useParams<{ id: string }>();
  const { currentDriver, loading, error, fetchDriver } = useDriverStore();

  useEffect(() => {
    if (id) fetchDriver(id);
  }, [id, fetchDriver]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => id && fetchDriver(id)} />;
  if (!currentDriver) return <ErrorMessage message="Driver not found" />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Driver Details</h1>
        <div className="flex gap-3">
          <Link
            to={`/drivers/${currentDriver.id}/edit`}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Edit
          </Link>
          <Link
            to="/drivers"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to List
          </Link>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Full Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{currentDriver.fullName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
            <dd className="mt-1 text-sm text-gray-900">{currentDriver.mobileNumber}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">License Number</dt>
            <dd className="mt-1 text-sm text-gray-900">{currentDriver.licenseNumber}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <StatusBadge status={currentDriver.status} />
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900">{currentDriver.address}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(currentDriver.createdAt).toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Updated At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(currentDriver.updatedAt).toLocaleDateString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
