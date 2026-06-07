import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { echoesService } from '../services/echoesService';

export const useEchoesHistory = () => {
  return useQuery({
    queryKey: ['echoesHistory'],
    queryFn: () => echoesService.getHistory(),
    staleTime: 5000,
  });
};

export const useSyncEchoMoment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      fileName: string;
      gitBranch: string;
      cpuLoad: number;
      coordinates: { x: number; y: number };
    }) => echoesService.syncMoment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['echoesHistory'] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to sync alignment telemetry to server');
    },
  });
};

export const useClearEchoesHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => echoesService.clearHistory(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['echoesHistory'] });
      toast.success('Alignment telemetry history cleared');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Failed to clear alignment telemetry on server');
    },
  });
};
