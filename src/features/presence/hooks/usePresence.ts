"use client";

import { useState, useEffect } from "react";
import { VisitorEcho } from "../types";
import { socketService } from "@/services/socketService";

// Star generation (Visuals only, can stay static)
const generateStars = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.7 + 0.3,
    transform: `scale(${Math.random() * 0.5 + 0.5})`,
  }));
};

// DTO for incoming data
interface RawVisitorEcho {
  id: string;
  type: "anonymous" | "known" | "connection";
  pageVisited: string;
  timestamp: string; // Socket sends dates as strings usually
}

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const usePresence = () => {
  const [echoes, setEchoes] = useState<VisitorEcho[]>([]);
  const [stars] = useState(() => generateStars(50));

  useEffect(() => {
    // Ensure connection is established
    const socket = socketService.connect(`${SOCKET_URL}/presence`);

    if (!socket) {
      console.warn("usePresence: Failed to get socket instance");
      return;
    }

    const handlePresenceUpdate = (visitors: unknown[]) => {
      if (!Array.isArray(visitors)) return;
      // Transform server data to UI VisitorEcho
      const visualEchoes: VisitorEcho[] = visitors.map((v) => {
        const visitorFunc = v as RawVisitorEcho;
        // Map page path to Angle (Example logic)
        // Home (/) -> 90deg (Top)
        // Forge -> 180deg (Left)
        // Profile -> 0deg (Right)
        let angle = Math.random() * 360;
        if (visitorFunc.pageVisited === "/") angle = 90;
        else if (visitorFunc.pageVisited?.includes("forge")) angle = 180;

        // Map timestamp to Distance (Newer = Closer)
        const age = Date.now() - new Date(visitorFunc.timestamp).getTime();
        const distance = Math.min(100, Math.max(10, age / 1000)); // 10% to 100%

        return {
          id: visitorFunc.id,
          type: visitorFunc.type,
          distance: distance,
          angle: angle,
          connectionRole: visitorFunc.type === "connection" ? "Companion" : undefined,
          lastSeen: new Date(visitorFunc.timestamp),
          timestamp: new Date(visitorFunc.timestamp), // Map required timestamp
          seasonContext: "Void", // Default or map from server if available
          duration: 0, // Default
          pageVisited: visitorFunc.pageVisited, // Map from server
        } as VisitorEcho;
      });

      setEchoes(visualEchoes);
    };

    socket.on("presence_update", handlePresenceUpdate);

    return () => {
      socket.off("presence_update", handlePresenceUpdate);
    };
  }, []);

  return { echoes, stars };
};
