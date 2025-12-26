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

  // Report location changes
  useEffect(() => {
    const socket = socketService.getSocket();
    if (socket && socket.connected) {
      socket.emit("updateLocation", { path: pathname });
    }
  }, [pathname]); // Run only when pathname changes

  // Handle identification logic using Auth Token
  useEffect(() => {
    const socket = socketService.getSocket();
    const token = useAuthStore.getState().token;

    if (token && socket) {
      if (socket.connected) {
        // console.log('🔑 Authenticated user detected, identifying...');
        socket.emit("identify", { token });
      } else {
        socket.on("connect", () => {
          //  console.log('🔑 Socket connected, identifying...');
          socket.emit("identify", { token });
        });
      }
    }
  }, []); // Run check on mount (store access via getState is instant)

  return null; // Headless component
};
