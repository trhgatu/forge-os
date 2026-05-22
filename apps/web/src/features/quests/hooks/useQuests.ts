import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { questsService } from '../services/questsService';

export const useQuests = (filter?: { type?: string; isActive?: boolean }) => {
  return useQuery({
    queryKey: ['adminQuests', filter],
    queryFn: () => questsService.getAll(filter),
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

export const useCreateQuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      type: string;
      xpReward: number;
      objectives: Array<{
        type: string;
        targetCount: number;
        referenceType: string;
        referenceId: string | null;
      }>;
    }) => questsService.create(data),
    onSuccess: () => {
      toast.success('Quest initialized successfully');
      queryClient.invalidateQueries({ queryKey: ['adminQuests'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to persist quest profile');
    },
  });
};

export const useUpdateQuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        title: string;
        description: string;
        type: string;
        xpReward: number;
        objectives: Array<{
          type: string;
          targetCount: number;
          referenceType: string;
          referenceId: string | null;
        }>;
      };
    }) => questsService.update(id, data),
    onSuccess: () => {
      toast.success('Quest updated successfully');
      queryClient.invalidateQueries({ queryKey: ['adminQuests'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to persist quest profile');
    },
  });
};

export const useDeleteQuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => questsService.delete(id),
    onSuccess: () => {
      toast.success('Quest archived successfully');
      queryClient.invalidateQueries({ queryKey: ['adminQuests'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to archive targeted quest');
    },
  });
};
