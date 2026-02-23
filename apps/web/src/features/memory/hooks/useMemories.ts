"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useLanguage } from "@/contexts/LanguageContext";
import { apiClient } from "@/services/apiClient";
import type { PaginatedResponse } from "@/shared/types";
import type { Memory, CreateMemoryPayload } from "@/shared/types/memory";

import { getMemories, deleteMemory, updateMemory } from "../services/memoryService";

export const MEMORY_QUERY_KEY = ["memories"];

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
      // Backend expects { title: { en: "..." }, content: { en: "..." } } for i18n fields
      const formattedPayload = {
        ...payload,
        title: { [language]: payload.title },
        content: { [language]: payload.content },
      };

      const res = await apiClient.post<Memory>("/memories", formattedPayload);
      return res.data;
    },
    onSuccess: () => {
      // Invalidate specific language query
      queryClient.invalidateQueries({ queryKey: [...MEMORY_QUERY_KEY, language] });
      // Also invalidate general queries if necessary, but specificity is better
      queryClient.invalidateQueries({ queryKey: MEMORY_QUERY_KEY });
    },
  });
}

export function useDeleteMemory() {
  const queryClient = useQueryClient();
  const { language } = useLanguage();

  return useMutation({
    mutationFn: (id: string) => deleteMemory(id),
    onSuccess: () => {
      // Invalidate specific language query
      queryClient.invalidateQueries({ queryKey: [...MEMORY_QUERY_KEY, language] });
      // Invalidate general queries
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
