import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/sidebar';
import { NavbarWrapper } from '@/components/dashboard/navbar-wrapper';

export function DashboardLayout() {
  return (
    <div className="flex relative min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-80">
        <NavbarWrapper />
        <div className="p-12 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
