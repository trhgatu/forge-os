import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getConceptsFromDb,
  getConceptDetailsFromDb,
  saveConceptToDb,
  deleteConceptFromDb,
} from '../services/knowledgeService';
import { flashcardsService, DeckDto, FlashcardDto } from '../services/flashcardsService';

// Concepts Hooks
export const useConcepts = (sourceType?: string) => {
  return useQuery({
    queryKey: ['concepts', sourceType],
    queryFn: () => getConceptsFromDb(sourceType),
    staleTime: 5000,
  });
};

export const useConceptDetail = (id: string | null) => {
  return useQuery({
    queryKey: ['conceptDetail', id],
    queryFn: () => (id ? getConceptDetailsFromDb(id) : null),
    enabled: !!id,
    staleTime: 5000,
  });
};

export const useSaveConcept = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      sourceType: 'WIKIPEDIA' | 'WEB_ARTICLE' | 'CODEX_BOOK' | 'PERSONAL_NOTE';
      sourceUrl?: string;
      content: string;
      summary?: string;
    }) => saveConceptToDb(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concepts'] });
      toast.success('Concept saved to Knowledge Nexus');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to save concept');
    },
  });
};

export const useDeleteConcept = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteConceptFromDb(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concepts'] });
      toast.success('Concept deleted from Knowledge Nexus');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete concept');
    },
  });
};

// Flashcard Decks Hooks
export const useFlashcardDecks = () => {
  return useQuery({
    queryKey: ['flashcardDecks'],
    queryFn: () => flashcardsService.getDecks(),
    staleTime: 5000,
  });
};

export const useCreateFlashcardDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; description?: string; colorTheme?: string }) =>
      flashcardsService.createDeck(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcardDecks'] });
      toast.success('Flashcard deck created successfully');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to create flashcard deck');
    },
  });
};

export const useDeleteFlashcardDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => flashcardsService.deleteDeck(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcardDecks'] });
      toast.success('Flashcard deck deleted successfully');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete flashcard deck');
    },
  });
};

// Flashcard Review Hooks
export const useForgeFlashcard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      deckId: string;
      word: string;
      conceptId?: string;
      highlightText?: string;
      personalNote?: string;
    }) => flashcardsService.forgeCard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcardDecks'] });
      queryClient.invalidateQueries({ queryKey: ['dueFlashcards'] });
      toast.success('Card successfully forged into deck');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to forge card');
    },
  });
};

export const useDueFlashcards = (deckId?: string) => {
  return useQuery({
    queryKey: ['dueFlashcards', deckId],
    queryFn: () => flashcardsService.getDueCards(deckId),
    staleTime: 5000,
  });
};

export const useReviewFlashcard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { cardId: string; rating: number; responseTimeMs: number }) =>
      flashcardsService.reviewCard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dueFlashcards'] });
      queryClient.invalidateQueries({ queryKey: ['flashcardDecks'] });
      toast.success('Card reviewed successfully');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to submit review');
    },
  });
};
