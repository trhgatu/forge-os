import type { Memory } from "@/shared/types/memory";
import { apiClient } from "@/services/apiClient";
import type { PaginatedResponse } from "@/shared/types";
import { MemoryDto } from "@/shared/types/dto/memory.dto";

export const getMemories = async (): Promise<PaginatedResponse<Memory>> => {
  const res = await apiClient.get<PaginatedResponse<MemoryDto>>("/memories");
  const payload = res.data;

  return {
    meta: payload.meta,
    data: payload.data.map((dto) => ({
      id: dto.id,
      title: dto.title,
      content: dto.content,
      mood: dto.mood,
      tags: dto.tags,
      date: new Date(dto.createdAt),
      type: "moment",
      reflectionDepth: 0,
      analysis: undefined,
      imageUrl: undefined,
    })),
  };
};
