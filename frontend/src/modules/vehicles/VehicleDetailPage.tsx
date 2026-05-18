import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVehicleStore } from '../../store/vehicleStore';
import StatusBadge from '../../components/StatusBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/ErrorState';

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { selectedVehicle, loading, error, fetchVehicle, clearSelectedVehicle } = useVehicleStore();

  useEffect(() => {
    if (id) fetchVehicle(id);
    return () => clearSelectedVehicle();
  }, [id, fetchVehicle, clearSelectedVehicle]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={() => id && fetchVehicle(id)} />;
  if (!selectedVehicle) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6">
        <Link to="/vehicles" className="text-sm text-blue-600 hover:underline">
          &larr; Back to Vehicles
        </Link>
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-2xl font-bold text-gray-900">{selectedVehicle.vehicleNumber}</h1>
          <Link
            to={`/vehicles/${id}/edit`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
          >
            Edit Vehicle
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <dl className="divide-y divide-gray-200">
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Vehicle Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{selectedVehicle.vehicleNumber}</dd>
          </div>
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Vehicle Type</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 capitalize">{selectedVehicle.vehicleType}</dd>
          </div>
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Capacity</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{selectedVehicle.capacity}</dd>
          </div>
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Assigned Driver</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {selectedVehicle.assignedDriver ? (
                <Link to={`/drivers/${selectedVehicle.assignedDriver.id}`} className="text-blue-600 hover:underline">
                  {selectedVehicle.assignedDriver.fullName}
                </Link>
              ) : (
                <span className="text-gray-400">Unassigned</span>
              )}
            </dd>
          </div>
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 sm:col-span-2 sm:mt-0">
              <StatusBadge status={selectedVehicle.status} />
            </dd>
          </div>
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {new Date(selectedVehicle.createdAt).toLocaleString()}
            </dd>
          </div>
          <div className="px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Updated At</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {new Date(selectedVehicle.updatedAt).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
