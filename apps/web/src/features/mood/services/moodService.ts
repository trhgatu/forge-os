import type { BackendResponse, PaginatedResponse } from '@forge/core';

import { apiClient } from '@/services/apiClient';
import type { MoodEntry } from '@/shared/types/mood';

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
    const res = await apiClient.get<BackendResponse<RawMoodItem[]>>('/moods', {
      params: filter,
    });

    const { data: items, meta } = res.data;

    const mappedData: MoodEntry[] = items.map((item: RawMoodItem) => ({
      id: item.id,
      mood: item.mood as MoodEntry['mood'],
      intensity: item.intensity ?? 5,
      note: item.note || '',
      tags: item.tags || [],
      date: new Date(item.loggedAt),
    }));

    return {
      data: mappedData,
      meta: meta as any,
    };
  },

  create: async (data: CreateMoodDto): Promise<MoodEntry> => {
    const res = await apiClient.post<BackendResponse<RawMoodItem>>('/admin/moods', data);
    const item = res.data.data;
    return {
      id: item.id,
      mood: item.mood as MoodEntry['mood'],
      intensity: item.intensity ?? 5,
      note: item.note || '',
      tags: item.tags || [],
      date: new Date(item.loggedAt),
    };
  },

  update: async (id: string, data: Partial<CreateMoodDto>): Promise<MoodEntry> => {
    const res = await apiClient.patch<BackendResponse<RawMoodItem>>(`/admin/moods/${id}`, data);
    const item = res.data.data;
    return {
      id: item.id,
      mood: item.mood as MoodEntry['mood'],
      intensity: item.intensity ?? 5,
      note: item.note || '',
      tags: item.tags || [],
      date: new Date(item.loggedAt),
    };
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/moods/${id}`);
  },
};
