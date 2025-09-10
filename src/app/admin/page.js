'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Global/Header/Header';
import Sidebar from '../../components/Global/Sidebar/Sidebar';
import { 
  Users, 
  Building2, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  BarChart3
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 156,
    departments: 8,
    presentToday: 142,
    onLeave: 14,
    pendingLeaveRequests: 7,
    monthlyPayroll: 285600,
    averageAttendance: 91.2,
    newHires: 12
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarCollapse = (collapsed) => setSidebarCollapsed(collapsed);

  const statCards = [
    {
      title: 'Total Employees',
      value: dashboardData.totalEmployees,
      change: '+8 this month',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Departments',
      value: dashboardData.departments,
      change: 'All active',
      changeType: 'neutral',
      icon: Building2,
      color: 'green'
    },
    {
      title: 'Present Today',
      value: dashboardData.presentToday,
      change: '91% attendance',
      changeType: 'positive',
      icon: CheckCircle2,
      color: 'emerald'
    },
    {
      title: 'On Leave',
      value: dashboardData.onLeave,
      change: '9% of workforce',
      changeType: 'neutral',
      icon: Calendar,
      color: 'orange'
    },
    {
      title: 'Leave Requests',
      value: dashboardData.pendingLeaveRequests,
      change: 'Pending approval',
      changeType: 'attention',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Monthly Payroll',
      value: `$${(dashboardData.monthlyPayroll / 1000).toFixed(0)}k`,
      change: '+3% from last month',
      changeType: 'positive',
      icon: DollarSign,
      color: 'purple'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'employee',
      message: 'John Smith submitted leave request',
      time: '10 minutes ago',
      status: 'pending',
      action: 'Review'
    },
    {
      id: 2,
      type: 'payroll',
      message: 'Monthly payroll processed successfully',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'attendance',
      message: 'Attendance report generated',
      time: '4 hours ago',
      status: 'info'
    },
    {
      id: 4,
      type: 'employee',
      message: 'New employee Sarah Johnson onboarded',
      time: '1 day ago',
      status: 'success'
    }
  ];

  const departmentStats = [
    { name: 'Engineering', employees: 45, present: 42, attendance: 93 },
    { name: 'Sales', employees: 28, present: 26, attendance: 93 },
    { name: 'Marketing', employees: 22, present: 20, attendance: 91 },
    { name: 'HR', employees: 12, present: 11, attendance: 92 },
    { name: 'Finance', employees: 15, present: 14, attendance: 93 },
    { name: 'Operations', employees: 18, present: 16, attendance: 89 },
    { name: 'Design', employees: 10, present: 9, attendance: 90 },
    { name: 'Support', employees: 16, present: 14, attendance: 88 }
  ];

  const upcomingEvents = [
    { id: 1, title: 'All Hands Meeting', date: 'Today, 3:00 PM', type: 'meeting' },
    { id: 2, title: 'Performance Reviews Due', date: 'Tomorrow', type: 'deadline' },
    { id: 3, title: 'Team Building Event', date: 'Friday, 2:00 PM', type: 'event' },
    { id: 4, title: 'Quarterly Planning', date: 'Next Monday', type: 'meeting' }
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
          title={`${user?.name || 'Admin'} Dashboard`}
          breadcrumbs={['Dashboard', 'Admin']}
        />
        
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || 'Admin'}!</h1>
            <p className="text-gray-600">Manage your organization's workforce and operations</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm flex items-center mt-1 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'attention' ? 'text-orange-600' : 'text-gray-600'
                    }`}>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Department Overview */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h3>
              <div className="space-y-3">
                {departmentStats.slice(0, 6).map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div>
                      <span className="font-medium text-gray-900">{dept.name}</span>
                      <p className="text-sm text-gray-600">{dept.present}/{dept.employees} present</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
                        dept.attendance >= 92 ? 'text-green-600' : 
                        dept.attendance >= 90 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {dept.attendance}%
                      </span>
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
                  <div key={activity.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'pending' ? 'bg-yellow-500' : 
                        activity.status === 'info' ? 'bg-blue-500' : 'bg-red-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    {activity.action && (
                      <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md hover:bg-blue-200">
                        {activity.action}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                    <div className={`w-3 h-3 rounded-full ${
                      event.type === 'meeting' ? 'bg-blue-500' :
                      event.type === 'deadline' ? 'bg-red-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-600">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Add Employee</span>
                </button>
                <button className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Calendar className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">Leave Requests</span>
                </button>
                <button className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900">Reports</span>
                </button>
                <button className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-900">Payroll</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}