import type { BackendResponse, PaginatedResponse } from '@forge/core';
import type { MoodType } from '@forge/reflection';

import { apiClient } from '@/services/apiClient';

import type { CreateJournalDto, JournalEntry, JournalFilter, RawJournalItem } from '../types';
import { JournalStatus, JournalType } from '../types';

export const journalService = {
  getAll: async (filter?: JournalFilter): Promise<PaginatedResponse<JournalEntry>> => {
    const res = await apiClient.get<BackendResponse<RawJournalItem[]>>('/journals', {
      params: filter,
    });

    const { data: items, meta } = res.data;

    return {
      data: items.map((item: RawJournalItem) => ({
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
        analysis: item.analysis,
      })),
      meta: meta as any,
    };
  },

  getById: async (id: string): Promise<JournalEntry> => {
    const res = await apiClient.get<BackendResponse<RawJournalItem>>(`/journals/${id}`);
    const item = res.data.data;

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
      analysis: item.analysis,
    };
  },

  create: async (data: CreateJournalDto): Promise<JournalEntry> => {
    const res = await apiClient.post<BackendResponse<RawJournalItem>>('/journals', data);
    const item = res.data.data;

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
      analysis: item.analysis,
    };
  },

  update: async (id: string, data: Partial<CreateJournalDto>): Promise<JournalEntry> => {
    const res = await apiClient.put<BackendResponse<RawJournalItem>>(`/journals/${id}`, data);
    const item = res.data.data;

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
      analysis: item.analysis,
    };
  },

  delete: async (id: string): Promise<void> => {
    if (!id) {
      console.error('Attempted to delete journal without an ID');
      return;
    }
    await apiClient.delete(`/journals/${id}`);
  },

  analyze: async (id: string): Promise<JournalEntry> => {
    const res = await apiClient.post<BackendResponse<RawJournalItem>>(`/journals/${id}/analyze`);
    const item = res.data.data;

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
      analysis: item.analysis,
    };
  },
};
