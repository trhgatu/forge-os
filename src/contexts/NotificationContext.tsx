"use client";

import React, { useEffect } from "react";
import { useNotificationStore } from "@/store/notification.store";
import { toast } from "sonner";

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

  // Subscriber to store changes to trigger UI toasts (Effect-based)
  useEffect(() => {
    // This is a simple implementation. In production, we might want a proper subscription
    // to avoid effect dependencies or duplicate toasts.
    // For now, we rely on the component using the store to trigger side effects
    // OR we can bake the toast call directly into the store action if we import toast there (but that couples logic to UI).
    // A better approach in React context:
    const unsubscribe = useNotificationStore.subscribe((state, prevState) => {
      const newItems = state.items;
      const prevItems = prevState.items;

      if (newItems.length > prevItems.length) {
        const latest = newItems[0];
        if (latest && !latest.read) {
          // Only toast new unread items
          toast(latest.message, {
            description: latest.source.toUpperCase(),
            action: {
              label: "View",
              onClick: () => console.log("View notification", latest.id),
            },
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return <>{children}</>;
};

export const useNotification = () => {
  return useNotificationStore();
};
