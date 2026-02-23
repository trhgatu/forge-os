import { apiClient } from "@/services/apiClient";

import type { UserStats } from "../types";

export const gamificationService = {
  getStats: async (): Promise<UserStats | null> => {
    const res = await apiClient.get<UserStats>("/gamification/stats");
    return {
      ...res.data,
      lastActivityDate: new Date(res.data.lastActivityDate),
    };
  },
};
