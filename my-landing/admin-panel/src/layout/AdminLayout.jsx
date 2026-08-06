import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <aside style={{ width: '256px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb' }}>
        <Sidebar />
      </aside>
      <main style={{ flex: 1, padding: '32px' }}>
        <Outlet />
      </main>
    </div>
  );
}
