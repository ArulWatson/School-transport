import { Outlet, NavLink } from 'react-router-dom';
import { ToastContainer } from '@/components/Toast';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <NavLink to="/" className="text-xl font-bold text-blue-600">
              School Transport
            </NavLink>
            <div className="flex gap-6">
              <NavLink
                to="/drivers"
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
                }
              >
                Drivers
              </NavLink>
              <NavLink
                to="/vehicles"
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
                }
              >
                Vehicles
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
}
