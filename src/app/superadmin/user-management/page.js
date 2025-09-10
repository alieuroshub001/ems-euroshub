'use client';

import { useState } from 'react';
import Header from '../../../components/Global/Header/Header';
import Sidebar from '../../../components/Global/Sidebar/Sidebar';
import UserManagement from '../../../components/UserManagement/UserManagement';

export default function SuperAdminUserManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarCollapse = (collapsed) => setSidebarCollapsed(collapsed);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        userRole="superadmin"
        userName="Super Admin"
        userEmail="admin@euroshub.com"
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onCollapseChange={handleSidebarCollapse}
      />
      
      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <Header 
          userRole="superadmin"
          userName="Super Admin"
          userEmail="admin@euroshub.com"
          onSidebarToggle={toggleSidebar}
          title="User Management"
          breadcrumbs={['Dashboard', 'Super Admin', 'User Management']}
        />
        
        <main className="p-6">
          <UserManagement userRole="superadmin" />
        </main>
      </div>
    </div>
  );
}