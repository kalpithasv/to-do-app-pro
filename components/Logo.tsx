'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export default function Logo({ size = 40, className = '', showText = false }: LogoProps) {
  const [logoSrc, setLogoSrc] = useState('/icon-512x512.png');

  useEffect(() => {
    // Try to find the logo file
    const checkLogo = async () => {
      const logos = [
        '/icon-512x512(1).png',
        '/icon-512x512.png',
        '/icon-192x192.png',
        '/logo.svg',
      ];
      
      for (const logo of logos) {
        try {
          const response = await fetch(logo, { method: 'HEAD' });
          if (response.ok) {
            setLogoSrc(logo);
            break;
          }
        } catch {
          continue;
        }
      }
    };
    
    checkLogo();
  }, []);

  if (logoSrc.endsWith('.svg')) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <img
          src={logoSrc}
          alt="To-Do Pro Logo"
          width={size}
          height={size}
          className="rounded-xl"
        />
        {showText && (
          <span className="font-bold text-gray-800 text-lg">To-Do Pro</span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src={logoSrc}
        alt="To-Do Pro Logo"
        width={size}
        height={size}
        className="rounded-xl"
        priority
      />
      {showText && (
        <span className="font-bold text-gray-800 text-lg">To-Do Pro</span>
      )}
    </div>
  );
}

