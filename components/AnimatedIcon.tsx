'use client';

import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
}

export default function AnimatedIcon({ 
  icon: Icon, 
  size = 48, 
  color = '#8b5cf6',
  className = '' 
}: AnimatedIconProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Background circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="absolute rounded-full opacity-20 animate-pulse"
          style={{
            width: size * 1.5,
            height: size * 1.5,
            backgroundColor: color,
            animation: 'pulse 3s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute rounded-full opacity-10 animate-pulse"
          style={{
            width: size * 2,
            height: size * 2,
            backgroundColor: color,
            animation: 'pulse 4s ease-in-out infinite',
            animationDelay: '0.5s',
          }}
        />
      </div>
      
      {/* Icon */}
      <div 
        className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        style={{
          filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.3))',
        }}
      >
        <Icon 
          size={size} 
          style={{ 
            color: color,
            opacity: 0.7,
            filter: 'drop-shadow(0 2px 4px rgba(139, 92, 246, 0.2))',
          }} 
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}

