'use client';

import React from 'react';
import { Users, ClipboardCheck, BarChart3, FolderOpen, MessageSquare, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Team Management",
      description: "Efficiently manage your team with role-based access control and streamlined workflows",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Task Tracking",
      description: "Keep track of projects and deadlines with intuitive dashboards and real-time updates",
      icon: ClipboardCheck,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Analytics & Reports",
      description: "Get insights into your business performance with detailed analytics and custom reports",
      icon: BarChart3,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Document Management",
      description: "Organize and share documents securely with version control and collaboration tools",
      icon: FolderOpen,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Communication Hub",
      description: "Connect your team with integrated messaging, video calls, and notifications",
      icon: MessageSquare,
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      title: "Resource Planning",
      description: "Optimize resource allocation and scheduling with intelligent planning tools",
      icon: Zap,
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Everything you need to manage your office efficiently and boost productivity
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 text-center hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Icon with gradient background */}
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-white/70 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            style={{
              backgroundColor: '#0fb8af',
              boxShadow: '0 10px 15px -3px rgba(15, 184, 175, 0.3), 0 4px 6px -2px rgba(15, 184, 175, 0.15)',
            }}
          >
            Start Your Free Trial
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;