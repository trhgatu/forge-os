import type { BackendResponse } from '@forge/core';

import { apiClient } from '@/services/apiClient';

import type { UserStats } from '../types';

export const gamificationService = {
  getStats: async (): Promise<UserStats | null> => {
    const res = await apiClient.get<BackendResponse<UserStats>>('/gamification/stats');
    return {
      ...res.data.data,
      lastActivityDate: new Date(res.data.data.lastActivityDate),
    };
  },
};


