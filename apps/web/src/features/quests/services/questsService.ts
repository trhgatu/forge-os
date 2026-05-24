import type { BackendResponse } from '@forge/core';

import { apiClient } from '@/services/apiClient';

import type { Quest } from '../types';

export const questsService = {
  getAll: async (filter?: { type?: string; isActive?: boolean }): Promise<Quest[]> => {
    const params = new URLSearchParams();
    if (filter?.type) params.append('type', filter.type);
    if (filter?.isActive !== undefined) {
      params.append('isActive', String(filter.isActive));
    } else {
      params.append('isActive', 'true');
    }

    const res = await apiClient.get<BackendResponse<Quest[]>>(`/admin/quests?${params.toString()}`);
    return res.data.data;
  },

  create: async (data: {
    title: string;
    description: string;
    type: string;
    xpReward: number;
    objectives: Array<{
      type: string;
      targetCount: number;
      referenceType: string;
      referenceId: string | null;
    }>;
  }): Promise<Quest> => {
    const res = await apiClient.post<BackendResponse<Quest>>('/admin/quests', data);
    return res.data.data;
  },

  update: async (
    id: string,
    data: {
      title: string;
      description: string;
      type: string;
      xpReward: number;
      objectives: Array<{
        type: string;
        targetCount: number;
        referenceType: string;
        referenceId: string | null;
      }>;
    },
  ): Promise<Quest> => {
    const res = await apiClient.put<BackendResponse<Quest>>(`/admin/quests/${id}`, data);
    return res.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/quests/${id}`);
  },
};
