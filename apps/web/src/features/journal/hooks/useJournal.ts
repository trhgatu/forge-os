import type { PaginatedResponse } from '@forge/core';
import type { JournalEntry } from '@forge/reflection';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';


import { journalService } from '../services/journalService';
import type { CreateJournalDto, JournalFilter } from '../types';

export const useJournals = (filter?: JournalFilter) => {
  return useQuery({
    queryKey: ['journals', filter],
    queryFn: async () => {
      const result = await journalService.getAll(filter);
      return result;
    },
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

export const useJournal = (id: string) => {
  return useQuery({
    queryKey: ['journal', id],
    queryFn: () => journalService.getById(id),
    enabled: !!id,
  });
};

export const useCreateJournal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJournalDto) => journalService.create(data),
    onSuccess: async (newEntry) => {
      toast.success('Journal entry created successfully');
      queryClient.setQueryData<PaginatedResponse<JournalEntry>>(
        ['journals', { page: 1, limit: 100 }],
        (old: PaginatedResponse<JournalEntry> | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: [newEntry, ...old.data],
          };
        },
      );

      queryClient.invalidateQueries({ queryKey: ['journals'] });
      queryClient.invalidateQueries({ queryKey: ['timeline'] });
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to create journal entry');
    },
  });
};

export const useUpdateJournal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateJournalDto> }) =>
      journalService.update(id, data),
    onSuccess: () => {
      // toast.success("Journal entry updated successfully"); // Too noisy for auto-save
      queryClient.invalidateQueries({ queryKey: ['journals'] });
      queryClient.invalidateQueries({ queryKey: ['journal'] });
      queryClient.invalidateQueries({ queryKey: ['timeline'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update journal entry');
    },
  });
};

export const useDeleteJournal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return journalService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] });
      queryClient.invalidateQueries({ queryKey: ['timeline'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete journal entry');
    },
  });
};



