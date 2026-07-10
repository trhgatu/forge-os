import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useRef } from 'react';

import { socketService } from '@/services/socketService';
import { useAuthStore } from '@/shared/store/authStore';
import { XpAwardedData, AchievementUnlockedData, SystemNotificationData } from '../types';
import { enqueueToast } from '../utils/notificationQueue';
import { matchNotificationsAndAwards } from '../utils/notificationMatcher';

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

    const pendingNotifications = {
      xpAwards: [] as XpAwardedData[],
      sysNotifications: [] as SystemNotificationData[],
      timer: null as any,
    };

    const processQueue = () => {
      const { xpAwards, sysNotifications } = pendingNotifications;
      pendingNotifications.xpAwards = [];
      pendingNotifications.sysNotifications = [];
      pendingNotifications.timer = null;

      const { pairedToasts, remainingXpAwards } = matchNotificationsAndAwards(
        sysNotifications,
        xpAwards,
      );

      pairedToasts.forEach((toast) => enqueueToast(toast));

      remainingXpAwards.forEach((xp) => {
        enqueueToast({
          title: `+${xp.xp} XP: ${xp.reason}`,
          description: xp.newLevel ? `Current Level: ${xp.newLevel}` : '',
          type: 'XP_AWARDED',
          duration: 4000,
        });
      });
    };

    const queueNotification = (type: 'xp' | 'sys', data: any) => {
      if (type === 'xp') {
        pendingNotifications.xpAwards.push(data);
      } else {
        pendingNotifications.sysNotifications.push(data);
      }

      if (pendingNotifications.timer) {
        clearTimeout(pendingNotifications.timer);
      }
      pendingNotifications.timer = setTimeout(processQueue, 150);
    };

    const handleXpAwarded = (data: XpAwardedData) => {
      if (data.userId === userId) {
        queueNotification('xp', data);

        queryClient.invalidateQueries({ queryKey: ['vitality-stats'] });

        if (onXpAwardedRef.current) {
          onXpAwardedRef.current(data);
        }
      }
    };

    const handleAchievementUnlocked = (data: AchievementUnlockedData) => {
      if (data.userId === userId) {
        enqueueToast({
          title: `🏆 ACHIEVEMENT UNLOCKED!`,
          description: `Chinh phục thành công Epic Goal: "${data.title}" và nhận ngay +${data.xpReward} XP!`,
          type: 'ACHIEVEMENT_UNLOCKED',
          duration: 7000,
          confettiColors: ['#fbbf24', '#f59e0b', '#ffffff', '#3b82f6'],
        });
      }
    };

    const handleSystemNotification = (data: SystemNotificationData) => {
      queueNotification('sys', data);

      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['activeQuests'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
      queryClient.invalidateQueries({ queryKey: ['journals'] });
      queryClient.invalidateQueries({ queryKey: ['vitality-stats'] });
      
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
