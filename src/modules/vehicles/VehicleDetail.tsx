import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVehicleStore } from '@/store/useVehicleStore';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { StatusBadge } from '@/components/StatusBadge';

export function VehicleDetail() {
  const { id } = useParams<{ id: string }>();
  const { currentVehicle, loading, error, fetchVehicle } = useVehicleStore();

  useEffect(() => {
    if (id) fetchVehicle(id);
  }, [id, fetchVehicle]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => id && fetchVehicle(id)} />;
  if (!currentVehicle) return <ErrorMessage message="Vehicle not found" />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Vehicle Details</h1>
        <div className="flex gap-3">
          <Link
            to={`/vehicles/${currentVehicle.id}/edit`}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Edit
          </Link>
          <Link
            to="/vehicles"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to List
          </Link>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Vehicle Number</dt>
            <dd className="mt-1 text-sm text-gray-900">{currentVehicle.vehicleNumber}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Vehicle Type</dt>
            <dd className="mt-1 text-sm capitalize text-gray-900">{currentVehicle.vehicleType}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Capacity</dt>
            <dd className="mt-1 text-sm text-gray-900">{currentVehicle.capacity}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1">
              <StatusBadge status={currentVehicle.status} />
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Assigned Driver</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {currentVehicle.assignedDriver ? (
                <Link
                  to={`/drivers/${currentVehicle.assignedDriver.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {currentVehicle.assignedDriver.fullName}
                </Link>
              ) : (
                <span className="text-gray-400">Unassigned</span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(currentVehicle.createdAt).toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Updated At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(currentVehicle.updatedAt).toLocaleDateString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
