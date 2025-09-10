'use client';

import { useState, useEffect } from 'react';
import { Users, UserPlus, Search, Filter, MoreVertical, Edit, Trash2, Eye, RefreshCw } from 'lucide-react';
import { userAPI } from '@/utils/api';

export default function UserManagement({ userRole = 'superadmin' }) {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Define which roles each user type can create
  const getRolesForUser = (userRole) => {
    if (userRole === 'superadmin') {
      return ['SuperAdmin', 'Admin', 'Employee', 'HR', 'Client'];
    } else if (userRole === 'admin') {
      return ['Employee', 'HR', 'Client'];
    }
    return [];
  };

  // Available departments from User model
  const availableDepartments = [
    'Development',
    'Graphic Designing', 
    'Virtual Assistant',
    'Internee',
    'Digital Marketing',
    'Content Writing',
    'SEO',
    'Finance',
    'HR',
    'Sales and Marketing',
    'Other'
  ];

  const availableRoles = getRolesForUser(userRole);

  // Fetch users from backend
  const fetchUsers = async () => {
    setIsLoading(true);
    setFetchError(null);
    
    try {
      const data = await userAPI.getAllUsers();
      setUsers(data.users || []);
    } catch (error) {
      console.warn('Error fetching users, using sample data:', error.message);
      setSampleData();
      setFetchError('Unable to fetch users from server. Showing sample data.');
    } finally {
      setIsLoading(false);
    }
  };

  // Set sample data when API is not available
  const setSampleData = () => {
    const sampleUsers = [
      {
        _id: '507f1f77bcf86cd799439011',
        employee_id: 'EMP001',
        name: 'John Doe',
        email: 'john@euroshub.com',
        role: 'Admin',
        dapartment: 'Development',
        position: 'System Administrator',
        joining_date: '2024-01-15',
        contact: '+1-555-0101',
        gender: 'Male',
        leave_balance: 25,
        createdAt: '2024-01-15T00:00:00.000Z',
        updatedAt: '2024-01-15T00:00:00.000Z'
      },
      {
        _id: '507f1f77bcf86cd799439012',
        employee_id: 'EMP002',
        name: 'Jane Smith',
        email: 'jane@euroshub.com',
        role: 'HR',
        dapartment: 'HR',
        position: 'HR Manager',
        joining_date: '2024-02-01',
        contact: '+1-555-0102',
        gender: 'Female',
        leave_balance: 20,
        createdAt: '2024-02-01T00:00:00.000Z',
        updatedAt: '2024-02-01T00:00:00.000Z'
      },
      {
        _id: '507f1f77bcf86cd799439013',
        employee_id: 'EMP003',
        name: 'Mike Johnson',
        email: 'mike@euroshub.com',
        role: 'Employee',
        dapartment: 'Graphic Designing',
        position: 'Senior Designer',
        joining_date: '2024-01-20',
        contact: '+1-555-0103',
        gender: 'Male',
        leave_balance: 18,
        createdAt: '2024-01-20T00:00:00.000Z',
        updatedAt: '2024-01-20T00:00:00.000Z'
      }
    ];
    setUsers(sampleUsers);
  };

  // Load users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle user actions
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = async () => {
    try {
      await userAPI.deleteUser(selectedUser._id);
      setUsers(users.filter(user => user._id !== selectedUser._id));
      setShowDeleteModal(false);
      setSelectedUser(null);
      alert('User deleted successfully!');
    } catch (error) {
      alert('Failed to delete user: ' + error.message);
    }
  };

  const handleUpdateUser = async (updatedUserData) => {
    try {
      console.log('Updating user:', selectedUser._id, updatedUserData);
      await userAPI.updateUser(selectedUser._id, updatedUserData);
      // Refresh the users list
      fetchUsers();
      setShowEditModal(false);
      setSelectedUser(null);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update user: ' + error.message);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.employee_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-gray-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
              <p className="text-sm text-gray-600">
                Manage users and their permissions
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('create')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-3 border-b border-gray-200">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('list')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'list'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            User List
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`pb-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'create'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Create User
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'list' && (
          <UserList
            users={filteredUsers}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterRole={filterRole}
            setFilterRole={setFilterRole}
            availableRoles={availableRoles}
            userRole={userRole}
            isLoading={isLoading}
            fetchError={fetchError}
            onRefresh={fetchUsers}
            onViewUser={handleViewUser}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        )}

        {activeTab === 'create' && (
          <CreateUser
            availableRoles={availableRoles}
            availableDepartments={availableDepartments}
            userRole={userRole}
            onBack={() => setActiveTab('list')}
            onUserCreated={() => {
              fetchUsers();
              setActiveTab('list');
            }}
          />
        )}
      </div>

      {/* Modals */}
      {showViewModal && selectedUser && (
        <ViewUserModal
          user={selectedUser}
          onClose={() => {
            setShowViewModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          availableRoles={availableRoles}
          availableDepartments={availableDepartments}
          userRole={userRole}
          onSave={handleUpdateUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showDeleteModal && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onConfirm={confirmDeleteUser}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

// User List Component
function UserList({ users, searchTerm, setSearchTerm, filterRole, setFilterRole, availableRoles, userRole, isLoading, fetchError, onRefresh, onViewUser, onEditUser, onDeleteUser }) {
  return (
    <div className="space-y-4">
      {/* Error Message */}
      {fetchError && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <RefreshCw className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-800">{fetchError}</p>
              <p className="text-sm text-yellow-700">Showing sample data for demonstration.</p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              {['SuperAdmin', 'Admin', 'Employee', 'HR', 'Client'].map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className={`flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors ${
              isLoading 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <div className="text-sm text-gray-600">
            {users.length} user{users.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <RefreshCw className="h-6 w-6 text-blue-600 animate-spin" />
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      )}

      {/* Users Table */}
      {!isLoading && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joining Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id || user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="text-xs text-gray-400">{user.employee_id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.dapartment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(user.joining_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onViewUser(user)}
                      className="text-blue-600 hover:text-blue-900"
                      title="View User"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onEditUser(user)}
                      className="text-green-600 hover:text-green-900"
                      title="Edit User"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onDeleteUser(user)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete User"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      {!isLoading && users.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No users found</p>
        </div>
      )}
    </div>
  );
}

// Create User Component
function CreateUser({ availableRoles, availableDepartments, userRole, onBack, onUserCreated }) {
  const [formData, setFormData] = useState({
    employee_id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    role: '',
    contact: '',
    dapartment: '',
    position: '',
    joining_date: new Date().toISOString().split('T')[0],
    leave_balance: 20
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employee_id.trim()) newErrors.employee_id = 'Employee ID is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact is required';
    if (!formData.dapartment.trim()) newErrors.dapartment = 'Department is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.joining_date) newErrors.joining_date = 'Joining date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Remove confirmPassword from the data to be sent
      const { confirmPassword, ...userData } = formData;
      
      const response = await fetch('http://localhost:5786/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('User created successfully!');
        // Reset form
        setFormData({
          employee_id: '',
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          gender: '',
          role: '',
          contact: '',
          dapartment: '',
          position: '',
          joining_date: new Date().toISOString().split('T')[0],
          leave_balance: 20
        });
        // Call onUserCreated to refresh the list and go back
        onUserCreated();
      } else {
        alert(result.message || 'Failed to create user');
      }
    } catch (error) {
      alert('Error creating user: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          ← Back to User List
        </button>
        <h3 className="text-lg font-semibold text-gray-900 mt-2">Create New User</h3>
        <p className="text-sm text-gray-600">
          {userRole === 'superadmin' ? 'Create users with any role' : 'Create users (excluding Admin role)'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee ID *
            </label>
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.employee_id ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., EMP001"
            />
            {errors.employee_id && (
              <p className="mt-1 text-sm text-red-600">{errors.employee_id}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="user@euroshub.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact *
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.contact ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Phone number"
            />
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.gender ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role *
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.role ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select Role</option>
              {availableRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <select
              name="dapartment"
              value={formData.dapartment}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.dapartment ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select Department</option>
              {availableDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.dapartment && (
              <p className="mt-1 text-sm text-red-600">{errors.dapartment}</p>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position *
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.position ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Job position"
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position}</p>
            )}
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Joining Date *
            </label>
            <input
              type="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.joining_date ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.joining_date && (
              <p className="mt-1 text-sm text-red-600">{errors.joining_date}</p>
            )}
          </div>

          {/* Leave Balance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leave Balance
            </label>
            <input
              type="number"
              name="leave_balance"
              value={formData.leave_balance}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              min="0"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Minimum 6 characters"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg text-white transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Creating User...' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
}

// View User Modal Component
function ViewUserModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{user.employee_id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{user.contact}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{user.gender}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {user.role}
              </span>
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{user.dapartment}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{user.position}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
              {new Date(user.joining_date).toLocaleDateString()}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Leave Balance</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{user.leave_balance} days</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
              {new Date(user.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
              {new Date(user.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Delete User Modal Component
function DeleteUserModal({ user, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <Trash2 className="w-6 h-6 text-red-600" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          Delete User
        </h3>
        
        <p className="text-sm text-gray-600 text-center mb-6">
          Are you sure you want to delete <strong>{user.name}</strong>? This action cannot be undone.
        </p>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Edit User Modal Component
function EditUserModal({ user, availableRoles, availableDepartments, userRole, onSave, onClose }) {
  const [formData, setFormData] = useState({
    employee_id: user.employee_id || '',
    name: user.name || '',
    email: user.email || '',
    gender: user.gender || '',
    role: user.role || '',
    contact: user.contact || '',
    dapartment: user.dapartment || '',
    position: user.position || '',
    joining_date: user.joining_date ? new Date(user.joining_date).toISOString().split('T')[0] : '',
    leave_balance: user.leave_balance || 20
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employee_id.trim()) newErrors.employee_id = 'Employee ID is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact is required';
    if (!formData.dapartment.trim()) newErrors.dapartment = 'Department is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.joining_date) newErrors.joining_date = 'Joining date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Edit User</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID *
              </label>
              <input
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  errors.employee_id ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.employee_id && (
                <p className="mt-1 text-sm text-red-600">{errors.employee_id}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact *
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  errors.contact ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.contact && (
                <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  errors.gender ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  errors.role ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select Role</option>
                {availableRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <select
                name="dapartment"
                value={formData.dapartment}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  errors.dapartment ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select Department</option>
                {availableDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.dapartment && (
                <p className="mt-1 text-sm text-red-600">{errors.dapartment}</p>
              )}
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position *
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  errors.position ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.position && (
                <p className="mt-1 text-sm text-red-600">{errors.position}</p>
              )}
            </div>

            {/* Joining Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Joining Date *
              </label>
              <input
                type="date"
                name="joining_date"
                value={formData.joining_date}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  errors.joining_date ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.joining_date && (
                <p className="mt-1 text-sm text-red-600">{errors.joining_date}</p>
              )}
            </div>

            {/* Leave Balance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leave Balance
              </label>
              <input
                type="number"
                name="leave_balance"
                value={formData.leave_balance}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg text-white transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Updating...' : 'Update User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}