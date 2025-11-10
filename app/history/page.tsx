'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import TaskCard from '@/components/TaskCard';
import { format } from 'date-fns';
import AnimatedIcon from '@/components/AnimatedIcon';
import { Clock, CheckCircle2 } from 'lucide-react';

export default function HistoryPage() {
  const { tasks, initialize } = useStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const completedTasks = tasks
    .filter((t) => t.status === 'done' && !t.archived)
    .sort((a, b) => {
      const dateA = a.updatedAt || a.createdAt;
      const dateB = b.updatedAt || b.createdAt;
      return dateB.getTime() - dateA.getTime();
    });

  const groupedTasks = completedTasks.reduce((acc, task) => {
    const date = format(task.updatedAt || task.createdAt, 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {} as Record<string, typeof completedTasks>);

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        <div className="flex items-center gap-3 mb-6">
          <AnimatedIcon icon={Clock} size={36} color="#5f33e1" />
          <h1 className="text-3xl font-bold text-gray-800">History</h1>
        </div>

        {Object.keys(groupedTasks).length === 0 ? (
          <div className="text-center py-12">
            <AnimatedIcon icon={CheckCircle2} size={80} color="#4ade80" />
            <p className="text-gray-500 mt-6">No completed tasks yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTasks).map(([date, tasks]) => (
              <div key={date}>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">
                  {format(new Date(date), 'MMMM dd, yyyy')}
                </h2>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="opacity-75">
                      <TaskCard task={task} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

