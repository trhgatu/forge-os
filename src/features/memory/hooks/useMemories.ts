"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Memory } from "@/shared/types/memory";
import { getMemories } from "../services/memoryService";
import { apiClient } from "@/services/apiClient";
import type { PaginatedResponse } from "@/shared/types";

export const MEMORY_QUERY_KEY = ["memories"];

export function useMemories() {
  return useQuery<PaginatedResponse<Memory>>({
    queryKey: MEMORY_QUERY_KEY,
    queryFn: getMemories,
  });
}

export type CreateMemoryPayload = Omit<Memory, "id" | "date" | "analysis" | "reflectionDepth">;

export function useCreateMemory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateMemoryPayload) => {
      const res = await apiClient.post<Memory>("/memories", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMORY_QUERY_KEY });
    },
  });
}
