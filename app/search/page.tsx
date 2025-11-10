'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Search, ArrowLeft, FileSearch } from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import ProjectCard from '@/components/ProjectCard';
import AnimatedIcon from '@/components/AnimatedIcon';

export default function SearchPage() {
  const router = useRouter();
  const { tasks, projects, initialize } = useStore();

  useEffect(() => {
    initialize();
  }, [initialize]);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'tasks' | 'projects'>('all');

  const filteredTasks = query
    ? tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query.toLowerCase()) ||
          task.description?.toLowerCase().includes(query.toLowerCase()) ||
          task.projectName?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredProjects = query
    ? projects.filter(
        (project) =>
          project.name.toLowerCase().includes(query.toLowerCase()) ||
          project.description?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()}>
            <ArrowLeft className="text-gray-700" size={24} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <AnimatedIcon icon={FileSearch} size={32} color="#5f33e1" />
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks and projects..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1]"
              autoFocus
            />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-2 px-4 font-semibold ${
              activeTab === 'all'
                ? 'text-[#5f33e1] border-b-2 border-[#5f33e1]'
                : 'text-gray-600'
            }`}
          >
            All ({filteredTasks.length + filteredProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`pb-2 px-4 font-semibold ${
              activeTab === 'tasks'
                ? 'text-[#5f33e1] border-b-2 border-[#5f33e1]'
                : 'text-gray-600'
            }`}
          >
            Tasks ({filteredTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-2 px-4 font-semibold ${
              activeTab === 'projects'
                ? 'text-[#5f33e1] border-b-2 border-[#5f33e1]'
                : 'text-gray-600'
            }`}
          >
            Projects ({filteredProjects.length})
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4 mb-20">
          {!query ? (
            <div className="text-center py-12">
              <AnimatedIcon icon={FileSearch} size={80} color="#5f33e1" />
              <p className="text-gray-500 mt-6">Start typing to search...</p>
            </div>
          ) : (
            <>
              {(activeTab === 'all' || activeTab === 'tasks') && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Tasks</h3>
                  {filteredTasks.length > 0 ? (
                    <div className="space-y-3">
                      {filteredTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <AnimatedIcon icon={FileSearch} size={64} color="#5f33e1" />
                      <p className="text-gray-500 text-sm mt-4">No tasks found</p>
                    </div>
                  )}
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'projects') && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Projects</h3>
                  {filteredProjects.length > 0 ? (
                    <div className="space-y-4">
                      {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <AnimatedIcon icon={FileSearch} size={64} color="#5f33e1" />
                      <p className="text-gray-500 text-sm mt-4">No projects found</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

