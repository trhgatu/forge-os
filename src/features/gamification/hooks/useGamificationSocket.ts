import { useEffect, useState } from "react";
import { toast } from "sonner";
import { socketService } from "@/services/socketService";

interface XpAwardedData {
  userId: string;
  xp: number;
  newLevel: number;
  reason: string;
}

export const useGamificationSocket = (
  userId?: string,
  onXpAwarded?: (data: XpAwardedData) => void
) => {
  // Initialize with existing socket if any
  const [socket, setSocket] = useState(socketService.getSocket("/gamification"));

  useEffect(() => {
    if (!userId) return;

    // Connect via Singleton Service (Multiplexed)
    const socketInstance = socketService.connect("/gamification");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSocket(socketInstance);

    const handleXpAwarded = (data: XpAwardedData) => {
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

    socketInstance.on("xp_awarded", handleXpAwarded);

    return () => {
      socketInstance.off("xp_awarded", handleXpAwarded);
    };
  }, [userId, onXpAwarded]);

  return socket;
};
