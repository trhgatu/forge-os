import type { BackendResponse } from '@forge/core';

import { apiClient } from '@/services/apiClient';

import type { Quest, Habit, Routine } from '../types';

export const gamificationApi = {
  // Quests API
  async getDailyQuests(): Promise<Quest[]> {
    const res = await apiClient.get<BackendResponse<Quest[]>>('/quests/daily');
    return res.data.data;
  },

  // Goals API
  async getUserGoals(): Promise<any[]> {
    const res = await apiClient.get<BackendResponse<any[]>>('/quests/goals');
    return res.data.data;
  },

  // Stats API
  async getUserStats(): Promise<any> {
    const res = await apiClient.get<BackendResponse<any>>('/gamification/stats');
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

  async updateHabit(id: string, dto: {
    title: string;
    description?: string;
    difficulty?: string;
    xpReward?: number;
  }): Promise<Habit> {
    const res = await apiClient.patch<BackendResponse<Habit>>(`/habits/${id}`, dto);
    return res.data.data;
  },

  async deleteHabit(id: string): Promise<void> {
    await apiClient.delete(`/habits/${id}`);
  },

  // Routines API
  async getRoutines(): Promise<Routine[]> {
    const res = await apiClient.get<BackendResponse<Routine[]>>('/routines');
    return res.data.data;
  },

  async createRoutine(dto: {
    title: string;
    comboXp?: number;
    targetTime?: string;
    frequency?: any;
  }): Promise<Routine> {
    const res = await apiClient.post<BackendResponse<Routine>>('/routines', dto);
    return res.data.data;
  },

  async addHabitToRoutine(routineId: string, dto: {
    habitId: string;
    order: number;
  }): Promise<void> {
    await apiClient.post(`/routines/${routineId}/habits`, dto);
  },

  async updateRoutine(id: string, dto: {
    title: string;
    targetTime?: string | null;
    frequency?: any | null;
  }): Promise<Routine> {
    const res = await apiClient.patch<BackendResponse<Routine>>(`/routines/${id}`, dto);
    return res.data.data;
  },

  async reorderRoutineHabits(routineId: string, orders: { habitId: string; order: number }[]): Promise<void> {
    await apiClient.put(`/routines/${routineId}/habits/reorder`, { orders });
  },

  async completeRoutine(id: string): Promise<void> {
    await apiClient.post(`/routines/${id}/complete`);
  },

  async deleteRoutine(id: string): Promise<void> {
    await apiClient.delete(`/routines/${id}`);
  }
};
