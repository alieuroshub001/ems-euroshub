import LoginForm from '@/components/Login/LoginForm';
import LoginQuote from '@/components/Login/LoginQuote';
import OptimizedBackground from '@/components/Login/LoginBackGround';
import Link from 'next/link';

export const metadata = {
  title: 'Login - EurosHub Office Management',
  description: 'Sign in to your EurosHub Office Management account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-slate-900 flex">
      {/* Optimized background */}
      <OptimizedBackground />
      
      {/* Back Button - Top Left Corner */}
      <Link 
        href="/"
        className="absolute top-6 left-6 z-40 flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 pointer-events-auto group"
      >
        <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/15 transition-all duration-200">
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
        </div>
        <span className="text-sm font-medium hidden sm:inline">Back</span>
      </Link>
      
      {/* Content - with pointer-events-none on container */}
      <div className="absolute inset-0 z-30 w-full pointer-events-none">
        {/* Desktop Layout - Side by side */}
        <div className="hidden lg:flex min-h-screen w-full">
          {/* Quote Section - Desktop */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="pointer-events-auto">
              <LoginQuote />
            </div>
          </div>
          
          {/* Form Section - Desktop */}
          <div className="lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md pointer-events-auto">
              <LoginForm />
              
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-400">
                  Copyright 2025 EurosHub Office Management. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Layout - Scrollable */}
        <div className="lg:hidden w-full h-full overflow-y-auto">
          <div className="min-h-full flex flex-col items-center justify-start px-4 sm:px-6 py-20 pt-24">
            {/* Quote Section - Mobile */}
            <div className="pointer-events-auto mb-8 w-full flex justify-center">
              <LoginQuote />
            </div>
            
            {/* Form Section - Mobile */}
            <div className="w-full max-w-md pointer-events-auto">
              <LoginForm />
              
              <div className="mt-8 text-center pb-8">
                <p className="text-xs text-gray-400">
                  Copyright 2025 EurosHub Office Management. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}