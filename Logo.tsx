import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  // Size mapping
  const sizeMap = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className={`${sizeMap[size]} ${className}`}>
      <div className="relative w-full h-full">
        {/* Logo shape - stylized "P" for PipMate */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
          <span className="text-white font-bold text-2xl">P</span>
        </div>
        {/* Decorative element */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-white opacity-20 rounded-full"></div>
      </div>
    </div>
  );
}
