import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { gamificationApi } from '@/features/gamification/services/gamificationApi';

export const useRoutines = () => {
  return useQuery({
    queryKey: ['routines'],
    queryFn: () => gamificationApi.getRoutines(),
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

export const useCreateRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; comboXp: number }) =>
      gamificationApi.createRoutine(data),
    onSuccess: () => {
      toast.success('Routine chain initialized successfully');
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to establish routine chain');
    },
  });
};

export const useAddHabitToRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      routineId,
      habitId,
      order,
    }: {
      routineId: string;
      habitId: string;
      order: number;
    }) => gamificationApi.addHabitToRoutine(routineId, { habitId, order }),
    onSuccess: () => {
      toast.success('Habit step integrated into routine');
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to integrate habit step');
    },
  });
};
