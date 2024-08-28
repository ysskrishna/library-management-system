"use client";

import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar';
import BookTable from '@/components/BookTable/admin';
import { ROLE } from '@/common/constants';

const Dashboard = () => {
  return (
    <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
      <div className="flex h-screen">
        <Sidebar />
        <div className='flex-1 p-3 mb-3 overflow-y-auto'>
          <BookTable />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;