import { apiClient } from '@/services/apiClient';
import { Quest, Habit, Routine } from '../types';
import type { BackendResponse } from '@forge/core';

export const gamificationApi = {
  // Quests API
  async getDailyQuests(): Promise<Quest[]> {
    const res = await apiClient.get<BackendResponse<Quest[]>>('/quests/daily');
    return res.data.data;
  },

  // Habits API
  async getHabits(): Promise<Habit[]> {
    const res = await apiClient.get<BackendResponse<Habit[]>>('/habits');
    return res.data.data;
  },

  async createHabit(dto: {
    title: string;
    description?: string;
    xpReward?: number;
    difficulty?: string;
    frequency?: any;
  }): Promise<Habit> {
    const res = await apiClient.post<BackendResponse<Habit>>('/habits', dto);
    return res.data.data;
  },

  async completeHabit(id: string): Promise<void> {
    await apiClient.post(`/habits/${id}/complete`);
  },

  // Routines API
  async getRoutines(): Promise<Routine[]> {
    const res = await apiClient.get<BackendResponse<Routine[]>>('/routines');
    return res.data.data;
  },

  async createRoutine(dto: {
    title: string;
    comboXp?: number;
  }): Promise<Routine> {
    const res = await apiClient.post<BackendResponse<Routine>>('/routines', dto);
    return res.data.data;
  },

  async addHabitToRoutine(routineId: string, dto: {
    habitId: string;
    order: number;
  }): Promise<void> {
    await apiClient.post(`/routines/${routineId}/habits`, dto);
  }
};
