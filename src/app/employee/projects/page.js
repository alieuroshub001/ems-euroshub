'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Global/Header/Header';
import Sidebar from '@/components/Global/Sidebar/Sidebar';
import KanbanBoard from '@/components/ProjectManagement/KanbanBoard';

export default function EmployeeProjectsPage() {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarCollapse = (collapsed) => setSidebarCollapsed(collapsed);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onCollapseChange={handleSidebarCollapse}
      />
      
      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <Header 
          onSidebarToggle={toggleSidebar}
          title="My Projects"
          breadcrumbs={['Employee', 'Project Management']}
        />
        
        <main>
          <KanbanBoard />
        </main>
      </div>
    </div>
  );
}