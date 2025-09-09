'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [navIsOpened, setNavIsOpened] = useState(false);
  
  const closeNavbar = () => {
    setNavIsOpened(false);
  };
  
  const toggleNavbar = () => {
    setNavIsOpened(navIsOpened => !navIsOpened);
  };

  return (
    <>
      {/* Mobile overlay */}
      <div 
        aria-hidden={true} 
        onClick={() => {
          closeNavbar();
        }} 
        className={`fixed bg-slate-900/60 backdrop-blur-sm inset-0 z-30 ${navIsOpened ? "md:hidden" : "hidden md:hidden"}`} 
      />
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Company Name */}
            <div className="flex items-center space-x-3 min-w-max">
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/assets/logo.png"
                  alt="EurosHub Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-cyan-400 font-bold text-lg">EH</div>';
                  }}
                />
                <div className="text-white">
                  <h1 className="text-xl font-bold tracking-tight">EurosHub</h1>
                  <p className="text-xs text-white/60 font-medium">Office Management</p>
                </div>
              </Link>
            </div>

            {/* Navigation Menu */}
            <div className={`
              absolute top-full left-0 bg-transparent backdrop-blur-md md:bg-transparent border-b border-white/20 md:border-none py-8 md:py-0 px-4 sm:px-6 lg:px-8 md:px-0 w-full md:top-0 md:relative md:w-max md:flex md:transition-none duration-300 ease-linear
              ${navIsOpened ? "visible opacity-100 translate-y-0" : "translate-y-10 opacity-0 invisible md:visible md:translate-y-0 md:opacity-100"}
            `}>
              {/* Navigation Links */}
              <ul className="flex flex-col md:flex-row gap-6 md:items-center text-white/80 md:w-full md:justify-center">
                <li>
                  <a 
                    href="#features" 
                    onClick={closeNavbar}
                    className="relative py-2.5 duration-300 ease-linear hover:text-white after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-cyan-400 text-sm font-medium"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    onClick={closeNavbar}
                    className="relative py-2.5 duration-300 ease-linear hover:text-white after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-cyan-400 text-sm font-medium"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    onClick={closeNavbar}
                    className="relative py-2.5 duration-300 ease-linear hover:text-white after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-cyan-400 text-sm font-medium"
                  >
                    Contact
                  </a>
                </li>
              </ul>
              
              {/* Login Button in Mobile Menu */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:min-w-max mt-10 md:mt-0 md:ml-6">
                <Link
                  href="/login"
                  onClick={closeNavbar}
                  className="relative flex justify-center items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                  style={{
                    backgroundColor: '#0fb8af',
                    boxShadow: '0 4px 6px -1px rgba(15, 184, 175, 0.2), 0 2px 4px -1px rgba(15, 184, 175, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0ca8a0';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(15, 184, 175, 0.3), 0 4px 6px -2px rgba(15, 184, 175, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#0fb8af';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(15, 184, 175, 0.2), 0 2px 4px -1px rgba(15, 184, 175, 0.1)';
                  }}
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
                    />
                  </svg>
                  <span>Login</span>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => {
                  toggleNavbar();
                }} 
                aria-label='toggle navbar' 
                className="outline-none border-l border-l-white/20 pl-3 relative py-3"
              >
                <span aria-hidden={true} className={`
                  flex h-0.5 w-6 rounded bg-white transition duration-300
                  ${navIsOpened ? "rotate-45 translate-y-[.324rem]" : ""}
                `}>
                </span>
                <span aria-hidden={true} className={`
                  mt-2 flex h-0.5 w-6 rounded bg-white transition duration-300
                  ${navIsOpened ? "-rotate-45 -translate-y-[.324rem]" : ""}
                `} />
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}