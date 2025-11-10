export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Attachment {
  id: string;
  type: 'image' | 'pdf' | 'other';
  url: string;
  name: string;
  size: number;
  uploadedAt: Date;
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Reminder {
  id: string;
  date: Date;
  type: 'notification' | 'email' | 'sms';
  sent: boolean;
}

export interface Recurrence {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  interval: number;
  daysOfWeek?: number[];
  endDate?: Date;
  occurrences?: number;
}

export interface TimeEntry {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId?: string;
  projectName?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  tags: Tag[];
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  progress?: number;
  assignees: User[];
  attachments: Attachment[];
  notes: Note[];
  subtasks: Subtask[];
  reminders: Reminder[];
  recurrence?: Recurrence;
  timeEntries: TimeEntry[];
  archived: boolean;
  position?: number; // for drag and drop ordering
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  totalTasks: number;
  completedTasks: number;
  assignees: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PDFSummary {
  id: string;
  taskId: string;
  summary: string;
  extractedAt: Date;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quantity?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskTemplate {
  id: string;
  name: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  tags: Tag[];
  estimatedHours?: number;
  subtasks: Omit<Subtask, 'id' | 'createdAt' | 'updatedAt'>[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Statistics {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  tasksThisWeek: number;
  tasksThisMonth: number;
  averageCompletionTime: number;
  productivityScore: number;
  completionRate: number;
  streak: number;
}


