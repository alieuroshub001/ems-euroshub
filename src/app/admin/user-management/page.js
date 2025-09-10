'use client';

import { useState } from 'react';
import Header from '../../../components/Global/Header/Header';
import Sidebar from '../../../components/Global/Sidebar/Sidebar';
import UserManagement from '../../../components/UserManagement/UserManagement';

export default function AdminUserManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarCollapse = (collapsed) => setSidebarCollapsed(collapsed);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        userRole="admin"
        userName="Admin User"
        userEmail="admin@euroshub.com"
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onCollapseChange={handleSidebarCollapse}
      />
      
      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <Header 
          userRole="admin"
          userName="Admin User"
          userEmail="admin@euroshub.com"
          onSidebarToggle={toggleSidebar}
          title="User Management"
          breadcrumbs={['Dashboard', 'Admin', 'User Management']}
        />
        
        <main className="p-6">
          <UserManagement userRole="admin" />
        </main>
      </div>
    </div>
  );
}