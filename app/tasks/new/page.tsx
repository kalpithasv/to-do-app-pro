'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User, PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/types';
import AnimatedIcon from '@/components/AnimatedIcon';

export default function NewTaskPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addTask, projects, currentUser } = useStore();

  const projectId = searchParams.get('projectId');
  const project = projectId ? projects.find((p) => p.id === projectId) : null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');
  const [progress, setProgress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      id: uuidv4(),
      title,
      description: description || undefined,
      projectId: projectId || undefined,
      projectName: project?.name,
      status,
      priority,
      tags: [],
      dueDate: dueDate ? new Date(dueDate) : undefined,
      estimatedHours: estimatedHours ? parseInt(estimatedHours) : undefined,
      progress: progress ? parseInt(progress) : undefined,
      assignees: [currentUser],
      attachments: [],
      notes: [],
      subtasks: [],
      reminders: [],
      timeEntries: [],
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addTask(newTask);
    router.push(projectId ? `/projects/${projectId}` : '/');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()}>
            <ArrowLeft className="text-gray-700" size={24} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <AnimatedIcon icon={PlusCircle} size={32} color="#5f33e1" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">New Task</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-20">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1]"
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1] resize-none"
              rows={4}
              placeholder="Enter task description"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Priority
            </label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 px-4 py-2 rounded-xl font-semibold text-sm capitalize ${
                    priority === p
                      ? p === 'low'
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : p === 'medium'
                        ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                        : 'bg-red-100 text-red-700 border-2 border-red-300'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <div className="flex gap-2">
              {(['todo', 'in-progress', 'done'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`flex-1 px-4 py-2 rounded-xl font-semibold text-sm capitalize ${
                    status === s
                      ? s === 'todo'
                        ? 'bg-gray-200 text-gray-800'
                        : s === 'in-progress'
                        ? 'bg-yellow-400 text-white'
                        : 'bg-[#ebe4ff] text-[#5f33e1]'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {s.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar size={16} className="inline mr-2" />
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1]"
            />
          </div>

          {/* Estimated Hours */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Clock size={16} className="inline mr-2" />
              Estimated Hours
            </label>
            <input
              type="number"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1]"
              placeholder="e.g., 2"
            />
          </div>

          {/* Progress */}
          {status === 'in-progress' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Progress (%)
              </label>
              <input
                type="number"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1]"
                placeholder="e.g., 50"
              />
            </div>
          )}

          {/* Project Info */}
          {project && (
            <div className="p-4 bg-[#ebe4ff] rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Project</p>
              <p className="font-semibold text-[#5f33e1]">{project.name}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#5f33e1] text-white rounded-2xl py-4 px-6 font-semibold hover:bg-[#4d2ac0] transition-colors shadow-lg"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

