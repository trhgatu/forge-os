import { apiClient } from "@/services/apiClient";
import { UserStats } from "../types";

export const gamificationService = {
  getStats: async (): Promise<UserStats | null> => {
    const res = await apiClient.get<UserStats>("/gamification/stats");
    return {
      userId: res.data.userId,
      props: {
        ...res.data.props,
        lastActivityDate: new Date(res.data.props.lastActivityDate),
      },
    };
  },
};
