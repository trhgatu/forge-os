import type { BackendResponse } from '@forge/core';

import { apiClient } from '@/services/apiClient';

export interface DeckDto {
  id: string;
  title: string;
  description?: string;
  colorTheme?: string;
  createdAt: string;
  _count?: {
    cards: number;
  };
}

export interface VocabularyDto {
  id: string;
  word: string;
  ipa?: string;
  audioUrl?: string;
  partOfSpeech: string;
  meanings: any;
  examples: any;
}

export interface FlashcardDto {
  id: string;
  deckId: string;
  vocabularyId?: string;
  conceptId?: string;
  customFront?: string;
  customBack?: string;
  highlightText?: string;
  personalNote?: string;
  state: string;
  interval: number;
  easiness: number;
  repetitions: number;
  nextReviewDate: string;
  vocabulary?: VocabularyDto;
  concept?: { id: string; title: string };
}

export const flashcardsService = {
  getDecks: async (): Promise<DeckDto[]> => {
    const res = await apiClient.get<BackendResponse<DeckDto[]>>('/flashcards/decks');
    return res.data.data;
  },

  createDeck: async (data: { title: string; description?: string; colorTheme?: string }): Promise<DeckDto> => {
    const res = await apiClient.post<BackendResponse<DeckDto>>('/flashcards/decks', data);
    return res.data.data;
  },

  deleteDeck: async (id: string): Promise<void> => {
    await apiClient.delete(`/flashcards/decks/${id}`);
  },

  forgeCard: async (data: {
    deckId: string;
    word: string;
    conceptId?: string;
    highlightText?: string;
    personalNote?: string;
  }): Promise<FlashcardDto> => {
    const res = await apiClient.post<BackendResponse<FlashcardDto>>('/flashcards/forge', data);
    return res.data.data;
  },

  getDueCards: async (deckId?: string): Promise<FlashcardDto[]> => {
    const params = deckId ? `?deckId=${deckId}` : '';
    const res = await apiClient.get<BackendResponse<FlashcardDto[]>>(`/flashcards/due${params}`);
    return res.data.data;
  },

  reviewCard: async (data: {
    cardId: string;
    rating: number; // 1 to 4
    responseTimeMs: number;
  }): Promise<FlashcardDto> => {
    const res = await apiClient.post<BackendResponse<FlashcardDto>>('/flashcards/review', data);
    return res.data.data;
  },
};
