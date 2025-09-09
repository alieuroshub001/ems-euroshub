'use client';

import React from 'react';
import { Users, Zap, Globe, Headphones, Lightbulb, Shield, TrendingUp, Rocket } from 'lucide-react';

const Expertise = () => {
  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "99.9%", label: "Uptime", icon: Zap },
    { number: "50+", label: "Countries", icon: Globe },
    { number: "24/7", label: "Support", icon: Headphones }
  ];

  const values = [
    {
      title: "Innovation",
      description: "Cutting-edge technology solutions for modern businesses",
      icon: Lightbulb
    },
    {
      title: "Reliability", 
      description: "Robust infrastructure ensuring consistent performance",
      icon: Shield
    },
    {
      title: "Growth",
      description: "Scalable solutions that grow with your business", 
      icon: TrendingUp
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            About EurosHub
          </h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            We are dedicated to revolutionizing office management with cutting-edge technology. 
            Our platform empowers businesses to streamline operations, enhance productivity, 
            and foster collaboration across all departments.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-cyan-400 mb-2 mx-auto" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Our Core Values
            </h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">{value.title}</h4>
                    <p className="text-white/70 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 lg:p-12">
            <Rocket className="w-10 h-10 text-cyan-400 mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              To transform how businesses operate by providing intuitive, powerful, and scalable 
              office management solutions that drive efficiency and innovation.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Efficiency", "Innovation", "Collaboration", "Growth"].map((tag, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/80 border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl border border-cyan-500/20 p-8 lg:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Join Thousands of Happy Users?
            </h3>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Experience the difference our platform can make for your business operations.
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
                Get Started Today
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;