'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import TaskCard from '@/components/TaskCard';
import { Archive, ArchiveRestore } from 'lucide-react';
import AnimatedIcon from '@/components/AnimatedIcon';

export default function ArchivePage() {
  const { tasks, initialize, unarchiveTask } = useStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const archivedTasks = tasks.filter((t) => t.archived);

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        <div className="flex items-center gap-3 mb-6">
          <AnimatedIcon icon={Archive} size={32} color="#5f33e1" />
          <h1 className="text-3xl font-bold text-gray-800">Archive</h1>
        </div>

        {archivedTasks.length === 0 ? (
          <div className="text-center py-12">
            <AnimatedIcon icon={Archive} size={80} color="#5f33e1" />
            <p className="text-gray-500 mb-2 mt-6">No archived tasks</p>
            <p className="text-sm text-gray-400">Tasks you archive will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {archivedTasks.map((task) => (
              <div key={task.id} className="relative">
                <div className="opacity-60">
                  <TaskCard task={task} />
                </div>
                <button
                  onClick={() => unarchiveTask(task.id)}
                  className="absolute top-4 right-4 p-2 bg-[#5f33e1] text-white rounded-xl hover:bg-[#4d2ac0] transition-colors shadow-lg"
                  title="Unarchive"
                >
                  <ArchiveRestore size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

