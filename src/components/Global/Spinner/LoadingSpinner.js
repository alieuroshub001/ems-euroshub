'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingSpinner({ isLoading = true, text = "Loading..." }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md">
      <style>{`
        @keyframes aurora-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes aurora-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes loading-progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .aurora-outer {
          background: conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4);
          animation: aurora-spin 3s linear infinite;
          filter: blur(2px);
        }
        .aurora-inner {
          background: conic-gradient(from 180deg, #0fb8af, #06b6d4, #3b82f6, #8b5cf6, #0fb8af);
          animation: aurora-reverse 2s linear infinite;
          filter: blur(1px);
        }
        .progress-bar {
          animation: loading-progress 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="text-center">
        {/* Aurora Spinner with Logo */}
        <div className="relative mb-8 mx-auto w-32 h-32">
          {/* Aurora Background */}
          <div className="absolute inset-0 w-32 h-32 rounded-full opacity-75 aurora-outer"></div>
          
          {/* Inner Aurora Ring */}
          <div className="absolute inset-2 rounded-full opacity-50 aurora-inner"></div>
          
          {/* Logo Container */}
          <div className="relative z-10 w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-800 shadow-2xl">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center border border-slate-600">
              <Image
                src="/assets/logo.png"
                alt="EurosHub Logo"
                width={48}
                height={48}
                className="object-contain animate-pulse"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="text-2xl font-bold text-cyan-400">EH</div>';
                }}
              />
            </div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-ping top-2 left-16" style={{animationDelay: '0s'}}></div>
            <div className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping top-6 right-6" style={{animationDelay: '0.2s'}}></div>
            <div className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-ping bottom-6 right-6" style={{animationDelay: '0.4s'}}></div>
            <div className="absolute w-2 h-2 bg-pink-400 rounded-full opacity-60 animate-ping bottom-2 left-16" style={{animationDelay: '0.6s'}}></div>
            <div className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-ping top-16 left-2" style={{animationDelay: '0.8s'}}></div>
            <div className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping top-16 right-2" style={{animationDelay: '1s'}}></div>
            <div className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-ping bottom-16 right-2" style={{animationDelay: '1.2s'}}></div>
            <div className="absolute w-2 h-2 bg-pink-400 rounded-full opacity-60 animate-ping bottom-16 left-2" style={{animationDelay: '1.4s'}}></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-white text-xl font-semibold mb-2">
          EurosHub Office Management
        </div>
        
        <div className="text-white/70 text-sm flex items-center justify-center mb-6">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{text}{dots}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full progress-bar"></div>
        </div>
      </div>
    </div>
  );
}

// Higher-order component for page transitions
export function withLoadingSpinner(Component, loadingText = "Loading...") {
  return function WrappedComponent(props) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        <LoadingSpinner isLoading={isLoading} text={loadingText} />
        {!isLoading && <Component {...props} />}
      </>
    );
  };
}