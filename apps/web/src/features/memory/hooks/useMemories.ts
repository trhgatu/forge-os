'use client';

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useLanguage } from '@/contexts/LanguageContext';
import { apiClient } from '@/services/apiClient';
import type { PaginatedResponse } from '@/shared/types';
import type { Memory, CreateMemoryPayload } from '@/shared/types/memory';

import { getMemories, deleteMemory, updateMemory } from '../services/memoryService';

export const MEMORY_QUERY_KEY = ['memories'];

export function useMemories() {
  const { language } = useLanguage();

  return useInfiniteQuery<PaginatedResponse<Memory>>({
    queryKey: [...MEMORY_QUERY_KEY, language],
    queryFn: ({ pageParam = 1 }) => getMemories(language, pageParam as number),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}

export function useCreateMemory() {
  const queryClient = useQueryClient();
  const { language } = useLanguage();

  return useMutation({
    mutationFn: async (payload: CreateMemoryPayload) => {
      const formattedPayload = {
        ...payload,
        title: { [language]: payload.title },
        content: { [language]: payload.content },
      };

      const res = await apiClient.post<any>('/memories', formattedPayload);
      const dto = res.data;
      return {
        id: dto.id,
        title: dto.title,
        content: dto.content,
        mood: dto.mood,
        tags: dto.tags ?? [],
        date: new Date(dto.createdAt),
        type: dto.type || 'moment',
        imageUrl: dto.imageUrl,
        reflectionDepth: 0,
      } as Memory;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...MEMORY_QUERY_KEY, language] });
      queryClient.invalidateQueries({ queryKey: MEMORY_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
    },
  });
}

export function useDeleteMemory() {
  const queryClient = useQueryClient();
  const { language } = useLanguage();

  return useMutation({
    mutationFn: (id: string) => deleteMemory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...MEMORY_QUERY_KEY, language] });
      queryClient.invalidateQueries({ queryKey: MEMORY_QUERY_KEY });
    },
  });
}

export function useUpdateMemory() {
  const queryClient = useQueryClient();
  const { language } = useLanguage();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateMemoryPayload> }) =>
      updateMemory(id, payload, language),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...MEMORY_QUERY_KEY, language] });
      queryClient.invalidateQueries({ queryKey: MEMORY_QUERY_KEY });
    },
  });
}


