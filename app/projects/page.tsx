'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import ProjectCard from '@/components/ProjectCard';
import { Search, Plus, Users, FolderKanban } from 'lucide-react';
import Link from 'next/link';
import AnimatedIcon from '@/components/AnimatedIcon';

export default function ProjectsPage() {
  const { projects, tasks, initialize } = useStore();
  const [sortBy] = useState<'name' | 'progress' | 'date'>('name');

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Calculate stats
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.completedTasks < p.totalTasks).length;
  const completedProjects = projects.filter(p => p.completedTasks === p.totalTasks && p.totalTasks > 0).length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;

  // Sort projects
  const sortedProjects = [...projects].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'progress') {
      const progressA = a.totalTasks > 0 ? (a.completedTasks / a.totalTasks) : 0;
      const progressB = b.totalTasks > 0 ? (b.completedTasks / b.totalTasks) : 0;
      return progressB - progressA;
    } else {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
          <Link href="/search">
            <Search className="text-gray-700" size={24} />
          </Link>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="relative bg-[#5f33e1] rounded-2xl p-4 text-white shadow-lg overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20">
              <AnimatedIcon icon={FolderKanban} size={48} color="#ffffff" />
            </div>
            <p className="text-4xl font-bold relative z-10">{activeProjects}</p>
          </div>
          <div className="relative bg-[#f778ba] rounded-2xl p-4 text-white shadow-lg overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20">
              <AnimatedIcon icon={Users} size={48} color="#ffffff" />
            </div>
            <p className="text-4xl font-bold relative z-10">{totalProjects}</p>
          </div>
        </div>

        {/* Tasks Summary Card */}
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Tasks</p>
              <p className="text-lg font-bold text-gray-800">{completedTasks}/{totalTasks}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Completed</p>
              <p className="text-lg font-bold text-gray-800">{completedProjects}</p>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6 pb-4">
          {sortedProjects.length > 0 ? (
            sortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="text-center py-16">
              <AnimatedIcon icon={FolderKanban} size={80} color="#5f33e1" />
              <p className="text-gray-500 mb-2 font-semibold mt-6">No projects yet</p>
              <p className="text-sm text-gray-400 mb-6">Create your first project to get started</p>
              <Link
                href="/projects/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5f33e1] to-[#f778ba] text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
              >
                <Plus size={20} />
                Create Project
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}


