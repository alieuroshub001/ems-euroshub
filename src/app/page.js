'use client';

import Header from '@/components/LandingPage/Header/Header';
import Footer from '@/components/LandingPage/Footer/Footer';
import Hero from '@/components/LandingPage/Hero/Hero';
import Features from '@/components/LandingPage/Features/Features';
import Expertise from '@/components/LandingPage/Expertise/Expertise';
import Contact from '@/components/LandingPage/Contact/Contact';
import { Boxes } from '@/components/ui/background-boxes';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Full-screen background boxes */}
      <div className="fixed inset-0 z-0">
        <Boxes />
      </div>
      
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