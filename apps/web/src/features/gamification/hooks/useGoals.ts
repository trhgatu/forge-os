import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { goalsService } from '../services/goalsService';

export const useGoals = () => {
  return useQuery({
    queryKey: ['epicGoals'],
    queryFn: () => goalsService.getAll(),
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

export const useGoal = (id?: string) => {
  return useQuery({
    queryKey: ['epicGoal', id],
    queryFn: () => goalsService.getById(id!),
    enabled: !!id,
  });
};

export const useCreateGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      xpReward: number;
      badgeIcon: string;
      objectives: Array<{
        type: string;
        targetCount: number;
        referenceId: string | null;
      }>;
    }) => goalsService.create(data),
    onSuccess: () => {
      toast.success('Epic Goal initialized successfully');
      queryClient.invalidateQueries({ queryKey: ['epicGoals'] });
    },
    onError: (error: any) => {
      console.error(error);
      const msg = error.response?.data?.message || 'Failed to persist goal profile';
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    },
  });
};

export const useUpdateGoal = () => {
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
        xpReward: number;
        badgeIcon: string;
        isActive?: boolean;
        objectives: Array<{
          type: string;
          targetCount: number;
          referenceId: string | null;
        }>;
      };
    }) => goalsService.update(id, data),
    onSuccess: (_, variables) => {
      toast.success('Epic Goal updated successfully');
      queryClient.invalidateQueries({ queryKey: ['epicGoals'] });
      queryClient.invalidateQueries({ queryKey: ['epicGoal', variables.id] });
    },
    onError: (error: any) => {
      console.error(error);
      const msg = error.response?.data?.message || 'Failed to update goal profile';
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    },
  });
};

export const useDeleteGoal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => goalsService.delete(id),
    onSuccess: () => {
      toast.success('Epic Goal deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['epicGoals'] });
    },
    onError: (error: any) => {
      console.error(error);
      toast.error('Failed to delete targeted epic goal');
    },
  });
};
