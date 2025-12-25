"use client";

import React, { useEffect } from "react";
import { useNotificationStore } from "@/store/notification.store";

// Mock messages
const AMBIENT_WHISPERS = [
  "Season Engine: A subtle shift towards Autumn.",
  "Your memory constellation is growing dense.",
  "Identity Vector aligning with 'Builder' archetype.",
  "Energy reserves are stable. Good time for deep work.",
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const notify = useNotificationStore((state) => state.notify);

  // Ambient heartbeat logic (Simulated side effect)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const msg = AMBIENT_WHISPERS[Math.floor(Math.random() * AMBIENT_WHISPERS.length)];
        notify({ type: "whisper", source: "system", message: msg });
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [notify]);

  return <>{children}</>;
};

export const useNotification = () => {
  return useNotificationStore();
};
