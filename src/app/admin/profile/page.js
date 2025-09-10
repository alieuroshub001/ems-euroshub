'use client';

import { useState } from 'react';
import Header from '../../../components/Global/Header/Header';
import Sidebar from '../../../components/Global/Sidebar/Sidebar';
import Profile from '../../../components/Profile/Profile';

export default function AdminProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarCollapse = (collapsed) => setSidebarCollapsed(collapsed);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        userRole="admin"
        userName="Admin User"
        userEmail="admin@company.com"
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onCollapseChange={handleSidebarCollapse}
      />
      
      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <Header 
          userRole="admin"
          userName="Admin User"
          userEmail="admin@company.com"
          onSidebarToggle={toggleSidebar}
          title="My Profile"
          breadcrumbs={['Dashboard', 'Profile']}
        />
        
        <main className="p-6">
          <Profile userRole="admin" />
        </main>
      </div>
    </div>
  );
}