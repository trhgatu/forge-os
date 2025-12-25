import type { Quote } from "@/shared/types/quote";
import { apiClient } from "@/services/apiClient";
import type { PaginatedResponse } from "@/shared/types";
import { QuoteDto, CreateQuoteDto, QuoteFilter } from "@/shared/types/dto/quote.dto";
import { MoodType } from "@/shared/types/journal";

const mapDtoToQuote = (dto: QuoteDto): Quote => ({
  id: dto.id,
  text: dto.content,
  author: dto.author || "Unknown",
  source: dto.source,
  mood: (dto.mood as MoodType) || "neutral",
  tags: dto.tags || [],
  isFavorite: dto.status === "favorite",
  dateAdded: new Date(dto.createdAt),
  reflectionDepth: 5, // Default value
  analysis: undefined,
});

export const getQuotes = async (
  page = 1,
  limit = 20,
  filter?: QuoteFilter
): Promise<PaginatedResponse<Quote>> => {
  const res = await apiClient.get<PaginatedResponse<QuoteDto>>("/quotes", {
    params: { page, limit, ...filter },
  });
  const payload = res.data;

  return {
    meta: payload.meta,
    data: payload.data.map(mapDtoToQuote),
  };
};

export const deleteQuote = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/quotes/${id}`);
};

export const updateQuote = async (id: string, data: Partial<CreateQuoteDto>): Promise<Quote> => {
  const res = await apiClient.patch<QuoteDto>(`/admin/quotes/${id}`, data);
  return mapDtoToQuote(res.data);
};

export const createQuote = async (
  content: string,
  author?: string,
  source?: string,
  tags?: string[],
  isFavorite?: boolean,
  mood?: MoodType
): Promise<Quote> => {
  const payload: CreateQuoteDto = {
    content: { en: content }, // i18n support
    author,
    source,
    tags,
    status: isFavorite ? "favorite" : "internal",
    mood,
  };

  const res = await apiClient.post<QuoteDto>("/admin/quotes", payload);
  return mapDtoToQuote(res.data);
};

export const getRandomQuote = async (): Promise<Quote | null> => {
  try {
    const res = await apiClient.get<QuoteDto>("/quotes/random");
    if (!res.data) return null;
    return mapDtoToQuote(res.data);
  } catch (error) {
    console.error("Failed to fetch random quote", error);
    return null;
  }
};
