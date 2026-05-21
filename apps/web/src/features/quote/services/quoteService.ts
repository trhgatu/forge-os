import type { BackendResponse, PaginatedResponse } from '@forge/core';
import type { MoodType } from '@forge/reflection';

import { apiClient } from '@/services/apiClient';
import type { QuoteDto, CreateQuoteDto, QuoteFilter } from '@/shared/types/dto/quote.dto';
import type { Quote } from '@/shared/types/quote';

const mapDtoToQuote = (dto: QuoteDto): Quote => {
  if (!dto) {
    return {
      id: 'fallback',
      text: 'The only limit to our realization of tomorrow will be our doubts of today.',
      author: 'Franklin D. Roosevelt',
      mood: 'neutral',
      tags: [],
      isFavorite: false,
      dateAdded: new Date(),
      reflectionDepth: 5,
    };
  }
  return {
    id: dto.id,
    text: dto.content,
    author: dto.author || 'Unknown',
    source: dto.source,
    mood: (dto.mood as MoodType) || 'neutral',
    tags: dto.tags || [],
    isFavorite: dto.status === 'favorite',
    dateAdded: new Date(dto.createdAt),
    reflectionDepth: 5, // Default value
    analysis: undefined,
  };
};

export const getRandomQuote = async (): Promise<Quote> => {
  const res = await apiClient.get<BackendResponse<QuoteDto>>('/quotes/random');
  return mapDtoToQuote(res.data.data);
};

export const getQuotes = async (
  page = 1,
  limit = 20,
  filter?: QuoteFilter,
): Promise<PaginatedResponse<Quote>> => {
  const res = await apiClient.get<BackendResponse<PaginatedResponse<QuoteDto>>>('/quotes', {
    params: { page, limit, ...filter },
  });

  const paginated = res.data.data;
  return {
    ...paginated,
    data: paginated.data.map(mapDtoToQuote),
  };
};

export const createQuote = async (data: CreateQuoteDto): Promise<Quote> => {
  const res = await apiClient.post<BackendResponse<QuoteDto>>('/quotes', data);
  return mapDtoToQuote(res.data.data);
};

export const updateQuote = async (id: string, data: Partial<CreateQuoteDto>): Promise<Quote> => {
  const res = await apiClient.patch<BackendResponse<QuoteDto>>(`/quotes/${id}`, data);
  return mapDtoToQuote(res.data.data);
};

export const deleteQuote = async (id: string): Promise<void> => {
  await apiClient.delete(`/quotes/${id}`);
};

export const getDailyQuote = async (): Promise<Quote> => {
  const res = await apiClient.get<BackendResponse<QuoteDto>>('/quotes/random');
  return mapDtoToQuote(res.data.data);
};

export const quoteService = {
  getAll: getQuotes,
  create: createQuote,
  update: updateQuote,
  delete: deleteQuote,
  getDailyQuote,
};
