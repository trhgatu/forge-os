import type { MoodType } from "@/shared/types/journal";

export interface QuoteDto {
  id: string;
  content: string;
  author?: string;
  source?: string;
  tags: string[];
  mood?: MoodType;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuoteDto {
  content: { [lang: string]: string };
  author?: string;
  source?: string;
  tags?: string[];
  status?: string;
  mood?: MoodType;
}

export interface UpdateQuoteDto {
  content?: { [lang: string]: string };
  author?: string;
  source?: string;
  tags?: string[];
  status?: string;
  mood?: MoodType;
}

export interface QuoteFilter {
  page?: number;
  limit?: number;
  tags?: string[];
  author?: string;
}
