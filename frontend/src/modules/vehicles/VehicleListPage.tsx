import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { useVehicleStore } from '../../store/vehicleStore';
import type { Vehicle } from '../../types';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';

const columnHelper = createColumnHelper<Vehicle>();

const columns = [
  columnHelper.accessor('vehicleNumber', {
    header: 'Vehicle Number',
    cell: (info) => (
      <Link to={`/vehicles/${info.row.original.id}`} className="text-blue-600 hover:underline font-medium">
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('vehicleType', {
    header: 'Type',
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  columnHelper.accessor('capacity', {
    header: 'Capacity',
  }),
  columnHelper.accessor('assignedDriver', {
    header: 'Assigned Driver',
    cell: (info) => {
      const driver = info.getValue();
      return driver ? (
        <Link to={`/drivers/${driver.id}`} className="text-blue-600 hover:underline">
          {driver.fullName}
        </Link>
      ) : (
        <span className="text-gray-400">Unassigned</span>
      );
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => <StatusBadge status={info.getValue()} />,
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: (info) => (
      <div className="flex space-x-2">
        <Link
          to={`/vehicles/${info.row.original.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          View
        </Link>
        <Link
          to={`/vehicles/${info.row.original.id}/edit`}
          className="text-sm text-indigo-600 hover:underline"
        >
          Edit
        </Link>
      </div>
    ),
  }),
];

export default function VehicleListPage() {
  const { vehicles, loading, error, fetchVehicles } = useVehicleStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={fetchVehicles} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
        <Link
          to="/vehicles/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
        >
          Add Vehicle
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <EmptyState
          title="No vehicles found"
          message="Get started by adding your first vehicle."
          action={
            <Link
              to="/vehicles/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              Add Vehicle
            </Link>
          }
        />
      ) : (
        <DataTable data={vehicles} columns={columns} searchPlaceholder="Search vehicles..." />
      )}
    </div>
  );
}
