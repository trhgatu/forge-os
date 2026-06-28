import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { systemConfigService } from '../services/systemConfigService';
import { toast } from 'sonner';

export const useSystemConfigs = () => {
  return useQuery({
    queryKey: ['system-configs'],
    queryFn: () => systemConfigService.getConfigs(),
  });
};

export const useUpdateSystemConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ key, value }: { key: string; value: any }) =>
      systemConfigService.updateConfig(key, value),
    onSuccess: (_, variables) => {
      toast.success(`Updated configuration for key: ${variables.key}`);
      queryClient.invalidateQueries({ queryKey: ['system-configs'] });
    },
    onError: (error: any) => {
      console.error(error);
      const errMsg = error?.response?.data?.message || 'Failed to update system config';
      toast.error(errMsg);
    },
  });
};
