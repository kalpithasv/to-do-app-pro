'use client';

import Link from 'next/link';
import { Task } from '@/types';
import ProgressCircle from './ProgressCircle';
import AnimatedIcon from './AnimatedIcon';
import { Clock } from 'lucide-react';

interface ProgressTaskCardProps {
  task: Task;
}

export default function ProgressTaskCard({ task }: ProgressTaskCardProps) {
  const progress = task.progress || 0;

  return (
    <Link href={`/tasks/${task.id}`}>
      <div className="relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
        {/* Animated background icon */}
        <div className="absolute top-2 right-2 opacity-10">
          <AnimatedIcon icon={Clock} size={50} color="#f59e0b" />
        </div>
        <div className="relative z-10">
          {task.projectName && (
            <p className="text-sm text-gray-500 mb-1">{task.projectName}</p>
          )}
          <h3 className="font-semibold text-gray-800 mb-2">{task.title}</h3>
          {task.estimatedHours && (
            <p className="text-sm text-gray-500 mb-3">{task.estimatedHours} hours</p>
          )}
          <div className="flex items-center justify-end">
            <ProgressCircle progress={progress} size={50} strokeWidth={5} />
          </div>
        </div>
      </div>
    </Link>
  );
}


