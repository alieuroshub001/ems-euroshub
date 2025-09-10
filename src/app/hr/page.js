'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Global/Header/Header';
import Sidebar from '../../components/Global/Sidebar/Sidebar';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  FileText,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  Award,
  Target,
  Briefcase
} from 'lucide-react';

export default function HRDashboard() {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 156,
    newHiresThisMonth: 8,
    pendingRecruitment: 12,
    pendingLeaveRequests: 15,
    upcomingReviews: 23,
    averageTenure: 3.2,
    employeeSatisfaction: 4.2,
    turnoverRate: 8.5
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarCollapse = (collapsed) => setSidebarCollapsed(collapsed);

  const statCards = [
    {
      title: 'Total Employees',
      value: dashboardData.totalEmployees,
      change: `+${dashboardData.newHiresThisMonth} this month`,
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'New Hires',
      value: dashboardData.newHiresThisMonth,
      change: 'This month',
      changeType: 'positive',
      icon: UserPlus,
      color: 'green'
    },
    {
      title: 'Open Positions',
      value: dashboardData.pendingRecruitment,
      change: 'In progress',
      changeType: 'neutral',
      icon: Briefcase,
      color: 'purple'
    },
    {
      title: 'Leave Requests',
      value: dashboardData.pendingLeaveRequests,
      change: 'Pending approval',
      changeType: 'attention',
      icon: Calendar,
      color: 'orange'
    },
    {
      title: 'Performance Reviews',
      value: dashboardData.upcomingReviews,
      change: 'Due this month',
      changeType: 'attention',
      icon: Award,
      color: 'yellow'
    },
    {
      title: 'Satisfaction Score',
      value: `${dashboardData.employeeSatisfaction}/5.0`,
      change: 'Employee rating',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'emerald'
    }
  ];

  const departmentStats = [
    { name: 'Engineering', total: 45, new: 3, turnover: 6.2, satisfaction: 4.3 },
    { name: 'Sales', total: 28, new: 2, turnover: 12.1, satisfaction: 4.0 },
    { name: 'Marketing', total: 22, new: 1, turnover: 9.5, satisfaction: 4.1 },
    { name: 'Finance', total: 15, new: 0, turnover: 4.8, satisfaction: 4.4 },
    { name: 'Operations', total: 18, new: 1, turnover: 7.3, satisfaction: 4.2 },
    { name: 'Design', total: 10, new: 1, turnover: 5.0, satisfaction: 4.5 },
    { name: 'Support', total: 16, new: 0, turnover: 15.2, satisfaction: 3.8 },
    { name: 'HR', total: 12, new: 0, turnover: 3.1, satisfaction: 4.6 }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'recruitment',
      message: 'New application for Senior Developer position',
      time: '30 minutes ago',
      status: 'new',
      action: 'Review'
    },
    {
      id: 2,
      type: 'leave',
      message: 'Sarah Johnson submitted sick leave request',
      time: '1 hour ago',
      status: 'pending',
      action: 'Approve'
    },
    {
      id: 3,
      type: 'onboarding',
      message: 'Completed onboarding for Mike Wilson',
      time: '3 hours ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'review',
      message: 'Performance review scheduled for Team Lead',
      time: '5 hours ago',
      status: 'scheduled'
    }
  ];

  const upcomingTasks = [
    { id: 1, task: 'Conduct exit interview', employee: 'John Smith', due: 'Today', priority: 'high' },
    { id: 2, task: 'Review job applications', position: 'Marketing Manager', due: 'Tomorrow', priority: 'high' },
    { id: 3, task: 'Prepare performance reports', department: 'Engineering', due: 'This Week', priority: 'medium' },
    { id: 4, task: 'Update employee handbook', section: 'Remote Work Policy', due: 'Next Week', priority: 'medium' }
  ];

  const leaveRequests = [
    { id: 1, employee: 'Alice Johnson', type: 'Vacation', dates: 'Jan 15-19', days: 5, status: 'pending' },
    { id: 2, employee: 'Bob Smith', type: 'Sick Leave', dates: 'Jan 12', days: 1, status: 'approved' },
    { id: 3, employee: 'Carol Davis', type: 'Personal', dates: 'Jan 20-21', days: 2, status: 'pending' },
    { id: 4, employee: 'David Wilson', type: 'Vacation', dates: 'Feb 5-9', days: 5, status: 'pending' }
  ];

  const recruitmentPipeline = [
    { position: 'Senior Developer', applications: 24, interviews: 6, offers: 2, status: 'active' },
    { position: 'UX Designer', applications: 18, interviews: 4, offers: 1, status: 'active' },
    { position: 'Product Manager', applications: 31, interviews: 8, offers: 0, status: 'active' },
    { position: 'Sales Executive', applications: 15, interviews: 3, offers: 1, status: 'active' }
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
          title={`${user?.name || 'HR Manager'} Dashboard`}
          breadcrumbs={['Dashboard', 'HR']}
        />
        
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || 'HR Manager'}!</h1>
            <p className="text-gray-600">Manage workforce, recruitment, and employee relations</p>
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
            {/* Department Statistics */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Statistics</h3>
              <div className="space-y-3">
                {departmentStats.slice(0, 6).map((dept, index) => (
                  <div key={index} className="p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{dept.name}</span>
                      <span className="text-sm text-gray-600">{dept.total} employees</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">New Hires:</span>
                        <span className="ml-1 font-medium text-green-600">{dept.new}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Turnover:</span>
                        <span className={`ml-1 font-medium ${
                          dept.turnover > 10 ? 'text-red-600' : 
                          dept.turnover > 7 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {dept.turnover}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Satisfaction:</span>
                        <span className="ml-1 font-medium text-blue-600">{dept.satisfaction}/5</span>
                      </div>
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
                        activity.status === 'completed' ? 'bg-green-500' :
                        activity.status === 'pending' ? 'bg-yellow-500' : 
                        activity.status === 'new' ? 'bg-blue-500' : 'bg-purple-500'
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
            {/* Leave Requests */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Leave Requests</h3>
              <div className="space-y-3">
                {leaveRequests.filter(req => req.status === 'pending').map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">{request.employee}</p>
                      <p className="text-sm text-gray-600">{request.type} - {request.dates}</p>
                      <p className="text-xs text-gray-500">{request.days} days</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200">
                        Approve
                      </button>
                      <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruitment Pipeline */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Pipeline</h3>
              <div className="space-y-4">
                {recruitmentPipeline.map((position, index) => (
                  <div key={index} className="p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{position.position}</h4>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {position.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{position.applications}</div>
                        <div className="text-gray-600">Applications</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-purple-600">{position.interviews}</div>
                        <div className="text-gray-600">Interviews</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{position.offers}</div>
                        <div className="text-gray-600">Offers</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-600">
                      {task.employee && `Employee: ${task.employee}`}
                      {task.position && `Position: ${task.position}`}
                      {task.department && `Department: ${task.department}`}
                      {task.section && `Section: ${task.section}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {task.priority}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{task.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}