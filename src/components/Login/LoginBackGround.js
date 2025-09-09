'use client';

import React, { memo } from 'react';

const OptimizedBackground = memo(() => {
  return (
    <div className="fixed inset-0 z-0 bg-slate-900 overflow-hidden">
      {/* Optimized gradient overlay instead of heavy animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Static decorative elements for performance */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl" />
      <div className="absolute top-1/4 right-20 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-400/5 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-slate-700/10 rounded-full blur-3xl" />
      
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse" 
             style={{ animationDuration: '4s' }} />
      </div>
      
      {/* Grid pattern overlay for texture */}
      <div className="absolute inset-0 opacity-[0.02]"
           style={{
             backgroundImage: `
               linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px'
           }} />
    </div>
  );
});

OptimizedBackground.displayName = 'OptimizedBackground';

export default OptimizedBackground;