'use client';

import { Laptop, PenTool } from 'lucide-react';
import AnimatedIcon from './AnimatedIcon';

interface TodayCardProps {
  completed: number;
  total: number;
}

export default function TodayCard({ completed, total }: TodayCardProps) {
  return (
    <div
      className="rounded-3xl p-6 text-white shadow-lg relative overflow-hidden w-full"
      style={{ backgroundColor: '#5f33e1' }}
    >
      <div className="relative z-10">
        <p className="text-sm opacity-90 mb-1">Today</p>
        <p className="text-3xl font-bold">
          {completed}/{total} tasks
        </p>
      </div>
      {/* Animated Illustration */}
      <div className="absolute right-0 bottom-0 opacity-20 overflow-hidden">
        <div className="relative">
          <Laptop className="absolute right-2 bottom-2 opacity-70" size={50} style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' }} />
          <PenTool className="absolute right-6 bottom-6 opacity-80" size={32} style={{ color: '#f778ba', filter: 'drop-shadow(0 2px 4px rgba(247, 120, 186, 0.3))' }} />
        </div>
      </div>
      {/* Decorative circles with animation */}
      <div className="absolute right-4 top-2 opacity-20 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-white"></div>
      </div>
      <div className="absolute right-8 bottom-4 opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }}>
        <div className="w-16 h-16 rounded-full bg-white"></div>
      </div>
    </div>
  );
}


