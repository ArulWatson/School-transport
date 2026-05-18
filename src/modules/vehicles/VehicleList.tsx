import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useVehicleStore } from '@/store/useVehicleStore';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { EmptyState } from '@/components/EmptyState';
import { ErrorMessage } from '@/components/ErrorMessage';
import { StatusBadge } from '@/components/StatusBadge';
import type { Vehicle } from '@/types';

const columnHelper = createColumnHelper<Vehicle>();

const columns = [
  columnHelper.accessor('vehicleNumber', {
    header: 'Vehicle Number',
    cell: (info) => (
      <Link to={`/vehicles/${info.row.original.id}`} className="text-blue-600 hover:underline">
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
      <div className="flex gap-2">
        <Link
          to={`/vehicles/${info.row.original.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          View
        </Link>
        <Link
          to={`/vehicles/${info.row.original.id}/edit`}
          className="text-sm text-green-600 hover:underline"
        >
          Edit
        </Link>
      </div>
    ),
  }),
];

export function VehicleList() {
  const { vehicles, loading, error, fetchVehicles } = useVehicleStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const table = useReactTable({
    data: vehicles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchVehicles} />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
        <Link
          to="/vehicles/create"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Vehicle
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <EmptyState message="No vehicles found" />
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
