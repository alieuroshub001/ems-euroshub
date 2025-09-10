'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../components/Global/Header/Header';
import Sidebar from '../../components/Global/Sidebar/Sidebar';
import { 
  FolderOpen, 
  Users, 
  BarChart3, 
  Calendar, 
  MessageSquare, 
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Target
} from 'lucide-react';

export default function ClientDashboard() {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    activeProjects: 3,
    completedProjects: 8,
    totalInvoices: 5,
    projectsOnTrack: 2,
    projectsDelayed: 1,
    totalSpent: 125000,
    pendingPayments: 15000,
    upcomingMilestones: 4
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarCollapse = (collapsed) => setSidebarCollapsed(collapsed);

  const statCards = [
    {
      title: 'Active Projects',
      value: dashboardData.activeProjects,
      change: 'In progress',
      changeType: 'positive',
      icon: FolderOpen,
      color: 'blue'
    },
    {
      title: 'Completed Projects',
      value: dashboardData.completedProjects,
      change: 'Successfully delivered',
      changeType: 'positive',
      icon: CheckCircle2,
      color: 'green'
    },
    {
      title: 'On Track',
      value: dashboardData.projectsOnTrack,
      change: 'Meeting deadlines',
      changeType: 'positive',
      icon: Target,
      color: 'emerald'
    },
    {
      title: 'Needs Attention',
      value: dashboardData.projectsDelayed,
      change: 'Potential delays',
      changeType: 'attention',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      title: 'Total Spent',
      value: `$${(dashboardData.totalSpent / 1000).toFixed(0)}k`,
      change: 'Project investment',
      changeType: 'neutral',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Upcoming Milestones',
      value: dashboardData.upcomingMilestones,
      change: 'This month',
      changeType: 'attention',
      icon: Clock,
      color: 'blue'
    }
  ];

  const activeProjects = [
    {
      id: 1,
      name: 'E-commerce Website',
      progress: 75,
      status: 'on-track',
      deadline: '2024-02-15',
      team: 'EurosHub Team A',
      budget: 45000,
      spent: 33750,
      projectManager: 'Sarah Wilson'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      progress: 60,
      status: 'on-track',
      deadline: '2024-03-28',
      team: 'EurosHub Team B',
      budget: 65000,
      spent: 39000,
      projectManager: 'Mike Chen'
    },
    {
      id: 3,
      name: 'CRM System Integration',
      progress: 40,
      status: 'delayed',
      deadline: '2024-02-28',
      team: 'EurosHub Team C',
      budget: 35000,
      spent: 14000,
      projectManager: 'Alex Johnson'
    }
  ];

  const assignedTeams = [
    { projectManager: 'Sarah Wilson', team: 'Team A', project: 'E-commerce Website', members: 4 },
    { projectManager: 'Mike Chen', team: 'Team B', project: 'Mobile App Development', members: 6 },
    { projectManager: 'Alex Johnson', team: 'Team C', project: 'CRM System Integration', members: 3 }
  ];

  const recentUpdates = [
    {
      id: 1,
      project: 'E-commerce Website',
      message: 'Homepage design completed and approved',
      time: '2 hours ago',
      type: 'success',
      from: 'Sarah Wilson'
    },
    {
      id: 2,
      project: 'Mobile App',
      message: 'Beta version ready for testing',
      time: '4 hours ago',
      type: 'info',
      from: 'Mike Chen'
    },
    {
      id: 3,
      project: 'CRM Integration',
      message: 'Delay due to API changes, new timeline provided',
      time: '6 hours ago',
      type: 'warning',
      from: 'Alex Johnson'
    },
    {
      id: 4,
      project: 'E-commerce Website',
      message: 'Payment gateway integration completed',
      time: '1 day ago',
      type: 'success',
      from: 'Sarah Wilson'
    }
  ];

  const upcomingMilestones = [
    { id: 1, milestone: 'Homepage Go-Live', project: 'E-commerce Website', due: 'Tomorrow', status: 'on-track' },
    { id: 2, milestone: 'Beta Release', project: 'Mobile App', due: 'Friday', status: 'on-track' },
    { id: 3, milestone: 'Client Review Meeting', project: 'CRM Integration', due: 'Next Week', status: 'delayed' },
    { id: 4, milestone: 'Final Testing Phase', project: 'E-commerce Website', due: 'Feb 10', status: 'upcoming' }
  ];

  const invoicesSummary = [
    { id: 1, project: 'E-commerce Website', amount: 15000, status: 'paid', date: '2024-01-05' },
    { id: 2, project: 'Mobile App Development', amount: 25000, status: 'pending', date: '2024-01-10' },
    { id: 3, project: 'CRM Integration', amount: 8000, status: 'paid', date: '2023-12-28' }
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
          title={`${user?.name || 'Client'} Dashboard`}
          breadcrumbs={['Dashboard', 'Client']}
        />
        
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || 'Client'}!</h1>
            <p className="text-gray-600">Track your project progress and communicate with our development teams</p>
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
            {/* Active Projects */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Projects</h3>
              <div className="space-y-4">
                {activeProjects.slice(0, 4).map((project) => (
                  <div key={project.id} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'on-track' ? 'bg-green-100 text-green-800' : 
                        project.status === 'delayed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            project.status === 'on-track' ? 'bg-green-500' : 
                            project.status === 'delayed' ? 'bg-red-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Team: {project.team}</span>
                      <span>PM: {project.projectManager}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Budget: ${project.budget.toLocaleString()}</span>
                      <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Teams */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">EurosHub Teams Assigned</h3>
              <div className="space-y-3">
                {assignedTeams.map((team, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {team.team.split(' ')[1]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{team.projectManager}</p>
                        <p className="text-sm text-gray-600">Project Manager - {team.team}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{team.members} members</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Updates */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
              <div className="space-y-4">
                {recentUpdates.map((update) => (
                  <div key={update.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      update.type === 'success' ? 'bg-green-500' :
                      update.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{update.project}</p>
                      <p className="text-sm text-gray-600">{update.message}</p>
                      <p className="text-xs text-gray-500">{update.time} - {update.from}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Milestones */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Milestones</h3>
              <div className="space-y-3">
                {upcomingMilestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{milestone.milestone}</p>
                      <p className="text-xs text-gray-600">{milestone.project}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        milestone.status === 'on-track' ? 'bg-green-100 text-green-800' : 
                        milestone.status === 'delayed' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {milestone.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{milestone.due}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Billing & Invoices Section */}
          <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {invoicesSummary.map((invoice) => (
                <div key={invoice.id} className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{invoice.project}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    ${invoice.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(invoice.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions for Clients */}
          <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">Message Team</span>
              </button>
              <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <FileText className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-900">View Reports</span>
              </button>
              <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <DollarSign className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-900">Billing History</span>
              </button>
              <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <Calendar className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-gray-900">Schedule Meeting</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}