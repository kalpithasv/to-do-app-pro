'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { 
  CheckSquare, 
  FolderKanban, 
  ShoppingBag, 
  Calendar, 
  LayoutGrid, 
  BarChart3, 
  FileText, 
  Tag, 
  Clock, 
  Bell, 
  Archive, 
  Copy, 
  Target,
  Users,
  Image as ImageIcon,
  FileText as FileTextIcon,
  Zap,
  TrendingUp,
  Heart
} from 'lucide-react';
import AnimatedIcon from '@/components/AnimatedIcon';
import Link from 'next/link';

export default function AboutPage() {
  const { initialize } = useStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const features = [
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Create, edit, and organize tasks with priorities (High/Medium/Low), due dates, and status tracking (To Do, In Progress, Done)',
      color: '#5f33e1',
    },
    {
      icon: FolderKanban,
      title: 'Projects',
      description: 'Organize tasks into projects with progress tracking, assignees, and project-specific views',
      color: '#f778ba',
    },
    {
      icon: Tag,
      title: 'Tags & Labels',
      description: 'Categorize tasks with custom tags and labels for better organization and filtering',
      color: '#4ade80',
    },
    {
      icon: Target,
      title: 'Subtasks',
      description: 'Break down complex tasks into smaller, manageable subtasks with individual completion tracking',
      color: '#f59e0b',
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description: 'Track time spent on tasks with start/stop functionality and detailed time entries',
      color: '#3b82f6',
    },
    {
      icon: Bell,
      title: 'Reminders',
      description: 'Set reminders for important tasks with notifications to keep you on track',
      color: '#ef4444',
    },
    {
      icon: Calendar,
      title: 'Calendar View',
      description: 'View all tasks in a calendar format to see what\'s due on specific dates',
      color: '#8b5cf6',
    },
    {
      icon: LayoutGrid,
      title: 'Kanban Board',
      description: 'Visualize tasks in a Kanban board with drag-and-drop functionality to move tasks between columns',
      color: '#06b6d4',
    },
    {
      icon: BarChart3,
      title: 'Statistics & Analytics',
      description: 'Track your productivity with detailed statistics, completion rates, streaks, and time analytics',
      color: '#10b981',
    },
    {
      icon: FileText,
      title: 'Task Templates',
      description: 'Create reusable task templates to quickly add common tasks with predefined settings',
      color: '#f97316',
    },
    {
      icon: ShoppingBag,
      title: 'Grocery Lists',
      description: 'Manage multiple grocery lists with categorized items, quantities, and completion tracking',
      color: '#ec4899',
    },
    {
      icon: ImageIcon,
      title: 'Attachments',
      description: 'Attach images and PDFs to tasks. PDFs are automatically summarized for quick reference',
      color: '#6366f1',
    },
    {
      icon: FileTextIcon,
      title: 'Notes',
      description: 'Add detailed notes to tasks for additional context, ideas, or important information',
      color: '#14b8a6',
    },
    {
      icon: Archive,
      title: 'Archive',
      description: 'Archive completed or old tasks to keep your active workspace clean while preserving history',
      color: '#64748b',
    },
    {
      icon: Copy,
      title: 'Duplicate Tasks',
      description: 'Quickly duplicate tasks with all their settings, subtasks, and attachments',
      color: '#a855f7',
    },
    {
      icon: Users,
      title: 'Multi-User Support',
      description: 'Assign tasks to team members and track who\'s working on what',
      color: '#0ea5e9',
    },
    {
      icon: Zap,
      title: 'Quick Add',
      description: 'Floating action button for quick task creation without navigating away',
      color: '#fbbf24',
    },
    {
      icon: TrendingUp,
      title: 'Productivity Tracking',
      description: 'Monitor your productivity score, completion rates, and maintain streaks',
      color: '#22c55e',
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
              <img
                src="/icon-512x512(1).png"
                alt="To-Do Pro Logo"
                className="w-full h-full object-contain rounded-xl shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/icon-512x512.png';
                  target.onerror = () => {
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-[#5f33e1] to-[#f778ba] rounded-xl flex items-center justify-center text-white text-2xl font-bold">✓</div>';
                  };
                }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">About To-Do Pro</h1>
              <p className="text-gray-600 text-sm sm:text-base">
                A comprehensive task and project management app designed to boost your productivity
              </p>
            </div>
          </div>
        </div>

        {/* App Description */}
        <div className="bg-gradient-to-r from-[#5f33e1] to-[#f778ba] rounded-2xl p-6 text-white mb-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-20 w-32 h-32 sm:w-40 sm:h-40">
            <img
              src="/icon-512x512(1).png"
              alt="Logo"
              className="w-full h-full object-contain rounded-2xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/icon-512x512.png';
                target.onerror = () => {
                  target.style.display = 'none';
                };
              }}
            />
          </div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
              <img
                src="/icon-512x512(1).png"
                alt="Logo"
                className="w-full h-full object-contain rounded-xl bg-white/20 p-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/icon-512x512.png';
                  target.onerror = () => {
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="w-full h-full bg-white/20 rounded-xl flex items-center justify-center text-white text-2xl font-bold">✓</div>';
                  };
                }}
              />
            </div>
            <h2 className="text-2xl font-bold">Welcome to To-Do Pro</h2>
          </div>
          <p className="text-sm sm:text-base opacity-90 leading-relaxed">
            To-Do Pro is a feature-rich task management application that helps you stay organized, 
            track your progress, and achieve your goals. Whether you're managing personal tasks, 
            team projects, or grocery lists, To-Do Pro has everything you need.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Features</h2>
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-4 hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${feature.color}20` }}
                    >
                      <Icon size={24} style={{ color: feature.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1 text-lg">{feature.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/"
              className="bg-gradient-to-br from-[#5f33e1] to-[#8b5cf6] rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transition-all text-center"
            >
              <CheckSquare className="mx-auto mb-2" size={24} />
              <p className="font-semibold text-sm">Home</p>
            </Link>
            <Link
              href="/projects"
              className="bg-gradient-to-br from-[#f778ba] to-[#ff9f9f] rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transition-all text-center"
            >
              <FolderKanban className="mx-auto mb-2" size={24} />
              <p className="font-semibold text-sm">Projects</p>
            </Link>
            <Link
              href="/calendar"
              className="bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transition-all text-center"
            >
              <Calendar className="mx-auto mb-2" size={24} />
              <p className="font-semibold text-sm">Calendar</p>
            </Link>
            <Link
              href="/statistics"
              className="bg-gradient-to-br from-[#f59e0b] to-[#f97316] rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transition-all text-center"
            >
              <BarChart3 className="mx-auto mb-2" size={24} />
              <p className="font-semibold text-sm">Statistics</p>
            </Link>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-[#ebe4ff] rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💡 Pro Tips</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-[#5f33e1] font-bold">•</span>
              <span>Use tags to categorize tasks by context (work, personal, urgent)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#5f33e1] font-bold">•</span>
              <span>Break large tasks into subtasks for better progress tracking</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#5f33e1] font-bold">•</span>
              <span>Set reminders for important deadlines to never miss a task</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#5f33e1] font-bold">•</span>
              <span>Use templates for recurring tasks to save time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#5f33e1] font-bold">•</span>
              <span>Track time on tasks to understand where your time goes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#5f33e1] font-bold">•</span>
              <span>Archive completed tasks to keep your workspace clean</span>
            </li>
          </ul>
        </div>

        {/* Version Info */}
        <div className="text-center text-sm text-gray-500 mb-6">
          <p>To-Do Pro v1.0.0</p>
          <p className="mt-1">Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>

        {/* Footer/Trademark */}
        <div className="w-full py-6 px-4 text-center border-t border-gray-200 mt-8">
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm mb-2">
            <span>Made with</span>
            <Heart size={16} className="text-[#f778ba] fill-[#f778ba]" />
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
          <p className="text-xs text-gray-500">© 2024 To-Do Pro. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

