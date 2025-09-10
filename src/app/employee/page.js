'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Global/Header/Header';
import Sidebar from '../../components/Global/Sidebar/Sidebar';
import { 
  Clock,
  Calendar,
  DollarSign,
  Users,
  Bell,
  UserCheck,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';

export default function EmployeeDashboard() {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardData, setDashboardData] = useState({
    hoursWorkedToday: 6.5,
    hoursWorkedThisWeek: 32,
    remainingLeaveBalance: 18,
    upcomingLeaveRequests: 2,
    lastPayAmount: 3200,
    nextPayDate: '2024-01-15',
    attendanceRate: 96.5,
    overtimeHours: 4
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarCollapse = (collapsed) => setSidebarCollapsed(collapsed);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const statCards = [
    {
      title: 'Hours Today',
      value: `${dashboardData.hoursWorkedToday}h`,
      change: 'On track',
      changeType: 'positive',
      icon: Clock,
      color: 'blue'
    },
    {
      title: 'This Week',
      value: `${dashboardData.hoursWorkedThisWeek}h`,
      change: '8h remaining',
      changeType: 'neutral',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Leave Balance',
      value: `${dashboardData.remainingLeaveBalance} days`,
      change: 'Available',
      changeType: 'positive',
      icon: Calendar,
      color: 'purple'
    },
    {
      title: 'Attendance Rate',
      value: `${dashboardData.attendanceRate}%`,
      change: 'Excellent',
      changeType: 'positive',
      icon: CheckCircle2,
      color: 'emerald'
    },
    {
      title: 'Last Pay',
      value: `$${dashboardData.lastPayAmount.toLocaleString()}`,
      change: 'Processed',
      changeType: 'positive',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Next Pay',
      value: new Date(dashboardData.nextPayDate).toLocaleDateString(),
      change: 'Upcoming',
      changeType: 'neutral',
      icon: Calendar,
      color: 'orange'
    }
  ];

  const todaysSchedule = [
    { time: '09:00 AM', event: 'Daily Standup', type: 'meeting', status: 'completed' },
    { time: '10:30 AM', event: 'Project Review', type: 'meeting', status: 'completed' },
    { time: '02:00 PM', event: 'Client Call', type: 'meeting', status: 'upcoming' },
    { time: '04:00 PM', event: 'Team Building', type: 'event', status: 'upcoming' },
    { time: '05:30 PM', event: 'Weekly Report Due', type: 'deadline', status: 'pending' }
  ];

  const recentPayStubs = [
    { date: '2023-12-31', amount: 3200, type: 'Regular Pay', status: 'processed' },
    { date: '2023-12-15', amount: 3200, type: 'Regular Pay', status: 'processed' },
    { date: '2023-11-30', amount: 3400, type: 'Regular + Overtime', status: 'processed' },
    { date: '2023-11-15', amount: 3200, type: 'Regular Pay', status: 'processed' }
  ];

  const leaveHistory = [
    { dates: 'Jan 8-10, 2024', type: 'Vacation', days: 3, status: 'approved' },
    { dates: 'Dec 25, 2023', type: 'Holiday', days: 1, status: 'approved' },
    { dates: 'Dec 15, 2023', type: 'Sick Leave', days: 1, status: 'approved' },
    { dates: 'Nov 23-24, 2023', type: 'Personal', days: 2, status: 'approved' }
  ];

  const quickActions = [
    { title: 'Clock In/Out', icon: Clock, color: 'blue', action: 'clock' },
    { title: 'Request Leave', icon: Calendar, color: 'green', action: 'leave' },
    { title: 'View Pay Stubs', icon: DollarSign, color: 'purple', action: 'paystubs' },
    { title: 'Update Profile', icon: UserCheck, color: 'orange', action: 'profile' }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Company Holiday - New Year',
      message: 'Office will be closed on January 1st',
      date: '2024-01-01',
      type: 'holiday',
      priority: 'medium'
    },
    {
      id: 2,
      title: 'Annual Performance Reviews',
      message: 'Schedule your review meeting with your manager',
      date: '2024-01-15',
      type: 'review',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Health Insurance Enrollment',
      message: 'Open enrollment period starts next week',
      date: '2024-01-20',
      type: 'benefits',
      priority: 'medium'
    }
  ];

  const getCurrentTimeString = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const getCurrentDateString = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
          title={`${user?.name || 'Employee'} Dashboard`}
          breadcrumbs={['Dashboard', 'Employee']}
        />
        
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Employee'}!</h1>
                <p className="text-blue-100">{getCurrentDateString()}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{getCurrentTimeString()}</div>
                <p className="text-blue-100">Current Time</p>
              </div>
            </div>
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
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-gray-600'
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
            {/* Today's Schedule */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {todaysSchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'completed' ? 'bg-green-500' :
                        item.status === 'upcoming' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{item.event}</p>
                        <p className="text-sm text-gray-600">{item.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="flex flex-col items-center space-y-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-3 rounded-lg bg-${action.color}-100`}>
                      <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{action.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Pay Stubs */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Pay Stubs</h3>
              <div className="space-y-3">
                {recentPayStubs.map((pay, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">{pay.type}</p>
                      <p className="text-sm text-gray-600">{new Date(pay.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${pay.amount.toLocaleString()}</p>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {pay.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Announcements */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Announcements</h3>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-3 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        announcement.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {announcement.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{announcement.message}</p>
                    <p className="text-xs text-gray-500">{new Date(announcement.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}