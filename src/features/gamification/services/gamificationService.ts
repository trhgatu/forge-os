import { apiClient } from "@/services/apiClient";
import { UserStats } from "../types";

export const gamificationService = {
    getStats: async (): Promise<UserStats | null> => {
        try {
            const res = await apiClient.get<UserStats>("/gamification/stats");
            // Convert date strings to Date objects
            return {
                ...res.data,
                lastActivityDate: new Date(res.data.lastActivityDate),
            };
        } catch (error) {
            console.error("Failed to fetch gamification stats", error);
            return null;
        }
    },
};
