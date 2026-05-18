import { Outlet, NavLink } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export default function MainLayout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="text-xl font-bold text-blue-600">
              School Transport
            </NavLink>
            <nav className="flex space-x-2">
              <NavLink to="/drivers" className={linkClass}>
                Drivers
              </NavLink>
              <NavLink to="/vehicles" className={linkClass}>
                Vehicles
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
