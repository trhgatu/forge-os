import type { BackendResponse, PaginatedResponse } from '@forge/core';

import { apiClient } from '@/services/apiClient';
import type { MemoryDto } from '@/shared/types/dto/memory.dto';
import type { Memory, CreateMemoryPayload } from '@/shared/types/memory';

const mapDtoToMemory = (dto: MemoryDto): Memory => ({
  id: dto.id,
  title: dto.title,
  content: dto.content,
  mood: dto.mood,
  tags: dto.tags,
  date: new Date(dto.createdAt),
  type: (dto.type as any) || 'moment',
  reflectionDepth: 0,
  analysis: undefined,
  imageUrl: dto.imageUrl,
});

export const getMemories = async (
  lang?: string,
  page = 1,
  limit = 12,
): Promise<PaginatedResponse<Memory>> => {
  const res = await apiClient.get<BackendResponse<PaginatedResponse<MemoryDto>>>('/memories', {
    params: { lang, page, limit },
  });
  const { data, meta } = res.data as any;

  return {
    meta: meta || { total: 0, page: 1, limit: 12, totalPages: 1 },
    data: (data || []).map(mapDtoToMemory),
  };
};

export const deleteMemory = async (id: string): Promise<void> => {
  await apiClient.delete(`/memories/${id}`);
};

export const updateMemory = async (
  id: string,
  payload: Partial<CreateMemoryPayload>,
  language: string,
): Promise<Memory> => {
  const formattedPayload = {
    ...payload,
    ...(payload.title !== undefined && { title: { [language]: payload.title } }),
    ...(payload.content !== undefined && { content: { [language]: payload.content } }),
  };

  const res = await apiClient.put<BackendResponse<MemoryDto>>(`/memories/${id}`, formattedPayload);
  return mapDtoToMemory(res.data.data);
};

export const uploadMemoryImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await apiClient.post<{ data: { url: string } } | { url: string }>('/memories/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  const data = res.data as any;
  return data.data?.url || data.url;
};


