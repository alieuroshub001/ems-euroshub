'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Global/Header/Header';
import Sidebar from '../../components/Global/Sidebar/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { 
  Users, 
  Building2, 
  Shield, 
  BarChart3, 
  TrendingUp, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, isLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 1247,
    totalOrganizations: 23,
    systemUptime: '99.9%',
    activeUsers: 892,
    systemAlerts: 3,
    monthlyRevenue: 45600,
    storageUsage: 67,
    apiCalls: 125340
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarCollapse = (collapsed) => setSidebarCollapsed(collapsed);

  const statCards = [
    {
      title: 'Total Users',
      value: dashboardData.totalUsers.toLocaleString(),
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Organizations',
      value: dashboardData.totalOrganizations,
      change: '+3',
      changeType: 'positive',
      icon: Building2,
      color: 'green'
    },
    {
      title: 'System Uptime',
      value: dashboardData.systemUptime,
      change: 'Excellent',
      changeType: 'positive',
      icon: Activity,
      color: 'emerald'
    },
    {
      title: 'Active Users',
      value: dashboardData.activeUsers.toLocaleString(),
      change: '+8%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'System Alerts',
      value: dashboardData.systemAlerts,
      change: '-2',
      changeType: 'positive',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      title: 'Monthly Revenue',
      value: `$${(dashboardData.monthlyRevenue / 1000).toFixed(1)}k`,
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'green'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      message: 'New organization "Tech Corp" registered',
      time: '5 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'system',
      message: 'System backup completed successfully',
      time: '15 minutes ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'alert',
      message: 'High CPU usage detected on Server 2',
      time: '1 hour ago',
      status: 'warning'
    },
    {
      id: 4,
      type: 'user',
      message: '125 new users registered today',
      time: '2 hours ago',
      status: 'info'
    }
  ];

  const systemHealth = [
    { name: 'Database', status: 'healthy', uptime: '99.9%' },
    { name: 'API Gateway', status: 'healthy', uptime: '99.8%' },
    { name: 'File Storage', status: 'warning', uptime: '97.2%' },
    { name: 'Email Service', status: 'healthy', uptime: '99.5%' }
  ];

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
          title={`${user?.name || 'Super Admin'} Dashboard`}
          breadcrumbs={['Dashboard', 'Super Admin']}
        />
        
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || 'Super Admin'}!</h1>
            <p className="text-gray-600">Monitor and manage the entire EurosHub system</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    } flex items-center mt-1`}>
                      <span>{stat.change}</span>
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* System Health */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="space-y-4">
                {systemHealth.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'healthy' ? 'bg-green-500' :
                        service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="font-medium text-gray-900">{service.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">{service.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' : 
                      activity.status === 'info' ? 'bg-blue-500' : 'bg-red-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="/superadmin/user-management" className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">Manage Users</span>
              </a>
              <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Building2 className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-900">Add Organization</span>
              </button>
              <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-900">View Analytics</span>
              </button>
              <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Shield className="h-5 w-5 text-red-600" />
                <span className="font-medium text-gray-900">Security Settings</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}