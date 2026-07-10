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
    mutationFn: (data: {
      title: string;
      comboXp: number;
      targetTime?: string;
      frequency?: any;
    }) => gamificationApi.createRoutine(data),
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

export const useUpdateRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        title: string;
        targetTime?: string | null;
        frequency?: any | null;
      };
    }) => gamificationApi.updateRoutine(id, data),
    onSuccess: () => {
      toast.success('Routine chain updated successfully');
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update routine chain');
    },
  });
};

export const useReorderRoutineHabits = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      routineId,
      orders,
    }: {
      routineId: string;
      orders: { habitId: string; order: number }[];
    }) => gamificationApi.reorderRoutineHabits(routineId, orders),
    onSuccess: () => {
      toast.success('Routine steps reordered successfully');
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to reorder routine steps');
    },
  });
};

export const useDeleteRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => gamificationApi.deleteRoutine(id),
    onSuccess: () => {
      toast.success('Routine chain deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to delete routine chain');
    },
  });
};

export const useCompleteRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => gamificationApi.completeRoutine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
      queryClient.invalidateQueries({ queryKey: ['vitality-stats'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
