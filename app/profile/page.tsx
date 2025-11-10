'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import Avatar from '@/components/Avatar';
import DarkModeToggle from '@/components/DarkModeToggle';
import AnimatedIcon from '@/components/AnimatedIcon';
import { LogOut, Target, CheckCircle2, Clock, FolderKanban, Heart } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, tasks, projects, initialize } = useStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const stats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter((t) => t.status === 'done').length,
    inProgressTasks: tasks.filter((t) => t.status === 'in-progress').length,
    totalProjects: projects.length,
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <DarkModeToggle />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 mb-8">
          <Avatar name={currentUser.name} size={80} />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{currentUser.name}</h2>
            <p className="text-gray-600">Member since {new Date().getFullYear()}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="relative p-4 bg-[#ebe4ff] rounded-2xl overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20">
              <AnimatedIcon icon={Target} size={40} color="#5f33e1" />
            </div>
            <p className="text-3xl font-bold text-[#5f33e1] relative z-10">{stats.totalTasks}</p>
            <p className="text-sm text-gray-600 mt-1 relative z-10">Total Tasks</p>
          </div>
          <div className="relative p-4 bg-[#ffe5a4] rounded-2xl overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20">
              <AnimatedIcon icon={CheckCircle2} size={40} color="#f778ba" />
            </div>
            <p className="text-3xl font-bold text-[#f778ba] relative z-10">{stats.completedTasks}</p>
            <p className="text-sm text-gray-600 mt-1 relative z-10">Completed</p>
          </div>
          <div className="relative p-4 bg-[#f778ba] rounded-2xl overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20">
              <AnimatedIcon icon={Clock} size={40} color="#ffffff" />
            </div>
            <p className="text-3xl font-bold text-white relative z-10">{stats.inProgressTasks}</p>
            <p className="text-sm text-gray-600 mt-1 relative z-10">In Progress</p>
          </div>
          <div className="relative p-4 bg-[#5f33e1] rounded-2xl overflow-hidden">
            <div className="absolute top-2 right-2 opacity-20">
              <AnimatedIcon icon={FolderKanban} size={40} color="#ffffff" />
            </div>
            <p className="text-3xl font-bold text-white relative z-10">{stats.totalProjects}</p>
            <p className="text-sm text-gray-600 mt-1 relative z-10">Projects</p>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
          <Link href="/notifications" className="block w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <p className="font-semibold text-gray-800">Notifications</p>
            <p className="text-sm text-gray-600">Manage notification preferences</p>
          </Link>
          <div className="w-full text-left p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Dark Mode</p>
                <p className="text-sm text-gray-600">Change app appearance</p>
              </div>
              <DarkModeToggle />
            </div>
          </div>
          <Link href="/statistics" className="block w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <p className="font-semibold text-gray-800">Statistics</p>
            <p className="text-sm text-gray-600">View your productivity metrics</p>
          </Link>
          <Link href="/templates" className="block w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <p className="font-semibold text-gray-800">Templates</p>
            <p className="text-sm text-gray-600">Manage task templates</p>
          </Link>
          <Link href="/archive" className="block w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <p className="font-semibold text-gray-800">Archive</p>
            <p className="text-sm text-gray-600">View archived tasks</p>
          </Link>
          <Link href="/about" className="block w-full text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <p className="font-semibold text-gray-800">About</p>
            <p className="text-sm text-gray-600">App features and information</p>
          </Link>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2 font-semibold mb-6"
        >
          <LogOut size={20} />
          Logout
        </button>

        {/* Footer/Trademark */}
        <div className="w-full py-4 px-4 text-center border-t border-gray-200 mt-6">
          <div className="flex items-center justify-center gap-2 text-gray-600 text-xs mb-1">
            <span>Made with</span>
            <Heart size={14} className="text-[#f778ba] fill-[#f778ba]" />
            <span>by</span>
            <a
              href="https://github.com/kalpithasv"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#5f33e1] hover:text-[#4d2ac0] transition-colors"
            >
              @kalpithasv
            </a>
          </div>
          <p className="text-xs text-gray-500">© 2024 To-Do Pro</p>
        </div>
      </div>
    </div>
  );
}

