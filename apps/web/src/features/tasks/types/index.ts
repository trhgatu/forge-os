export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  xpReward: number;
  dueDate: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  xpReward?: number;
  dueDate?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'todo' | 'in_progress' | 'done';
  xpReward?: number;
  dueDate?: string;
}
