import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';

import { socketService } from '@/services/socketService';
import { useAuthStore } from '@/shared/store/authStore';

interface XpAwardedData {
  userId: string;
  xp: number;
  newLevel: number;
  reason: string;
}

export const useGamificationSocket = (
  userId?: string,
  onXpAwarded?: (data: XpAwardedData) => void,
) => {
  const [socket, setSocket] = useState(socketService.getSocket('/gamification'));
  const onXpAwardedRef = useRef(onXpAwarded);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    onXpAwardedRef.current = onXpAwarded;
  }, [onXpAwarded]);

  useEffect(() => {
    if (!userId) return;

    const socketInstance = socketService.connect('/gamification');
    setSocket(socketInstance);

    const handleXpAwarded = (data: XpAwardedData) => {
      if (data.userId === userId) {
        toast.success(`+${data.xp} XP: ${data.reason}`, {
          description: data.newLevel ? `Current Level: ${data.newLevel}` : undefined,
          duration: 4000,
        });

        if (onXpAwardedRef.current) {
          onXpAwardedRef.current(data);
        }
      }
    };

    socketInstance.on('xp_awarded', handleXpAwarded);

    return () => {
      socketInstance.off('xp_awarded', handleXpAwarded);
    };
  }, [userId, accessToken]);

  return socket;
};


