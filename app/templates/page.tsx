'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Plus, FileText, Trash2, Edit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TaskTemplate } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import AnimatedIcon from '@/components/AnimatedIcon';

export default function TemplatesPage() {
  const router = useRouter();
  const { templates, addTemplate, deleteTemplate, createTaskFromTemplate, initialize } = useStore();
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateTitle, setTemplateTitle] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templatePriority, setTemplatePriority] = useState<'low' | 'medium' | 'high'>('medium');

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleCreateTemplate = () => {
    if (!templateName.trim() || !templateTitle.trim()) return;

    const newTemplate: TaskTemplate = {
      id: uuidv4(),
      name: templateName,
      title: templateTitle,
      description: templateDescription || undefined,
      priority: templatePriority,
      tags: [],
      estimatedHours: undefined,
      subtasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addTemplate(newTemplate);
    setTemplateName('');
    setTemplateTitle('');
    setTemplateDescription('');
    setShowNewTemplate(false);
  };

  const handleUseTemplate = (templateId: string) => {
    try {
      const task = createTaskFromTemplate(templateId);
      router.push(`/tasks/${task.id}`);
    } catch (error) {
      console.error('Error creating task from template:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Templates</h1>
          <button
            onClick={() => setShowNewTemplate(!showNewTemplate)}
            className="p-2 bg-[#5f33e1] text-white rounded-xl hover:bg-[#4d2ac0] transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* New Template Form */}
        {showNewTemplate && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">Create Template</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Template name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1]"
              />
              <input
                type="text"
                value={templateTitle}
                onChange={(e) => setTemplateTitle(e.target.value)}
                placeholder="Task title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1]"
              />
              <textarea
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="Description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1] resize-none"
                rows={3}
              />
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setTemplatePriority(p)}
                    className={`flex-1 px-3 py-2 rounded-xl text-sm font-semibold ${
                      templatePriority === p
                        ? p === 'low'
                          ? 'bg-green-100 text-green-700'
                          : p === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCreateTemplate}
                  className="flex-1 px-4 py-2 bg-[#5f33e1] text-white rounded-xl font-semibold hover:bg-[#4d2ac0] transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowNewTemplate(false);
                    setTemplateName('');
                    setTemplateTitle('');
                    setTemplateDescription('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Templates List */}
        <div className="space-y-3">
          {templates.length > 0 ? (
            templates.map((template) => (
              <div
                key={template.id}
                className="bg-gray-50 rounded-2xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.title}</p>
                  </div>
                  <button
                    onClick={() => deleteTemplate(template.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="text-red-500" size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      template.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : template.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {template.priority}
                  </span>
                  <button
                    onClick={() => handleUseTemplate(template.id)}
                    className="flex-1 px-4 py-2 bg-[#5f33e1] text-white rounded-xl font-semibold text-sm hover:bg-[#4d2ac0] transition-colors"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <AnimatedIcon icon={FileText} size={80} color="#f59e0b" />
              <p className="text-gray-500 mb-2 mt-6">No templates yet</p>
              <p className="text-sm text-gray-400">Create templates to quickly add tasks</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

