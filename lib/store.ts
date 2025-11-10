import { create } from 'zustand';
import { Task, Project, User, Attachment, Note, GroceryList, GroceryItem, Tag, Subtask, Reminder, TimeEntry, TaskTemplate, Recurrence } from '@/types';

interface AppState {
  tasks: Task[];
  projects: Project[];
  groceryLists: GroceryList[];
  tags: Tag[];
  templates: TaskTemplate[];
  currentUser: User;
  selectedProjectId: string | null;
  initialized: boolean;
  darkMode: boolean;
  
  // Actions
  initialize: () => void;
  toggleDarkMode: () => void;
  // Task Actions
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  archiveTask: (id: string) => void;
  unarchiveTask: (id: string) => void;
  duplicateTask: (id: string) => void;
  moveTask: (taskId: string, newProjectId: string | null) => void;
  reorderTasks: (taskIds: string[]) => void;
  // Subtask Actions
  addSubtask: (taskId: string, subtask: Subtask) => void;
  updateSubtask: (taskId: string, subtaskId: string, updates: Partial<Subtask>) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  // Tag Actions
  addTag: (tag: Tag) => void;
  updateTag: (id: string, updates: Partial<Tag>) => void;
  deleteTag: (id: string) => void;
  addTagToTask: (taskId: string, tagId: string) => void;
  removeTagFromTask: (taskId: string, tagId: string) => void;
  // Reminder Actions
  addReminder: (taskId: string, reminder: Reminder) => void;
  updateReminder: (taskId: string, reminderId: string, updates: Partial<Reminder>) => void;
  deleteReminder: (taskId: string, reminderId: string) => void;
  // Time Tracking Actions
  startTimeTracking: (taskId: string) => void;
  stopTimeTracking: (taskId: string) => void;
  addTimeEntry: (taskId: string, entry: TimeEntry) => void;
  // Template Actions
  addTemplate: (template: TaskTemplate) => void;
  updateTemplate: (id: string, updates: Partial<TaskTemplate>) => void;
  deleteTemplate: (id: string) => void;
  createTaskFromTemplate: (templateId: string) => Task;
  // Project Actions
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addAttachmentToTask: (taskId: string, attachment: Attachment) => void;
  addNoteToTask: (taskId: string, note: Note) => void;
  setSelectedProject: (projectId: string | null) => void;
  // Grocery List Actions
  addGroceryList: (list: GroceryList) => void;
  updateGroceryList: (id: string, updates: Partial<GroceryList>) => void;
  deleteGroceryList: (id: string) => void;
  addGroceryItem: (listId: string, item: GroceryItem) => void;
  updateGroceryItem: (listId: string, itemId: string, updates: Partial<GroceryItem>) => void;
  deleteGroceryItem: (listId: string, itemId: string) => void;
  // Statistics
  getStatistics: () => any;
}

// Load user from localStorage
const loadUserFromStorage = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('user');
    if (stored) {
      const userData = JSON.parse(stored);
      return { id: userData.id, name: userData.name };
    }
  } catch (error) {
    console.error('Error loading user from storage:', error);
  }
  return null;
};

// Load data from localStorage
const loadDataFromStorage = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(`Error loading ${key} from storage:`, error);
  }
  return defaultValue;
};

// Save data to localStorage
const saveDataToStorage = (key: string, data: any) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
};

export const useStore = create<AppState>((set, get) => {
  // Initialize with user from storage or create a default
  const loadInitialUser = (): User => {
    const stored = loadUserFromStorage();
    if (stored) return stored;
    // Return a temporary user that will be replaced on login
    return { id: 'temp', name: 'Guest' };
  };
  
  return {
    tasks: [],
    projects: [],
    groceryLists: [],
    tags: [],
    templates: [],
    currentUser: loadInitialUser(),
    selectedProjectId: null,
    initialized: false,
    darkMode: loadDataFromStorage('darkMode', false),
    
    initialize: () => {
      if (get().initialized) return;
      const user = loadUserFromStorage();
      
      // Load only stored data, no sample data
      let tasks = loadDataFromStorage('tasks', []);
      const projects = loadDataFromStorage('projects', []);
      const groceryLists = loadDataFromStorage('groceryLists', []);
      const tags = loadDataFromStorage('tags', []);
      const templates = loadDataFromStorage('templates', []);
      const darkMode = loadDataFromStorage('darkMode', false);
      
      // Migrate old tasks to have default values for new fields (only if tasks exist)
      if (tasks.length > 0) {
        tasks = tasks.map((task: Task) => ({
          ...task,
          priority: task.priority || 'medium',
          tags: task.tags || [],
          subtasks: task.subtasks || [],
          reminders: task.reminders || [],
          timeEntries: task.timeEntries || [],
          archived: task.archived || false,
        }));
        
        // Save migrated tasks back to storage
        saveDataToStorage('tasks', tasks);
      }
      
      set({
        tasks,
        projects,
        groceryLists,
        tags,
        templates,
        currentUser: user || { id: 'temp', name: 'Guest' },
        darkMode,
        initialized: true,
      });
    },
    
    toggleDarkMode: () => {
      set((state) => {
        const newDarkMode = !state.darkMode;
        saveDataToStorage('darkMode', newDarkMode);
        return { darkMode: newDarkMode };
      });
    },
  
  addTask: (task) => {
    set((state) => {
      const newTasks = [...state.tasks, task];
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  updateTask: (id, updates) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  deleteTask: (id) => {
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  archiveTask: (id) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, archived: true, updatedAt: new Date() } : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  unarchiveTask: (id) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, archived: false, updatedAt: new Date() } : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  duplicateTask: (id) => {
    set((state) => {
      const task = state.tasks.find((t) => t.id === id);
      if (!task) return state;
      const newTask: Task = {
        ...task,
        id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: `${task.title} (Copy)`,
        status: 'todo',
        archived: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const newTasks = [...state.tasks, newTask];
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  moveTask: (taskId, newProjectId) => {
    set((state) => {
      const project = newProjectId ? state.projects.find((p) => p.id === newProjectId) : null;
      const newTasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              projectId: newProjectId || undefined,
              projectName: project?.name,
              updatedAt: new Date(),
            }
          : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  reorderTasks: (taskIds) => {
    set((state) => {
      const taskMap = new Map(state.tasks.map((t) => [t.id, t]));
      const reorderedTasks: Task[] = [];
      taskIds.forEach((id, index) => {
        const task = taskMap.get(id);
        if (task) {
          reorderedTasks.push({ ...task, position: index, updatedAt: new Date() });
        }
      });
      const remainingTasks = state.tasks.filter((t) => !taskIds.includes(t.id));
      const allTasks = [...reorderedTasks, ...remainingTasks];
      saveDataToStorage('tasks', allTasks);
      return { tasks: allTasks };
    });
  },
  
  addProject: (project) => {
    set((state) => {
      const newProjects = [...state.projects, project];
      saveDataToStorage('projects', newProjects);
      return { projects: newProjects };
    });
  },
  
  updateProject: (id, updates) => {
    set((state) => {
      const newProjects = state.projects.map((project) =>
        project.id === id ? { ...project, ...updates, updatedAt: new Date() } : project
      );
      saveDataToStorage('projects', newProjects);
      return { projects: newProjects };
    });
  },
  
  deleteProject: (id) => {
    set((state) => {
      const newProjects = state.projects.filter((project) => project.id !== id);
      saveDataToStorage('projects', newProjects);
      return { projects: newProjects };
    });
  },
  
  addAttachmentToTask: (taskId, attachment) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, attachments: [...task.attachments, attachment] }
          : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  addNoteToTask: (taskId, note) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, notes: [...task.notes, note] }
          : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  setSelectedProject: (projectId) => set({ selectedProjectId: projectId }),
  
  // Subtask Actions
  addSubtask: (taskId, subtask) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, subtasks: [...task.subtasks, subtask], updatedAt: new Date() }
          : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  updateSubtask: (taskId, subtaskId, updates) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((st) =>
                st.id === subtaskId ? { ...st, ...updates, updatedAt: new Date() } : st
              ),
              updatedAt: new Date(),
            }
          : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  deleteSubtask: (taskId, subtaskId) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter((st) => st.id !== subtaskId),
              updatedAt: new Date(),
            }
          : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  // Tag Actions
  addTag: (tag) => {
    set((state) => {
      const newTags = [...state.tags, tag];
      saveDataToStorage('tags', newTags);
      return { tags: newTags };
    });
  },
  
  updateTag: (id, updates) => {
    set((state) => {
      const newTags = state.tags.map((tag) =>
        tag.id === id ? { ...tag, ...updates } : tag
      );
      saveDataToStorage('tags', newTags);
      return { tags: newTags };
    });
  },
  
  deleteTag: (id) => {
    set((state) => {
      const newTags = state.tags.filter((tag) => tag.id !== id);
      const newTasks = state.tasks.map((task) => ({
        ...task,
        tags: task.tags.filter((t) => t.id !== id),
      }));
      saveDataToStorage('tags', newTags);
      saveDataToStorage('tasks', newTasks);
      return { tags: newTags, tasks: newTasks };
    });
  },
  
  addTagToTask: (taskId, tagId) => {
    set((state) => {
      const tag = state.tags.find((t) => t.id === tagId);
      if (!tag) return state;
      const newTasks = state.tasks.map((task) =>
        task.id === taskId && !task.tags.find((t) => t.id === tagId)
          ? { ...task, tags: [...task.tags, tag], updatedAt: new Date() }
          : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  removeTagFromTask: (taskId, tagId) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              tags: task.tags.filter((t) => t.id !== tagId),
              updatedAt: new Date(),
            }
          : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  // Reminder Actions
  addReminder: (taskId, reminder) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, reminders: [...task.reminders, reminder], updatedAt: new Date() }
          : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  updateReminder: (taskId, reminderId, updates) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              reminders: task.reminders.map((r) =>
                r.id === reminderId ? { ...r, ...updates } : r
              ),
              updatedAt: new Date(),
            }
          : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  deleteReminder: (taskId, reminderId) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              reminders: task.reminders.filter((r) => r.id !== reminderId),
              updatedAt: new Date(),
            }
          : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  // Time Tracking Actions
  startTimeTracking: (taskId) => {
    set((state) => {
      const entry: TimeEntry = {
        id: `entry_${Date.now()}`,
        startTime: new Date(),
        description: 'Time tracking session',
      };
      const newTasks = state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, timeEntries: [...task.timeEntries, entry], updatedAt: new Date() }
          : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  stopTimeTracking: (taskId) => {
    set((state) => {
      const newTasks = state.tasks.map((task) => {
        if (task.id !== taskId) return task;
        const activeEntry = task.timeEntries.find((e) => !e.endTime);
        if (!activeEntry) return task;
        const endTime = new Date();
        const duration = Math.round((endTime.getTime() - new Date(activeEntry.startTime).getTime()) / 60000);
        const updatedEntry = { ...activeEntry, endTime, duration };
        const updatedEntries = task.timeEntries.map((e) =>
          e.id === activeEntry.id ? updatedEntry : e
        );
        const totalMinutes = updatedEntries.reduce((sum, e) => sum + (e.duration || 0), 0);
        return {
          ...task,
          timeEntries: updatedEntries,
          actualHours: Math.round((totalMinutes / 60) * 100) / 100,
          updatedAt: new Date(),
        };
      });
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  addTimeEntry: (taskId, entry) => {
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, timeEntries: [...task.timeEntries, entry], updatedAt: new Date() }
          : task
      );
      saveDataToStorage('tasks', newTasks);
      return { tasks: newTasks };
    });
  },
  
  // Template Actions
  addTemplate: (template) => {
    set((state) => {
      const newTemplates = [...state.templates, template];
      saveDataToStorage('templates', newTemplates);
      return { templates: newTemplates };
    });
  },
  
  updateTemplate: (id, updates) => {
    set((state) => {
      const newTemplates = state.templates.map((template) =>
        template.id === id ? { ...template, ...updates, updatedAt: new Date() } : template
      );
      saveDataToStorage('templates', newTemplates);
      return { templates: newTemplates };
    });
  },
  
  deleteTemplate: (id) => {
    set((state) => {
      const newTemplates = state.templates.filter((template) => template.id !== id);
      saveDataToStorage('templates', newTemplates);
      return { templates: newTemplates };
    });
  },
  
  createTaskFromTemplate: (templateId) => {
    const template = get().templates.find((t) => t.id === templateId);
    if (!template) throw new Error('Template not found');
    const newTask: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: template.title,
      description: template.description,
      status: 'todo',
      priority: template.priority,
      tags: template.tags,
      assignees: [get().currentUser],
      attachments: [],
      notes: [],
      subtasks: template.subtasks.map((st) => ({
        ...st,
        id: `subtask_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      reminders: [],
      timeEntries: [],
      archived: false,
      estimatedHours: template.estimatedHours,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    get().addTask(newTask);
    return newTask;
  },
  
  // Statistics
  getStatistics: () => {
    const state = get();
    const tasks = state.tasks.filter((t) => !t.archived);
    const completedTasks = tasks.filter((t) => t.status === 'done');
    const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const tasksThisWeek = tasks.filter((t) => new Date(t.createdAt) >= weekAgo).length;
    const tasksThisMonth = tasks.filter((t) => new Date(t.createdAt) >= monthAgo).length;
    const overdueTasks = tasks.filter((t) => t.dueDate && new Date(t.dueDate) < now && t.status !== 'done').length;
    const totalTime = tasks.reduce((sum, t) => sum + (t.actualHours || 0), 0);
    const avgCompletionTime = completedTasks.length > 0
      ? completedTasks.reduce((sum, t) => {
          const created = new Date(t.createdAt).getTime();
          const updated = new Date(t.updatedAt).getTime();
          return sum + (updated - created);
        }, 0) / completedTasks.length / (1000 * 60 * 60) // Convert to hours
      : 0;
    const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
    const productivityScore = Math.round(
      (completionRate * 0.4) +
      ((tasksThisWeek / 7) * 10 * 0.3) +
      ((tasksThisMonth / 30) * 10 * 0.3)
    );
    
    // Calculate streak
    const sortedCompleted = completedTasks
      .filter((t) => t.status === 'done')
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    let streak = 0;
    if (sortedCompleted.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let checkDate = new Date(today);
      for (const task of sortedCompleted) {
        const taskDate = new Date(task.updatedAt);
        taskDate.setHours(0, 0, 0, 0);
        if (taskDate.getTime() === checkDate.getTime()) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else if (taskDate.getTime() < checkDate.getTime()) {
          break;
        }
      }
    }
    
    return {
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      inProgressTasks: inProgressTasks.length,
      overdueTasks,
      tasksThisWeek,
      tasksThisMonth,
      averageCompletionTime: Math.round(avgCompletionTime * 100) / 100,
      productivityScore: Math.min(100, productivityScore),
      completionRate: Math.round(completionRate * 100) / 100,
      streak,
      totalTime: Math.round(totalTime * 100) / 100,
    };
  },
  
  // Grocery List Actions
  addGroceryList: (list) => {
    set((state) => {
      const newLists = [...state.groceryLists, list];
      saveDataToStorage('groceryLists', newLists);
      return { groceryLists: newLists };
    });
  },
  
  updateGroceryList: (id, updates) => {
    set((state) => {
      const newLists = state.groceryLists.map((list) =>
        list.id === id ? { ...list, ...updates, updatedAt: new Date() } : list
      );
      saveDataToStorage('groceryLists', newLists);
      return { groceryLists: newLists };
    });
  },
  
  deleteGroceryList: (id) => {
    set((state) => {
      const newLists = state.groceryLists.filter((list) => list.id !== id);
      saveDataToStorage('groceryLists', newLists);
      return { groceryLists: newLists };
    });
  },
  
  addGroceryItem: (listId, item) => {
    set((state) => {
      const newLists = state.groceryLists.map((list) =>
        list.id === listId
          ? { ...list, items: [...list.items, item], updatedAt: new Date() }
          : list
      );
      saveDataToStorage('groceryLists', newLists);
      return { groceryLists: newLists };
    });
  },
  
  updateGroceryItem: (listId, itemId, updates) => {
    set((state) => {
      const newLists = state.groceryLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId ? { ...item, ...updates, updatedAt: new Date() } : item
              ),
              updatedAt: new Date(),
            }
          : list
      );
      saveDataToStorage('groceryLists', newLists);
      return { groceryLists: newLists };
    });
  },
  
  deleteGroceryItem: (listId, itemId) => {
    set((state) => {
      const newLists = state.groceryLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter((item) => item.id !== itemId),
              updatedAt: new Date(),
            }
          : list
      );
      saveDataToStorage('groceryLists', newLists);
      return { groceryLists: newLists };
    });
  },
  };
});


