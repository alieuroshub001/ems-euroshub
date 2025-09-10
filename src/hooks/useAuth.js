'use client';

import { useState, useEffect } from 'react';
import { authAPI, userAPI } from '@/utils/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if user is authenticated
        if (!authAPI.isAuthenticated()) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Try to get user from localStorage first (faster)
        const storedUser = authAPI.getCurrentUser();
        if (storedUser) {
          setUser(storedUser);
        }

        // Fetch fresh user data from API
        const response = await userAPI.getProfile();
        if (response.user) {
          setUser(response.user);
          // Update stored user data
          const token = localStorage.getItem('authToken');
          if (token) {
            authAPI.storeAuthData(token, response.user);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
        
        // If API call fails, try to use stored user data
        const storedUser = authAPI.getCurrentUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    const token = localStorage.getItem('authToken');
    if (token) {
      authAPI.storeAuthData(token, userData);
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    window.location.href = '/login';
  };

  return {
    user,
    isLoading,
    error,
    updateUser,
    logout,
    isAuthenticated: !!user
  };
};