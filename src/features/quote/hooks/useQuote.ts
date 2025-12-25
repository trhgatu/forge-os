"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Quote } from "@/shared/types/quote";
import type { MoodType } from "@/shared/types/journal";
import { getQuotes, deleteQuote, updateQuote, createQuote } from "../services/quoteService";
import type { PaginatedResponse } from "@/shared/types";
import { QuoteFilter } from "@/shared/types/dto/quote.dto";

export const QUOTE_QUERY_KEY = ["quotes"];

export function useQuotes(filter?: QuoteFilter) {
  return useInfiniteQuery<PaginatedResponse<Quote>>({
    queryKey: QUOTE_QUERY_KEY,
    queryFn: ({ pageParam = 1 }) => getQuotes(pageParam as number, 20, filter),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}

export function useCreateQuote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      content,
      author,
      source,
      tags,
      isFavorite,
      mood,
    }: {
      content: string;
      author?: string;
      source?: string;
      tags?: string[];
      isFavorite?: boolean;
      mood?: MoodType;
    }) => {
      return createQuote(content, author, source, tags, isFavorite, mood);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUOTE_QUERY_KEY });
    },
  });
}

export function useDeleteQuote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteQuote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUOTE_QUERY_KEY });
    },
  });
}

export function useUpdateQuote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      content,
      author,
      source,
      tags,
      isFavorite,
      mood,
      status,
    }: {
      id: string;
      content?: string | Record<string, unknown>;
      author?: string;
      source?: string;
      tags?: string[];
      isFavorite?: boolean;
      mood?: string;
      status?: string;
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: Record<string, any> = {};
      if (content) {
        payload.content = typeof content === "string" ? { en: content } : content;
      }
      if (author !== undefined) payload.author = author;
      if (source !== undefined) payload.source = source;
      if (tags) payload.tags = tags;
      if (mood) payload.mood = mood;

      if (status) payload.status = status;
      else if (isFavorite !== undefined) payload.status = isFavorite ? "favorite" : "internal";

      return updateQuote(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUOTE_QUERY_KEY });
    },
  });
}
