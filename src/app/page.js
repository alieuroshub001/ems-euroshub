'use client';

import Header from '@/components/LandingPage/Header/Header';
import Footer from '@/components/LandingPage/Footer/Footer';
import Hero from '@/components/LandingPage/Hero/Hero';
import Features from '@/components/LandingPage/Features/Features';
import Expertise from '@/components/LandingPage/Expertise/Expertise';
import Contact from '@/components/LandingPage/Contact/Contact';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Simple gradient background - no performance impact */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-800/30" />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative z-10 pt-16 pointer-events-none">
        <Hero />
        <Features />
        <Expertise />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}