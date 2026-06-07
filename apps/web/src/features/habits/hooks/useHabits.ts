import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { gamificationApi } from '@/features/gamification/services/gamificationApi';

export const useHabits = () => {
  return useQuery({
    queryKey: ['habits'],
    queryFn: () => gamificationApi.getHabits(),
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

export const useCreateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      title: string;
      description?: string;
      difficulty: string;
      xpReward: number;
      frequency?: any;
    }) => gamificationApi.createHabit(data),
    onSuccess: () => {
      toast.success('Habit ritual established successfully');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to establish habit ritual');
    },
  });
};

export const useCompleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => gamificationApi.completeHabit(id),
    onSuccess: () => {
      toast.success('Ritual completed. Experience accrued.');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      // Invalidate stats or trigger reload so the XPBar updates its level/XP values in real-time!
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
      // Invalidate active quests so they update in real-time on completing a habit
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      // Dispatches a global custom event in case XPBar or sidebar components need to know to refresh locally
      window.dispatchEvent(new CustomEvent('xp-gained'));
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to complete habit ritual');
    },
  });
};

export const useUpdateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { title: string; description?: string; difficulty?: string; xpReward?: number };
    }) => gamificationApi.updateHabit(id, data),
    onSuccess: () => {
      toast.success('Habit ritual updated successfully');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update habit ritual');
    },
  });
};

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => gamificationApi.deleteHabit(id),
    onSuccess: () => {
      toast.success('Habit ritual deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete habit ritual');
    },
  });
};
