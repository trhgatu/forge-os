import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { tasksService } from '../services/tasksService';
import type { CreateTaskInput, UpdateTaskInput } from '../types';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksService.getTasks(),
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskInput) => tasksService.createTask(data),
    onSuccess: () => {
      toast.success('Task established in the Action Chamber');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to establish task');
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskInput }) =>
      tasksService.updateTask(id, data),
    onSuccess: (updatedTask, variables) => {
      if (variables.data.status === 'done') {
        toast.success('Task completed. Experience accrued!');
        // Trigger sound effect or global events
        window.dispatchEvent(new CustomEvent('xp-gained'));
      } else {
        toast.success('Task state updated');
      }
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to update task state');
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tasksService.deleteTask(id),
    onSuccess: () => {
      toast.success('Task dissolved from Chamber');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to dissolve task');
    },
  });
};
