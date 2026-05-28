import confetti from 'canvas-confetti';
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

interface AchievementUnlockedData {
  userId: string;
  goalId: string;
  title: string;
  badgeIcon: string;
  xpReward: number;
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

    const handleAchievementUnlocked = (data: AchievementUnlockedData) => {
      if (data.userId === userId) {
        toast.success(`🏆 ACHIEVEMENT UNLOCKED!`, {
          description: `Chinh phục thành công Epic Goal: "${data.title}" và nhận ngay +${data.xpReward} XP!`,
          duration: 7000,
        });

        // Trigger premium golden confetti storm!
        try {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#fbbf24', '#f59e0b', '#ffffff', '#3b82f6'],
          });
        } catch (e) {
          console.error('Failed to trigger confetti', e);
        }
      }
    };

    socketInstance.on('xp_awarded', handleXpAwarded);
    socketInstance.on('achievement_unlocked', handleAchievementUnlocked);

    return () => {
      socketInstance.off('xp_awarded', handleXpAwarded);
      socketInstance.off('achievement_unlocked', handleAchievementUnlocked);
    };
  }, [userId, accessToken]);

  return socket;
};


