// Performance utilities for optimized loading states

// Debounce function for search inputs and frequent operations
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

// Throttle function for scroll events and frequent updates
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Optimized loading state manager
export class LoadingManager {
  constructor() {
    this.loadingStates = new Map();
    this.listeners = new Set();
  }

  setLoading(key, isLoading) {
    this.loadingStates.set(key, isLoading);
    this.notifyListeners();
  }

  isLoading(key) {
    return this.loadingStates.get(key) || false;
  }

  isAnyLoading() {
    return Array.from(this.loadingStates.values()).some(Boolean);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  clear(key) {
    this.loadingStates.delete(key);
    this.notifyListeners();
  }

  clearAll() {
    this.loadingStates.clear();
    this.notifyListeners();
  }
}

// Global loading manager instance
export const globalLoadingManager = new LoadingManager();

// Loading delays for better UX
export const LOADING_DELAYS = {
  IMMEDIATE: 0,
  SHORT: 150,
  MEDIUM: 300,
  LONG: 500
};

// Optimize animation performance
export const useOptimizedAnimation = () => {
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return {
    shouldAnimate: !prefersReducedMotion,
    getAnimationClass: (animationClass) => prefersReducedMotion ? '' : animationClass,
    getDuration: (duration) => prefersReducedMotion ? '0s' : duration
  };
};

// Lazy loading helper for components
export const createLazyLoader = (importFunc, fallback = null) => {
  return React.lazy(async () => {
    // Add minimum delay to prevent flash
    const [component] = await Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, 100))
    ]);
    return component;
  });
};