import { create } from 'zustand';

import { flashcardsService, type DeckDto, type FlashcardDto } from '@/features/knowledge/services/flashcardsService';

interface FlashcardState {
  decks: DeckDto[];
  dueCards: FlashcardDto[];
  activeDeckId: string | null;
  isLoading: boolean;

  // Actions
  loadDecks: () => Promise<void>;
  createDeck: (title: string, description?: string, colorTheme?: string) => Promise<void>;
  deleteDeck: (id: string) => Promise<void>;
  forgeCard: (data: {
    deckId: string;
    word: string;
    conceptId?: string;
    highlightText?: string;
    personalNote?: string;
  }) => Promise<FlashcardDto>;
  loadDueCards: (deckId?: string) => Promise<void>;
  submitReview: (cardId: string, rating: number, responseTimeMs: number) => Promise<void>;
  setActiveDeck: (deckId: string | null) => void;
}

export const useFlashcardStore = create<FlashcardState>((set, get) => ({
  decks: [],
  dueCards: [],
  activeDeckId: null,
  isLoading: false,

  loadDecks: async () => {
    set({ isLoading: true });
    try {
      const decks = await flashcardsService.getDecks();
      set({ decks });
    } catch (e) {
      console.error('Failed to load decks:', e);
    } finally {
      set({ isLoading: false });
    }
  },

  createDeck: async (title, description, colorTheme) => {
    set({ isLoading: true });
    try {
      const newDeck = await flashcardsService.createDeck({ title, description, colorTheme });
      set((state) => ({ decks: [...state.decks, newDeck] }));
    } catch (e) {
      console.error('Failed to create deck:', e);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteDeck: async (id) => {
    set({ isLoading: true });
    try {
      await flashcardsService.deleteDeck(id);
      set((state) => ({
        decks: state.decks.filter((d) => d.id !== id),
        activeDeckId: state.activeDeckId === id ? null : state.activeDeckId,
      }));
    } catch (e) {
      console.error('Failed to delete deck:', e);
    } finally {
      set({ isLoading: false });
    }
  },

  forgeCard: async (data) => {
    try {
      const card = await flashcardsService.forgeCard(data);
      // Update local deck count
      set((state) => ({
        decks: state.decks.map((d) => {
          if (d.id === data.deckId) {
            return {
              ...d,
              _count: {
                cards: (d._count?.cards ?? 0) + 1,
              },
            };
          }
          return d;
        }),
      }));
      return card;
    } catch (e) {
      console.error('Failed to forge card:', e);
      throw e;
    }
  },

  loadDueCards: async (deckId) => {
    set({ isLoading: true });
    try {
      const dueCards = await flashcardsService.getDueCards(deckId);
      set({ dueCards });
    } catch (e) {
      console.error('Failed to load due cards:', e);
    } finally {
      set({ isLoading: false });
    }
  },

  submitReview: async (cardId, rating, responseTimeMs) => {
    try {
      await flashcardsService.reviewCard({ cardId, rating, responseTimeMs });
      // Remove reviewed card from local queue
      set((state) => ({
        dueCards: state.dueCards.filter((c) => c.id !== cardId),
      }));
    } catch (e) {
      console.error('Failed to submit review:', e);
    }
  },

  setActiveDeck: (deckId) => {
    set({ activeDeckId: deckId });
  },
}));
