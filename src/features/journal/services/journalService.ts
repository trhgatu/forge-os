import { apiClient } from "@/services/apiClient";
import type { BackendResponse, PaginatedResponse } from "@/shared/types/api";
import { MoodType } from "@/shared/types/journal";
import type { CreateJournalDto, JournalEntry, JournalFilter, RawJournalItem } from "../types";
import { JournalStatus, JournalType } from "../types";

export const journalService = {
  getAll: async (filter?: JournalFilter): Promise<PaginatedResponse<JournalEntry>> => {
    const res = await apiClient.get<PaginatedResponse<RawJournalItem>>("/admin/journals", {
      params: filter,
    });

    // Map Backend Raw Item to Frontend Entity
    const mappedData: JournalEntry[] = res.data.data.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      mood: (item.mood as MoodType) || undefined,
      tags: item.tags || [],
      type: (item.type as JournalType) || JournalType.NOTE,
      status: (item.status as JournalStatus) || JournalStatus.PUBLISHED,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return {
      data: mappedData,
      meta: res.data.meta,
    };
  },

  getById: async (id: string): Promise<JournalEntry> => {
    const res = await apiClient.get<BackendResponse<RawJournalItem>>(`/admin/journals/${id}`);
    const item = res.data.data;
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      mood: (item.mood as MoodType) || undefined,
      tags: item.tags || [],
      type: (item.type as JournalType) || JournalType.NOTE,
      status: (item.status as JournalStatus) || JournalStatus.PUBLISHED,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  },

  create: async (data: CreateJournalDto): Promise<JournalEntry> => {
    const res = await apiClient.post<BackendResponse<RawJournalItem>>("/admin/journals", data);
    // Backend creates it via CQRS handler, returns result.
    // Usually NestJS CommandBus returns the created ID or Entity.
    // Assuming standard ForgeOS backend response wrapper.
    const item = res.data.data;

    return {
      id: item.id,
      title: item.title,
      content: item.content,
      mood: (item.mood as MoodType) || undefined,
      tags: item.tags || [],
      type: (item.type as JournalType) || JournalType.NOTE,
      status: (item.status as JournalStatus) || JournalStatus.PUBLISHED,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  },

  update: async (id: string, data: Partial<CreateJournalDto>): Promise<JournalEntry> => {
    const res = await apiClient.patch<BackendResponse<RawJournalItem>>(
      `/admin/journals/${id}`,
      data
    );
    const item = res.data.data;
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      mood: (item.mood as MoodType) || undefined,
      tags: item.tags || [],
      type: (item.type as JournalType) || JournalType.NOTE,
      status: (item.status as JournalStatus) || JournalStatus.PUBLISHED,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/journals/${id}`);
  },
};
