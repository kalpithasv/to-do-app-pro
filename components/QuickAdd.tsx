'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { Task } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default function QuickAdd() {
  const router = useRouter();
  const { addTask, currentUser } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title: title.trim(),
      status: 'todo',
      priority: 'medium',
      tags: [],
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
    setTitle('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#5f33e1] to-[#f778ba] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-10"
      >
        <Plus size={20} className="sm:w-6 sm:h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-80 max-w-sm bg-white rounded-2xl shadow-2xl p-4 z-10 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800">Quick Add Task</h3>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setTitle('');
            }}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1]"
          autoFocus
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-[#5f33e1] text-white rounded-xl font-semibold hover:bg-[#4d2ac0] transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setTitle('');
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

