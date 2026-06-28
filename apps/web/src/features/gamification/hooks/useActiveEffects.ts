import { useQuery } from '@tanstack/react-query';
import { gamificationService } from '../services/gamificationService';

export const useActiveEffects = () => {
  return useQuery({
    queryKey: ['active-effects'],
    queryFn: () => gamificationService.getActiveEffects(),
    refetchInterval: 10 * 1000, // Refresh status effects/timers every 10 seconds
  });
};
