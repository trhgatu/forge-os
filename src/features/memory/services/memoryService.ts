import type { Memory, CreateMemoryPayload } from "@/shared/types/memory";
import { apiClient } from "@/services/apiClient";
import type { PaginatedResponse } from "@/shared/types";
import { MemoryDto } from "@/shared/types/dto/memory.dto";

const mapDtoToMemory = (dto: MemoryDto): Memory => ({
  id: dto.id,
  title: dto.title,
  content: dto.content,
  mood: dto.mood,
  tags: dto.tags,
  date: new Date(dto.createdAt),
  type: "moment",
  reflectionDepth: 0,
  analysis: undefined, // Analysis is not part of DTO yet
  imageUrl: undefined, // Image URL is not part of DTO yet
});

export const getMemories = async (
  lang?: string,
  page = 1,
  limit = 12
): Promise<PaginatedResponse<Memory>> => {
  const res = await apiClient.get<PaginatedResponse<MemoryDto>>("/memories", {
    params: { lang, page, limit },
  });
  const payload = res.data;

  return {
    meta: payload.meta,
    data: payload.data.map(mapDtoToMemory),
  };
};

export const deleteMemory = async (id: string): Promise<void> => {
  await apiClient.delete(`/memories/${id}`);
};

export const updateMemory = async (
  id: string,
  payload: Partial<CreateMemoryPayload>,
  language: string
): Promise<Memory> => {
  // Backend expects i18n structure for updates too, similar to create
  const formattedPayload = {
    ...payload,
    // If title is being updated, wrap it in i18n object
    ...(payload.title !== undefined && { title: { [language]: payload.title } }),
    // If content is being updated
    ...(payload.content !== undefined && { content: { [language]: payload.content } }),
  };

  const res = await apiClient.put<MemoryDto>(`/memories/${id}`, formattedPayload);
  return mapDtoToMemory(res.data);
};
