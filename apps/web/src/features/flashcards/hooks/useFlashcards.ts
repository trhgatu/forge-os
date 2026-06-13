import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { flashcardsService } from '../services/flashcardsService';

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
