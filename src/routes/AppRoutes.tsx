import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { DriverList } from '@/modules/drivers/DriverList';
import { DriverCreate } from '@/modules/drivers/DriverCreate';
import { DriverEdit } from '@/modules/drivers/DriverEdit';
import { DriverDetail } from '@/modules/drivers/DriverDetail';
import { VehicleList } from '@/modules/vehicles/VehicleList';
import { VehicleCreate } from '@/modules/vehicles/VehicleCreate';
import { VehicleEdit } from '@/modules/vehicles/VehicleEdit';
import { VehicleDetail } from '@/modules/vehicles/VehicleDetail';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/drivers" replace />} />
        <Route path="/drivers" element={<DriverList />} />
        <Route path="/drivers/create" element={<DriverCreate />} />
        <Route path="/drivers/:id" element={<DriverDetail />} />
        <Route path="/drivers/:id/edit" element={<DriverEdit />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/vehicles/create" element={<VehicleCreate />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />
        <Route path="/vehicles/:id/edit" element={<VehicleEdit />} />
      </Route>
    </Routes>
  );
}
