'use client';

import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import TodayCard from '@/components/TodayCard';
import TaskCard from '@/components/TaskCard';
import ProgressTaskCard from '@/components/ProgressTaskCard';
import Badge from '@/components/Badge';
import { Bell, Calendar, LayoutGrid, BarChart3, FileText, CheckSquare, Clock } from 'lucide-react';
import Link from 'next/link';
import QuickAdd from '@/components/QuickAdd';
import AnimatedIcon from '@/components/AnimatedIcon';

export default function Home() {
  const { tasks, currentUser, initialize } = useStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const todayTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return (
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()
    );
  });

  const completedToday = todayTasks.filter((t) => t.status === 'done').length;
  const activeTasks = tasks.filter((t) => !t.archived);
  const todoTasks = activeTasks.filter((t) => t.status === 'todo').slice(0, 3);
  const inProgressTasks = activeTasks.filter((t) => t.status === 'in-progress').slice(0, 2);

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img
              src="/icon-512x512(1).png"
              alt="To-Do Pro Logo"
              width={48}
              height={48}
              className="rounded-xl shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/icon-512x512.png';
                target.onerror = () => {
                  target.style.display = 'none';
                };
              }}
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                Hello, {currentUser.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">Welcome back!</p>
            </div>
          </div>
          <Link href="/notifications">
            <div className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Bell className="text-gray-700" size={24} />
              <span className="absolute top-0 right-0 w-3 h-3 bg-[#5f33e1] rounded-full border-2 border-white"></span>
            </div>
          </Link>
        </div>

        {/* Today Card */}
        <div className="mb-8 w-full">
          <TodayCard completed={completedToday} total={todayTasks.length} />
        </div>

        {/* To do Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">To do</h2>
            <Badge count={activeTasks.filter((t) => t.status === 'todo').length} />
          </div>
          {todoTasks.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {todoTasks.map((task) => (
                <TaskCard key={task.id} task={task} variant="compact" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 w-full">
              <AnimatedIcon icon={CheckSquare} size={64} color="#5f33e1" />
              <p className="text-gray-500 text-sm mt-4">No tasks to do</p>
            </div>
          )}
        </div>

        {/* In progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">In progress</h2>
            <Badge count={activeTasks.filter((t) => t.status === 'in-progress').length} />
          </div>
          <div className="space-y-4">
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map((task) => (
                <ProgressTaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 w-full">
                <AnimatedIcon icon={Clock} size={64} color="#f59e0b" />
                <p className="text-gray-500 text-sm mt-4">No tasks in progress</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Link href="/calendar" className="relative p-4 bg-gradient-to-br from-[#5f33e1] to-[#8b5cf6] rounded-2xl text-white shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="absolute top-2 right-2 opacity-30">
                <AnimatedIcon icon={Calendar} size={40} color="#ffffff" />
              </div>
              <Calendar className="mb-2 relative z-10" size={24} />
              <p className="font-semibold text-sm relative z-10">Calendar</p>
            </Link>
            <Link href="/kanban" className="relative p-4 bg-gradient-to-br from-[#f778ba] to-[#ff9f9f] rounded-2xl text-white shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="absolute top-2 right-2 opacity-30">
                <AnimatedIcon icon={LayoutGrid} size={40} color="#ffffff" />
              </div>
              <LayoutGrid className="mb-2 relative z-10" size={24} />
              <p className="font-semibold text-sm relative z-10">Kanban</p>
            </Link>
            <Link href="/statistics" className="relative p-4 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-2xl text-white shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="absolute top-2 right-2 opacity-30">
                <AnimatedIcon icon={BarChart3} size={40} color="#ffffff" />
              </div>
              <BarChart3 className="mb-2 relative z-10" size={24} />
              <p className="font-semibold text-sm relative z-10">Statistics</p>
            </Link>
            <Link href="/templates" className="relative p-4 bg-gradient-to-br from-[#f59e0b] to-[#f97316] rounded-2xl text-white shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="absolute top-2 right-2 opacity-30">
                <AnimatedIcon icon={FileText} size={40} color="#ffffff" />
              </div>
              <FileText className="mb-2 relative z-10" size={24} />
              <p className="font-semibold text-sm relative z-10">Templates</p>
            </Link>
          </div>
        </div>

        <QuickAdd />
      </div>
    </div>
  );
}
