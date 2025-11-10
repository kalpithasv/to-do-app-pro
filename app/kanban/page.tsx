'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Plus, LayoutGrid, CheckSquare, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Task } from '@/types';
import AnimatedIcon from '@/components/AnimatedIcon';

export default function KanbanPage() {
  const { tasks, initialize, updateTask, reorderTasks } = useStore();
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as const, icon: CheckSquare, color: '#5f33e1' },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' as const, icon: Clock, color: '#f59e0b' },
    { id: 'done', title: 'Done', status: 'done' as const, icon: CheckCircle2, color: '#4ade80' },
  ];

  const getTasksForStatus = (status: 'todo' | 'in-progress' | 'done') => {
    return tasks
      .filter((t) => t.status === status && !t.archived)
      .sort((a, b) => (a.position || 0) - (b.position || 0));
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: 'todo' | 'in-progress' | 'done') => {
    if (!draggedTask) return;
    updateTask(draggedTask.id, { status });
    setDraggedTask(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl overflow-hidden">
      <div className="p-4 sm:p-6 pb-20 sm:pb-24">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <AnimatedIcon icon={LayoutGrid} size={36} color="#5f33e1" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Kanban Board</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">Drag and drop tasks to change status</p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => {
          const columnTasks = getTasksForStatus(column.status);
          const ColumnIcon = column.icon;
          return (
            <div
              key={column.id}
              className="relative bg-gray-50 rounded-2xl p-3 sm:p-4 min-h-[400px] sm:min-h-[500px] overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.status)}
            >
              <div className="absolute top-4 right-4 opacity-10">
                <AnimatedIcon icon={ColumnIcon} size={60} color={column.color} />
              </div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <ColumnIcon className="text-gray-600" size={20} />
                  <h2 className="text-lg font-bold text-gray-800">
                    {column.title} ({columnTasks.length})
                  </h2>
                </div>
                <Link
                  href={`/tasks/new?status=${column.status}`}
                  className="p-2 bg-[#5f33e1] text-white rounded-lg hover:bg-[#4d2ac0] transition-colors relative z-10"
                >
                  <Plus size={16} />
                </Link>
              </div>
              <div className="space-y-3 relative z-10">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-move"
                  >
                    <Link href={`/tasks/${task.id}`}>
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{task.title}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              (task.priority || 'medium') === 'high'
                                ? 'bg-red-100 text-red-700'
                                : (task.priority || 'medium') === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {task.priority || 'medium'}
                          </span>
                        </div>
                        {task.description && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                        {(task.tags || []).length > 0 && (
                          <div className="flex gap-1 flex-wrap mb-2">
                            {(task.tags || []).map((tag) => (
                              <span
                                key={tag.id}
                                className="px-2 py-1 rounded-full text-xs"
                                style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                        {(task.subtasks || []).length > 0 && (
                          <div className="text-xs text-gray-500">
                            {(task.subtasks || []).filter((st) => st.completed).length}/
                            {(task.subtasks || []).length} subtasks
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

