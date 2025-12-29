import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { socketService } from '@/services/socketService';

export const useGamificationSocket = (userId?: string, onXpAwarded?: (data: any) => void) => {
    // Initialize with existing socket if any
    const [socket, setSocket] = useState(socketService.getSocket('/gamification'));

    useEffect(() => {
        if (!userId) return;

        // Connect via Singleton Service (Multiplexed)
        const socketInstance = socketService.connect('/gamification');
        setSocket(socketInstance);
         
        setSocket(socketInstance);

        const handleXpAwarded = (data: { userId: string, xp: number, newLevel: number, reason: string }) => {
            if (data.userId === userId) {
                // Show Global Toast
                toast.success(`+${data.xp} XP: ${data.reason}`, {
                    description: data.newLevel ? `Current Level: ${data.newLevel}` : undefined,
                    duration: 4000,
                });

                if (onXpAwarded) {
                    onXpAwarded(data);
                }
            }
        };

        socketInstance.on('xp_awarded', handleXpAwarded);

        return () => {
            socketInstance.off('xp_awarded', handleXpAwarded);
        };
    }, [userId, onXpAwarded]);

    return socket;
};
