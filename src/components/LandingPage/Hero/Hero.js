'use client';

import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto pointer-events-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Modern Office
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600"> Management</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto">
          Streamline your business operations with our comprehensive office management solution. Built for modern teams to enhance productivity and collaboration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/login"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            style={{
              backgroundColor: '#0fb8af',
              boxShadow: '0 10px 15px -3px rgba(15, 184, 175, 0.3), 0 4px 6px -2px rgba(15, 184, 175, 0.15)',
            }}
          >
            Get Started
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;