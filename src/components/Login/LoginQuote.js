
'use client';

import Image from 'next/image';

export default function LoginQuote() {
  return (
    <div className="relative max-w-lg text-center text-white p-4 sm:p-8">
      <div className="mb-8 sm:mb-12">
        <div className="relative">
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl p-4">
            <Image
              src="/assets/logo.png"
              alt="EurosHub Logo"
              width={120}
              height={120}
              className="object-contain w-24 h-24 sm:w-32 sm:h-32"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="text-cyan-400 font-bold text-2xl sm:text-3xl">EH</div>';
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6 sm:mb-8">
        <div className="relative">
          <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 text-4xl sm:text-6xl text-white/20 font-serif">&quot;</div>
          <blockquote className="text-lg sm:text-2xl lg:text-3xl font-light leading-relaxed tracking-wide px-4 sm:px-0">
            I have not failed. I&apos;ve just found 10,000 ways that won&apos;t work.
          </blockquote>
          <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 text-4xl sm:text-6xl text-white/20 font-serif rotate-180">&quot;</div>
        </div>
      </div>
      
      <div className="mb-8 sm:mb-12">
        <cite className="text-base sm:text-lg font-medium text-cyan-100 tracking-wider">
          Thomas A. Edison
        </cite>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mt-3"></div>
      </div>
    </div>
  );
}