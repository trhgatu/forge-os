"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { socketService } from "@/services/socketService";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const PresenceTracker: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Connect to 'presence' namespace
    const socket = socketService.connect(`${SOCKET_URL}/presence`);

    if (socket) {
      // Report initial location
      socket.emit("updateLocation", { path: pathname });
    }

    return () => {
      // Optional: disconnect on unmount if we want strict session management
      // socketService.disconnect();
    };
  }, [pathname]);

  // Report location changes
  useEffect(() => {
    const socket = socketService.getSocket();
    if (socket && socket.connected) {
      socket.emit("updateLocation", { path: pathname });
    }
  }, [pathname]);

  return null; // Headless component
};
