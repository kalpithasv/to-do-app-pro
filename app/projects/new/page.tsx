'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { ArrowLeft, FolderPlus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Project } from '@/types';
import AnimatedIcon from '@/components/AnimatedIcon';

const projectColors = ['#f778ba', '#5f33e1', '#ffe5a4', '#4ade80', '#f59e0b'];

export default function NewProjectPage() {
  const router = useRouter();
  const { addProject, currentUser } = useStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(projectColors[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProject: Project = {
      id: uuidv4(),
      name,
      description: description || undefined,
      color: selectedColor,
      totalTasks: 0,
      completedTasks: 0,
      assignees: [currentUser],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addProject(newProject);
    router.push('/projects');
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
            <AnimatedIcon icon={FolderPlus} size={32} color="#5f33e1" />
            <h1 className="text-2xl font-bold text-gray-800">New Project</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-20">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1]"
              placeholder="Enter project name"
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
              placeholder="Enter project description"
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Color
            </label>
            <div className="flex gap-3">
              {projectColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-xl ${
                    selectedColor === color
                      ? 'ring-4 ring-offset-2 ring-[#5f33e1]'
                      : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#5f33e1] text-white rounded-2xl py-4 px-6 font-semibold hover:bg-[#4d2ac0] transition-colors shadow-lg"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}

