import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { vitalityService, LogVitalityDto } from '../services/vitalityService';

export const useVitalityStats = () => {
  return useQuery({
    queryKey: ['vitality-stats'],
    queryFn: () => vitalityService.getStats(),
    refetchInterval: 60 * 1000,
  });
};

export const useLogVitality = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LogVitalityDto) => vitalityService.logActivity(data),
    onSuccess: (data, variables) => {
      if (variables.type === 'MAKTUB_ALIGN') {
        toast.success('Maktub Alignment Complete. Stoic Resolve activated!');
      } else if (variables.type === 'HYDRATION') {
        toast.success(`Hydration logged: +${variables.value}ml`);
      } else {
        toast.success(`${variables.type} activity logged successfully.`);
      }
      queryClient.invalidateQueries({ queryKey: ['vitality-stats'] });
      queryClient.invalidateQueries({ queryKey: ['timeline'] });
    },
    onError: (error: any) => {
      console.error(error);
      const errorMsg = error?.response?.data?.message || 'Failed to log vitality activity';
      toast.error(errorMsg);
    },
  });
};
