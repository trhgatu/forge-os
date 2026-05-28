import type { BackendResponse } from '@forge/core';

import { apiClient } from '@/services/apiClient';

import type { Goal } from '../types';

export const goalsService = {
  getAll: async (): Promise<Goal[]> => {
    const res = await apiClient.get<BackendResponse<Goal[]>>('/goals');
    return res.data.data;
  },

  getById: async (id: string): Promise<Goal> => {
    const res = await apiClient.get<BackendResponse<Goal>>(`/goals/${id}`);
    return res.data.data;
  },

  create: async (data: {
    title: string;
    description: string;
    xpReward: number;
    badgeIcon: string;
    objectives: Array<{
      type: string;
      targetCount: number;
      referenceId: string | null;
    }>;
  }): Promise<Goal> => {
    const res = await apiClient.post<BackendResponse<Goal>>('/goals', data);
    return res.data.data;
  },

  update: async (
    id: string,
    data: {
      title: string;
      description: string;
      xpReward: number;
      badgeIcon: string;
      isActive?: boolean;
      objectives: Array<{
        type: string;
        targetCount: number;
        referenceId: string | null;
      }>;
    },
  ): Promise<Goal> => {
    const res = await apiClient.put<BackendResponse<Goal>>(`/goals/${id}`, data);
    return res.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/goals/${id}`);
  },
};
