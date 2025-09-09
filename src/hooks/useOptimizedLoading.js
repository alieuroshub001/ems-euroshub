'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { LOADING_DELAYS } from '@/utils/performance';

// Optimized loading hook with debouncing and delay management
export const useOptimizedLoading = (initialState = false, delay = LOADING_DELAYS.SHORT) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [showLoader, setShowLoader] = useState(initialState);
  const timeoutRef = useRef(null);
  const loadingStartTime = useRef(null);

  const startLoading = useCallback(() => {
    loadingStartTime.current = Date.now();
    setIsLoading(true);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Show loader after delay to prevent flash for quick operations
    timeoutRef.current = setTimeout(() => {
      setShowLoader(true);
    }, delay);
  }, [delay]);

  const stopLoading = useCallback((minLoadingTime = 200) => {
    setIsLoading(false);
    
    const elapsedTime = Date.now() - (loadingStartTime.current || 0);
    const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
    
    // Clear the show loader timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Hide loader with minimum loading time for better UX
    timeoutRef.current = setTimeout(() => {
      setShowLoader(false);
    }, remainingTime);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isLoading,
    showLoader,
    startLoading,
    stopLoading,
    toggle: useCallback(() => {
      if (isLoading) {
        stopLoading();
      } else {
        startLoading();
      }
    }, [isLoading, startLoading, stopLoading])
  };
};

// Hook for async operations with optimized loading
export const useAsyncOperation = (operation, dependencies = []) => {
  const { isLoading, showLoader, startLoading, stopLoading } = useOptimizedLoading();
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      startLoading();
      setError(null);
      const result = await operation(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      stopLoading();
    }
  }, [operation, startLoading, stopLoading, ...dependencies]);

  const reset = useCallback(() => {
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    reset,
    isLoading,
    showLoader,
    error,
    data
  };
};

// Hook for form submissions with loading optimization
export const useOptimizedForm = (onSubmit) => {
  const { isLoading, showLoader, startLoading, stopLoading } = useOptimizedLoading();
  const [errors, setErrors] = useState({});

  const handleSubmit = useCallback(async (formData) => {
    try {
      startLoading();
      setErrors({});
      const result = await onSubmit(formData);
      return result;
    } catch (error) {
      if (error.validationErrors) {
        setErrors(error.validationErrors);
      }
      throw error;
    } finally {
      stopLoading();
    }
  }, [onSubmit, startLoading, stopLoading]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    handleSubmit,
    isLoading,
    showLoader,
    errors,
    clearErrors,
    setFieldError: useCallback((field, error) => {
      setErrors(prev => ({ ...prev, [field]: error }));
    }, [])
  };
};