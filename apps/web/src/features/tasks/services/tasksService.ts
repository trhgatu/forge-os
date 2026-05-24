import type { BackendResponse } from '@forge/core';

import { apiClient } from '@/services/apiClient';

import type { Task, CreateTaskInput, UpdateTaskInput } from '../types';

export const tasksService = {
  async getTasks(): Promise<Task[]> {
    const res = await apiClient.get<BackendResponse<Task[]>>('/tasks');
    return res.data.data;
  },

  async createTask(data: CreateTaskInput): Promise<Task> {
    const res = await apiClient.post<BackendResponse<Task>>('/tasks', data);
    return res.data.data;
  },

  async updateTask(id: string, data: UpdateTaskInput): Promise<Task> {
    const res = await apiClient.put<BackendResponse<Task>>(`/tasks/${id}`, data);
    return res.data.data;
  },

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  },
};
