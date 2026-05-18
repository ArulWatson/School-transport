import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { useDriverStore } from '../../store/driverStore';
import type { Driver } from '../../types';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';

const columnHelper = createColumnHelper<Driver>();

const columns = [
  columnHelper.accessor('fullName', {
    header: 'Full Name',
    cell: (info) => (
      <Link to={`/drivers/${info.row.original.id}`} className="text-blue-600 hover:underline font-medium">
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('mobileNumber', {
    header: 'Mobile Number',
  }),
  columnHelper.accessor('licenseNumber', {
    header: 'License Number',
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
          to={`/drivers/${info.row.original.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          View
        </Link>
        <Link
          to={`/drivers/${info.row.original.id}/edit`}
          className="text-sm text-indigo-600 hover:underline"
        >
          Edit
        </Link>
      </div>
    ),
  }),
];

export default function DriverListPage() {
  const { drivers, loading, error, fetchDrivers } = useDriverStore();

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} onRetry={fetchDrivers} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
        <Link
          to="/drivers/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
        >
          Add Driver
        </Link>
      </div>

      {drivers.length === 0 ? (
        <EmptyState
          title="No drivers found"
          message="Get started by adding your first driver."
          action={
            <Link
              to="/drivers/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              Add Driver
            </Link>
          }
        />
      ) : (
        <DataTable data={drivers} columns={columns} searchPlaceholder="Search drivers..." />
      )}
    </div>
  );
}
