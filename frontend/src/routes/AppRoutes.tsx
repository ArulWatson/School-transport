import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DriverListPage from '../modules/drivers/DriverListPage';
import DriverCreatePage from '../modules/drivers/DriverCreatePage';
import DriverEditPage from '../modules/drivers/DriverEditPage';
import DriverDetailPage from '../modules/drivers/DriverDetailPage';
import VehicleListPage from '../modules/vehicles/VehicleListPage';
import VehicleCreatePage from '../modules/vehicles/VehicleCreatePage';
import VehicleEditPage from '../modules/vehicles/VehicleEditPage';
import VehicleDetailPage from '../modules/vehicles/VehicleDetailPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/drivers" replace />} />

        <Route path="/drivers" element={<DriverListPage />} />
        <Route path="/drivers/create" element={<DriverCreatePage />} />
        <Route path="/drivers/:id" element={<DriverDetailPage />} />
        <Route path="/drivers/:id/edit" element={<DriverEditPage />} />

        <Route path="/vehicles" element={<VehicleListPage />} />
        <Route path="/vehicles/create" element={<VehicleCreatePage />} />
        <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
        <Route path="/vehicles/:id/edit" element={<VehicleEditPage />} />
      </Route>
    </Routes>
  );
}
