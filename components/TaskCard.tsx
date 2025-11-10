'use client';

import Link from 'next/link';
import { Task } from '@/types';
import { formatDate } from '@/lib/utils';
import AvatarGroup from './AvatarGroup';
import PriorityBadge from './PriorityBadge';
import { Calendar } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  variant?: 'default' | 'compact';
}

export default function TaskCard({ task, variant = 'default' }: TaskCardProps) {
  // Color dot based on project or status
  const getDotColor = () => {
    if (task.projectName === 'SuperApp') return '#4ade80';
    if (task.projectName === 'Internal') return '#3b82f6';
    if (task.status === 'in-progress') return '#f59e0b';
    if (task.status === 'done') return '#10b981';
    return '#6b7280';
  };

  return (
    <Link href={`/tasks/${task.id}`}>
      <div
        className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden ${
          variant === 'compact' ? 'min-w-[280px]' : ''
        }`}
      >
        {/* Decorative dot */}
        <div 
          className="absolute top-3 left-3 w-2 h-2 rounded-full"
          style={{ backgroundColor: getDotColor() }}
        />
        
        <div className="pl-4">
          {task.projectName && (
            <p className="text-sm text-gray-500 mb-1">{task.projectName}</p>
          )}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-800">{task.title}</h3>
            <PriorityBadge priority={task.priority || 'medium'} size="sm" />
          </div>
          {task.dueDate && (
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
              <Calendar size={14} />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
          {task.assignees.length > 0 && (
            <div className="flex items-center justify-between mt-3">
              <AvatarGroup users={task.assignees} size={28} />
              {task.estimatedHours && (
                <span className="text-sm text-gray-500">{task.estimatedHours} hours</span>
              )}
            </div>
          )}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 opacity-5">
          <div className="w-16 h-16 rounded-full bg-[#5f33e1] -mr-8 -mt-8"></div>
        </div>
      </div>
    </Link>
  );
}


