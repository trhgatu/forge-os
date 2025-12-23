"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Memory } from "@/shared/types/memory";
import { getMemories } from "../services/memoryService";
import { apiClient } from "@/services/apiClient";
import type { PaginatedResponse } from "@/shared/types";

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

export type CreateMemoryPayload = Omit<Memory, "id" | "date" | "analysis" | "reflectionDepth">;

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
