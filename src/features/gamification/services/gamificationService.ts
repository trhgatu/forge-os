import { apiClient } from "@/services/apiClient";
import { UserStats } from "../types";

export const gamificationService = {
  getStats: async (): Promise<UserStats | null> => {
    const res = await apiClient.get<UserStats>("/gamification/stats");
    return {
      ...res.data,
    };
  },
};
