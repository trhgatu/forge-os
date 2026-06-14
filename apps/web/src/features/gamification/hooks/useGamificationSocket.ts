import { useQueryClient } from '@tanstack/react-query';
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

interface SystemNotificationData {
  type: string;
  title: string;
  description: string;
  xp?: number;
  metadata?: any;
}

export const useGamificationSocket = (
  userId?: string,
  onXpAwarded?: (data: XpAwardedData) => void,
) => {
  const queryClient = useQueryClient();
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

    const handleSystemNotification = (data: SystemNotificationData) => {
      // Show system notifications dynamic toast
      toast.success(data.title, {
        description: data.description,
        duration: data.type === 'QUEST_COMPLETED' ? 7000 : 5000,
      });

      // Confetti effect for completed quests
      if (data.type === 'QUEST_COMPLETED') {
        try {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#22d3ee', '#3b82f6', '#ffffff', '#a855f7'],
          });
        } catch (e) {
          console.error('Failed to trigger confetti', e);
        }
      }

      // Invalidate relevant caches immediately
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
      queryClient.invalidateQueries({ queryKey: ['journals'] });
      
      // Dispatch XP gained event to update headers/progress bars
      window.dispatchEvent(new CustomEvent('xp-gained'));
    };

    socketInstance.on('xp_awarded', handleXpAwarded);
    socketInstance.on('achievement_unlocked', handleAchievementUnlocked);
    socketInstance.on('system_notification', handleSystemNotification);

    return () => {
      socketInstance.off('xp_awarded', handleXpAwarded);
      socketInstance.off('achievement_unlocked', handleAchievementUnlocked);
      socketInstance.off('system_notification', handleSystemNotification);
    };
  }, [userId, accessToken, queryClient]);

  return socket;
};


