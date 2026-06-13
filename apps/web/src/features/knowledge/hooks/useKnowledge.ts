import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  getConceptsFromDb,
  getConceptDetailsFromDb,
  saveConceptToDb,
  deleteConceptFromDb,
  updateConceptInDb,
} from '../services/knowledgeService';

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

export const useUpdateConcept = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      id: string;
      title?: string;
      content?: string;
      summary?: string;
    }) => updateConceptInDb(data.id, { title: data.title, content: data.content, summary: data.summary }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concepts'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update chronicle');
    },
  });
};
