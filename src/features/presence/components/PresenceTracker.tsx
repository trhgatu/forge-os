"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { socketService } from "@/services/socketService";

import { useAuthStore } from "@/shared/store/authStore";

const getSocketUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (process.env.NEXT_PUBLIC_SOCKET_URL) return process.env.NEXT_PUBLIC_SOCKET_URL;
  if (apiUrl) {
    try {
      return new URL(apiUrl).origin;
    } catch (e) {
      console.warn("Invalid API URL", e);
    }
  }
  return "http://localhost:8000";
};
const SOCKET_URL = getSocketUrl();

export const PresenceTracker: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Connect to 'presence' namespace ONCE on mount
    socketService.connect(`${SOCKET_URL}/presence`);

    return () => {
      // Optional: disconnect on unmount
      // socketService.disconnect();
    };
  }, []); // Empty dependency array = run once

  // Handle identification logic using Auth Token
  useEffect(() => {
    const socket = socketService.getSocket();
    const token = useAuthStore.getState().token;

    if (socket) {
      const handleConnect = () => {
        // console.log('🔑 Socket connected, identifying...');
        if (token) socket.emit("identify", { token });
        socket.emit("updateLocation", { path: pathname });
      };

      if (socket.connected) {
        handleConnect();
      } else {
        socket.on("connect", handleConnect);
      }

      return () => {
        socket.off("connect", handleConnect);
      };
    }
  }, [pathname]); // Re-run on pathname change to update location, but identify is idempotent-ish

  return null; // Headless component
};
