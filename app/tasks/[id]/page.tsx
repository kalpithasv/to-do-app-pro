'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Image as ImageIcon, FileText, Plus, Download, CheckCircle2, Circle, Tag as TagIcon, Bell, Play, Square, Archive, Copy, Trash2, FileEdit } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import AvatarGroup from '@/components/AvatarGroup';
import PriorityBadge from '@/components/PriorityBadge';
import TagBadge from '@/components/TagBadge';
import AnimatedIcon from '@/components/AnimatedIcon';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { generatePDFSummary } from '@/lib/pdf-utils';
import { Subtask, Tag, Reminder } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { 
    tasks, 
    updateTask, 
    addAttachmentToTask, 
    addNoteToTask, 
    addSubtask,
    updateSubtask,
    deleteSubtask,
    addTag,
    addTagToTask,
    removeTagFromTask,
    addReminder,
    deleteReminder,
    startTimeTracking,
    stopTimeTracking,
    archiveTask,
    duplicateTask,
    tags,
    initialize 
  } = useStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const taskId = params.id as string;
  const task = tasks.find((t) => t.id === taskId);
  const [activeTab, setActiveTab] = useState<'details' | 'attachments' | 'notes' | 'subtasks' | 'tags' | 'reminders' | 'time'>('details');
  const [newNote, setNewNote] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const [showAddSubtask, setShowAddSubtask] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#5f33e1');
  const [showAddTag, setShowAddTag] = useState(false);
  const [newReminderDate, setNewReminderDate] = useState('');
  const [showAddReminder, setShowAddReminder] = useState(false);

  if (!task) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen rounded-t-3xl shadow-2xl p-6">
        <p className="text-gray-500">Task not found</p>
      </div>
    );
  }

  const handleStatusChange = (status: 'todo' | 'in-progress' | 'done') => {
    updateTask(taskId, { status });
  };

  const handlePriorityChange = (priority: 'low' | 'medium' | 'high') => {
    updateTask(taskId, { priority });
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNoteToTask(taskId, {
        id: Date.now().toString(),
        content: newNote,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setNewNote('');
      setShowAddNote(false);
    }
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      const subtask: Subtask = {
        id: uuidv4(),
        title: newSubtask.trim(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addSubtask(taskId, subtask);
      setNewSubtask('');
      setShowAddSubtask(false);
    }
  };

  const handleToggleSubtask = (subtaskId: string) => {
    const subtask = task.subtasks.find((st) => st.id === subtaskId);
    if (subtask) {
      updateSubtask(taskId, subtaskId, { completed: !subtask.completed });
    }
  };

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      const tag: Tag = {
        id: uuidv4(),
        name: newTagName.trim(),
        color: newTagColor,
      };
      addTag(tag);
      addTagToTask(taskId, tag.id);
      setNewTagName('');
      setShowAddTag(false);
    }
  };

  const handleAddReminder = () => {
    if (newReminderDate) {
      const reminder: Reminder = {
        id: uuidv4(),
        date: new Date(newReminderDate),
        type: 'notification',
        sent: false,
      };
      addReminder(taskId, reminder);
      setNewReminderDate('');
      setShowAddReminder(false);
    }
  };

  const activeTimeEntry = (task.timeEntries || []).find((e) => !e.endTime);
  const totalTime = (task.timeEntries || []).reduce((sum, e) => sum + (e.duration || 0), 0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Upload file
      const formData = new FormData();
      formData.append('file', file);
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadResponse.json();

      const attachment = {
        id: Date.now().toString(),
        type: (file.type.startsWith('image/') ? 'image' : file.type === 'application/pdf' ? 'pdf' : 'other') as 'image' | 'pdf' | 'other',
        url: uploadData.url,
        name: file.name,
        size: file.size,
        uploadedAt: new Date(),
      };

      addAttachmentToTask(taskId, attachment);

      // If PDF, extract text and generate summary
      if (file.type === 'application/pdf') {
        try {
          const pdfFormData = new FormData();
          pdfFormData.append('pdf', file);
          const extractResponse = await fetch('/api/pdf/extract', {
            method: 'POST',
            body: pdfFormData,
          });
          const extractData = await extractResponse.json();

          const summary = await generatePDFSummary(extractData.text);
          
          // Add summary as a note
          addNoteToTask(taskId, {
            id: Date.now().toString() + '_summary',
            content: `PDF Summary:\n\n${summary}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } catch (error) {
          console.error('PDF processing error:', error);
        }
      }
    } catch (error) {
      console.error('File upload error:', error);
    }
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
            <AnimatedIcon icon={FileEdit} size={32} color="#5f33e1" />
            <h1 className="text-2xl font-bold text-gray-800">Task Details</h1>
          </div>
        </div>

        {/* Task Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex-1">{task.title}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => duplicateTask(taskId)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                title="Duplicate"
              >
                <Copy size={18} className="text-gray-600" />
              </button>
              <button
                onClick={() => archiveTask(taskId)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                title="Archive"
              >
                <Archive size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-gray-600 mb-4">{task.description}</p>
          )}

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <PriorityBadge priority={task.priority || 'medium'} />
            {task.tags && task.tags.map((tag) => (
              <TagBadge
                key={tag.id}
                tag={tag}
                onRemove={() => removeTagFromTask(taskId, tag.id)}
              />
            ))}
          </div>

          <div className="space-y-3 mb-4">
            {task.dueDate && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={18} />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
            {task.estimatedHours && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span>{task.estimatedHours} hours estimated</span>
              </div>
            )}
            {task.actualHours && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span>{task.actualHours} hours actual</span>
              </div>
            )}
            {task.assignees.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Assigned to:</span>
                <AvatarGroup users={task.assignees} />
              </div>
            )}
          </div>

          {/* Priority Buttons */}
          <div className="flex gap-2 mb-4">
            {(['low', 'medium', 'high'] as const).map((p) => (
              <button
                key={p}
                onClick={() => handlePriorityChange(p)}
                className={`flex-1 px-3 py-2 rounded-xl font-semibold text-sm ${
                  (task.priority || 'medium') === p
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

          {/* Status Buttons */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => handleStatusChange('todo')}
              className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                task.status === 'todo'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              To Do
            </button>
            <button
              onClick={() => handleStatusChange('in-progress')}
              className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                task.status === 'in-progress'
                  ? 'bg-yellow-400 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => handleStatusChange('done')}
              className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                task.status === 'done'
                  ? 'bg-[#ebe4ff] text-[#5f33e1]'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Done
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 border-b border-gray-200 overflow-x-auto pb-2">
          {[
            { key: 'details', label: 'Details' },
            { key: 'subtasks', label: `Subtasks (${(task.subtasks || []).length})` },
            { key: 'tags', label: `Tags (${(task.tags || []).length})` },
            { key: 'reminders', label: `Reminders (${(task.reminders || []).length})` },
            { key: 'time', label: 'Time' },
            { key: 'attachments', label: `Files (${task.attachments.length})` },
            { key: 'notes', label: `Notes (${task.notes.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`pb-2 px-3 font-semibold text-sm whitespace-nowrap ${
                activeTab === tab.key
                  ? 'text-[#5f33e1] border-b-2 border-[#5f33e1]'
                  : 'text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mb-20">
          {activeTab === 'attachments' && (
            <div>
              <label className="block mb-4">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex items-center justify-center gap-2 px-4 py-3 bg-[#ebe4ff] text-[#5f33e1] rounded-xl font-semibold cursor-pointer hover:bg-[#d4c7ff] transition-colors">
                  <Plus size={20} />
                  Add Attachment
                </div>
              </label>

              <div className="space-y-3">
                {task.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    {attachment.type === 'image' ? (
                      <ImageIcon className="text-[#5f33e1]" size={24} />
                    ) : (
                      <FileText className="text-[#5f33e1]" size={24} />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{attachment.name}</p>
                      <p className="text-sm text-gray-500">
                        {format(attachment.uploadedAt, 'MMM dd, yyyy')}
                      </p>
                    </div>
                    {attachment.type === 'pdf' && (
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-gray-200 rounded-lg"
                      >
                        <Download size={18} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div>
              {!showAddNote ? (
                <button
                  onClick={() => setShowAddNote(true)}
                  className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 bg-[#ebe4ff] text-[#5f33e1] rounded-xl font-semibold hover:bg-[#d4c7ff] transition-colors"
                >
                  <Plus size={20} />
                  Add Note
                </button>
              ) : (
                <div className="mb-4">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Write your note here..."
                    className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#5f33e1] mb-2"
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddNote}
                      className="px-4 py-2 bg-[#5f33e1] text-white rounded-xl font-semibold hover:bg-[#4d2ac0] transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setShowAddNote(false);
                        setNewNote('');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {task.notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 bg-gray-50 rounded-xl"
                  >
                    <p className="text-gray-800 whitespace-pre-wrap">{note.content}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {format(note.createdAt, 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-4">
              {task.projectName && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Project</h3>
                  <p className="text-gray-800">{task.projectName}</p>
                </div>
              )}
              {task.progress !== undefined && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#5f33e1] h-2 rounded-full transition-all"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{task.progress}%</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'subtasks' && (
            <div>
              {!showAddSubtask ? (
                <button
                  onClick={() => setShowAddSubtask(true)}
                  className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 bg-[#ebe4ff] text-[#5f33e1] rounded-xl font-semibold hover:bg-[#d4c7ff] transition-colors"
                >
                  <Plus size={20} />
                  Add Subtask
                </button>
              ) : (
                <div className="mb-4">
                  <input
                    type="text"
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    placeholder="Subtask title..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1] mb-2"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddSubtask}
                      className="px-4 py-2 bg-[#5f33e1] text-white rounded-xl font-semibold hover:bg-[#4d2ac0] transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddSubtask(false);
                        setNewSubtask('');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {(task.subtasks || []).map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <button
                      onClick={() => handleToggleSubtask(subtask.id)}
                      className="flex-shrink-0"
                    >
                      {subtask.completed ? (
                        <CheckCircle2 className="text-green-600" size={20} />
                      ) : (
                        <Circle className="text-gray-400" size={20} />
                      )}
                    </button>
                    <span
                      className={`flex-1 ${
                        subtask.completed ? 'line-through text-gray-500' : 'text-gray-800'
                      }`}
                    >
                      {subtask.title}
                    </span>
                    <button
                      onClick={() => deleteSubtask(taskId, subtask.id)}
                      className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="text-red-500" size={16} />
                    </button>
                  </div>
                ))}
                {(task.subtasks || []).length === 0 && (
                  <p className="text-gray-500 text-center py-8">No subtasks yet</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'tags' && (
            <div>
              {!showAddTag ? (
                <button
                  onClick={() => setShowAddTag(true)}
                  className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 bg-[#ebe4ff] text-[#5f33e1] rounded-xl font-semibold hover:bg-[#d4c7ff] transition-colors"
                >
                  <TagIcon size={20} />
                  Add Tag
                </button>
              ) : (
                <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="Tag name..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1] mb-2"
                    autoFocus
                  />
                  <input
                    type="color"
                    value={newTagColor}
                    onChange={(e) => setNewTagColor(e.target.value)}
                    className="w-full h-10 rounded-xl mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateTag}
                      className="flex-1 px-4 py-2 bg-[#5f33e1] text-white rounded-xl font-semibold hover:bg-[#4d2ac0] transition-colors"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setShowAddTag(false);
                        setNewTagName('');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 mb-2">Available Tags</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => addTagToTask(taskId, tag.id)}
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
                {(task.tags || []).length === 0 && (
                  <p className="text-gray-500 text-center py-8">No tags added</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reminders' && (
            <div>
              {!showAddReminder ? (
                <button
                  onClick={() => setShowAddReminder(true)}
                  className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 bg-[#ebe4ff] text-[#5f33e1] rounded-xl font-semibold hover:bg-[#d4c7ff] transition-colors"
                >
                  <Bell size={20} />
                  Add Reminder
                </button>
              ) : (
                <div className="mb-4">
                  <input
                    type="datetime-local"
                    value={newReminderDate}
                    onChange={(e) => setNewReminderDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f33e1] mb-2"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddReminder}
                      className="flex-1 px-4 py-2 bg-[#5f33e1] text-white rounded-xl font-semibold hover:bg-[#4d2ac0] transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddReminder(false);
                        setNewReminderDate('');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {(task.reminders || []).map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <Bell className="text-[#5f33e1]" size={18} />
                      <span className="text-gray-800">
                        {format(new Date(reminder.date), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteReminder(taskId, reminder.id)}
                      className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="text-red-500" size={16} />
                    </button>
                  </div>
                ))}
                {(task.reminders || []).length === 0 && (
                  <p className="text-gray-500 text-center py-8">No reminders set</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'time' && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-700 mb-2">Time Tracking</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {Math.floor(totalTime / 60)}h {totalTime % 60}m
                    </p>
                    <p className="text-sm text-gray-600">Total time</p>
                  </div>
                  {activeTimeEntry && (
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">Currently tracking</p>
                      <button
                        onClick={() => stopTimeTracking(taskId)}
                        className="px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
                      >
                        <Square size={16} />
                        Stop
                      </button>
                    </div>
                  )}
                  {!activeTimeEntry && (
                    <button
                      onClick={() => startTimeTracking(taskId)}
                      className="px-4 py-2 bg-[#5f33e1] text-white rounded-xl font-semibold hover:bg-[#4d2ac0] transition-colors flex items-center gap-2"
                    >
                      <Play size={16} />
                      Start
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Time Entries</h3>
                <div className="space-y-2">
                  {(task.timeEntries || []).map((entry) => (
                    <div
                      key={entry.id}
                      className="p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800">
                          {format(new Date(entry.startTime), 'MMM dd, yyyy HH:mm')}
                        </span>
                        {entry.duration && (
                          <span className="text-gray-600">
                            {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {(task.timeEntries || []).length === 0 && (
                    <p className="text-gray-500 text-center py-8">No time entries yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
