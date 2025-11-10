'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { TrendingUp, Calendar, Clock, Target, Award, Zap } from 'lucide-react';
import AnimatedIcon from '@/components/AnimatedIcon';

export default function StatisticsPage() {
  const { getStatistics, initialize } = useStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const stats = getStatistics();

  const statCards = [
    {
      icon: Target,
      label: 'Total Tasks',
      value: stats.totalTasks,
      color: '#5f33e1',
    },
    {
      icon: TrendingUp,
      label: 'Completed',
      value: stats.completedTasks,
      color: '#4ade80',
    },
    {
      icon: Clock,
      label: 'In Progress',
      value: stats.inProgressTasks,
      color: '#f59e0b',
    },
    {
      icon: Calendar,
      label: 'This Week',
      value: stats.tasksThisWeek,
      color: '#f778ba',
    },
    {
      icon: Award,
      label: 'Productivity Score',
      value: stats.productivityScore,
      color: '#8b5cf6',
      suffix: '/100',
    },
    {
      icon: Zap,
      label: 'Streak',
      value: stats.streak,
      color: '#ff9f00',
      suffix: ' days',
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Statistics</h1>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative rounded-2xl p-4 text-white shadow-lg overflow-hidden"
                style={{ backgroundColor: stat.color }}
              >
                <div className="absolute top-2 right-2 opacity-20">
                  <AnimatedIcon icon={Icon} size={40} color="#ffffff" />
                </div>
                <div className="flex items-center gap-2 mb-2 relative z-10">
                  <Icon size={20} />
                  <p className="text-sm opacity-90">{stat.label}</p>
                </div>
                <p className="text-3xl font-bold relative z-10">
                  {stat.value}
                  {stat.suffix}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Stats */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Completion Rate</h3>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-[#5f33e1] h-3 rounded-full transition-all"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">{stats.completionRate}%</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Time Tracking</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.totalTime} hours</p>
            <p className="text-sm text-gray-600 mt-1">Total time logged</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Average Completion Time</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.averageCompletionTime} hours</p>
            <p className="text-sm text-gray-600 mt-1">Per task</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Overdue Tasks</h3>
            <p className="text-2xl font-bold text-red-600">{stats.overdueTasks}</p>
            <p className="text-sm text-gray-600 mt-1">Need attention</p>
          </div>
        </div>
      </div>
    </div>
  );
}

