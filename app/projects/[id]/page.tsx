'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus } from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import Badge from '@/components/Badge';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { tasks, projects, initialize } = useStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const projectId = params.id as string;
  const project = projects.find((p) => p.id === projectId);
  const projectTasks = tasks.filter((t) => t.projectId === projectId);

  const statusFilters = [
    { key: 'all', label: 'All', count: projectTasks.length },
    { key: 'todo', label: 'To do', count: projectTasks.filter((t) => t.status === 'todo').length },
    { key: 'in-progress', label: 'In progress', count: projectTasks.filter((t) => t.status === 'in-progress').length },
    { key: 'done', label: 'Done', count: projectTasks.filter((t) => t.status === 'done').length },
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTasks = activeFilter === 'all'
    ? projectTasks
    : projectTasks.filter((t) => t.status === activeFilter);

  if (!project) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl p-6">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()}>
            <ArrowLeft className="text-gray-700" size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeFilter === filter.key
                  ? 'bg-[#5f33e1] text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {filter.label} {filter.count}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="space-y-3 mb-20">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div key={task.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <TaskCard task={task} />
                {task.status === 'in-progress' && (
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 bg-yellow-400 text-white text-xs font-semibold rounded-full">
                      In Progress
                    </span>
                  </div>
                )}
                {task.status === 'done' && (
                  <div className="mt-2">
                    <button className="w-full px-4 py-2 bg-[#ebe4ff] text-[#5f33e1] rounded-xl font-semibold text-sm">
                      Done
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No tasks found
            </div>
          )}
        </div>

        {/* New Task Button */}
        <Link
          href={`/tasks/new?projectId=${projectId}`}
          className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-[calc(100%-3rem)] max-w-md"
        >
          <button className="w-full bg-[#5f33e1] text-white rounded-2xl py-4 px-6 font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-[#4d2ac0] transition-colors">
            <Plus size={20} />
            New task
          </button>
        </Link>
      </div>
    </div>
  );
}

