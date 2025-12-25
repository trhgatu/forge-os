import { apiClient } from "@/services/apiClient";
import type { PaginatedResponse } from "@/shared/types/api";
import { MoodType } from "@/shared/types/journal";
import type { CreateJournalDto, JournalEntry, JournalFilter, RawJournalItem } from "../types";
import { JournalStatus, JournalType } from "../types";

export const journalService = {
  // Public endpoints for reading
  getAll: async (filter?: JournalFilter): Promise<PaginatedResponse<JournalEntry>> => {
    const res = await apiClient.get<PaginatedResponse<RawJournalItem>>("/journals", {
      params: filter,
    });

    // Map Backend Raw Item to Frontend Entity
    const mappedData: JournalEntry[] = res.data.data.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      mood: (item.mood as MoodType) || undefined,
      tags: item.tags || [],
      type: (item.type as JournalType) || JournalType.THOUGHT,
      status: (item.status as JournalStatus) || JournalStatus.PRIVATE,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      date: new Date(item.createdAt),
    }));

    return {
      data: mappedData,
      meta: res.data.meta,
    };
  },

  getById: async (id: string): Promise<JournalEntry> => {
    const res = await apiClient.get<RawJournalItem>(`/journals/${id}`);
    const item = res.data;
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      mood: (item.mood as MoodType) || undefined,
      tags: item.tags || [],
      type: (item.type as JournalType) || JournalType.THOUGHT,
      status: (item.status as JournalStatus) || JournalStatus.PRIVATE,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      date: new Date(item.createdAt),
    };
  },

  // Admin endpoints for mutations (require auth)
  create: async (data: CreateJournalDto): Promise<JournalEntry> => {
    try {
      const res = await apiClient.post<RawJournalItem>("/admin/journals", data);

      const item = res.data;

      if (!item) {
        throw new Error("Backend returned no data");
      }

      return {
        id: item.id,
        title: item.title,
        content: item.content,
        mood: (item.mood as MoodType) || undefined,
        tags: item.tags || [],
        type: (item.type as JournalType) || JournalType.THOUGHT,
        status: (item.status as JournalStatus) || JournalStatus.PRIVATE,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        date: new Date(item.createdAt),
      };
    } catch (error) {
      console.error("Create Journal Error:", error);
      throw error;
    }
  },

  update: async (id: string, data: Partial<CreateJournalDto>): Promise<JournalEntry> => {
    const res = await apiClient.patch<RawJournalItem>(`/admin/journals/${id}`, data);
    const item = res.data;
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      mood: (item.mood as MoodType) || undefined,
      tags: item.tags || [],
      type: (item.type as JournalType) || JournalType.THOUGHT,
      status: (item.status as JournalStatus) || JournalStatus.PRIVATE,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      date: new Date(item.createdAt),
    };
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/journals/${id}`);
  },
};
