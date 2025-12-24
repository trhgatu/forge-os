import { apiClient } from "@/services/apiClient";
import type { PaginatedResponse } from "@/shared/types";
import type { MoodEntry } from "@/shared/types/mood";

export interface CreateMoodDto {
  mood: string;
  intensity?: number;
  note?: string;
  tags?: string[];
  loggedAt?: string; // ISO Date
}

export interface MoodFilter {
  page?: number;
  limit?: number;
  mood?: string;
  tags?: string[];
  from?: string;
  to?: string;
}

interface RawMoodItem {
  id: string;
  mood: string;
  intensity?: number;
  note?: string;
  tags?: string[];
  loggedAt: string;
}

export const moodService = {
  getAll: async (filter?: MoodFilter): Promise<PaginatedResponse<MoodEntry>> => {
    const res = await apiClient.get<PaginatedResponse<RawMoodItem>>("/moods", {
      params: filter,
    });

    // Map backend response to frontend model
    const mappedData: MoodEntry[] = res.data.data.map((item) => ({
      id: item.id,
      mood: item.mood as MoodEntry["mood"], // Cast to MoodType
      intensity: item.intensity ?? 5, // Default if missing
      note: item.note || "",
      tags: item.tags || [],
      date: new Date(item.loggedAt), // Map loggedAt -> date
    }));

    return {
      data: mappedData,
      meta: res.data.meta,
    };
  },

  create: async (data: CreateMoodDto): Promise<MoodEntry> => {
    const res = await apiClient.post<RawMoodItem>("/admin/moods", data);
    return {
      id: res.data.id,
      mood: res.data.mood as MoodEntry["mood"],
      intensity: res.data.intensity ?? 5,
      note: res.data.note || "",
      tags: res.data.tags || [],
      date: new Date(res.data.loggedAt),
    };
  },

  update: async (id: string, data: Partial<CreateMoodDto>): Promise<MoodEntry> => {
    const res = await apiClient.patch<RawMoodItem>(`/admin/moods/${id}`, data);
    return {
      id: res.data.id,
      mood: res.data.mood as MoodEntry["mood"],
      intensity: res.data.intensity || 5,
      note: res.data.note || "",
      tags: res.data.tags || [],
      date: new Date(res.data.loggedAt),
    };
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/moods/${id}`);
  },
};
