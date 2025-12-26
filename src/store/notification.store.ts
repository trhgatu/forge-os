import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NotificationType, NotificationSource } from "@/types"; // Need to ensure types exist

export interface NotificationItem {
  id: string;
  type: NotificationType;
  source: NotificationSource;
  message: string;
  title?: string;
  linkTo?: unknown;
  timestamp: number;
  read: boolean;
  season?: string;
}

interface NotificationState {
  items: NotificationItem[];
  activeWhispers: NotificationItem[];
  isCenterOpen: boolean;

  notify: (payload: {
    type: NotificationType;
    source: NotificationSource;
    message: string;
    title?: string;
    linkTo?: unknown;
    season?: string;
  }) => void;
  markAsRead: (id: string) => void;
  clearWhispers: () => void;
  removeWhisper: (id: string) => void;
  toggleCenter: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      items: [],
      activeWhispers: [],
      isCenterOpen: false,

      notify: ({ type, source, message, title, linkTo, season }) => {
        const newItem: NotificationItem = {
          id: Math.random().toString(36).substr(2, 9),
          type,
          source,
          message,
          title,
          linkTo,
          season,
          timestamp: Date.now(),
          read: false,
        };

        set((state) => {
          const updates: Partial<NotificationState> = {
            items: [newItem, ...state.items],
          };

          if (type === "whisper") {
            updates.activeWhispers = [newItem, ...state.activeWhispers];
          }

          return updates;
        });
      },

      markAsRead: (id) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, read: true } : item)),
        })),

      clearWhispers: () => set({ activeWhispers: [] }),

      removeWhisper: (id) =>
        set((state) => ({
          activeWhispers: state.activeWhispers.filter((w) => w.id !== id),
        })),

      toggleCenter: () => set((state) => ({ isCenterOpen: !state.isCenterOpen })),
    }),
    {
      name: "forge-notification-storage",
      partialize: (state) => ({
        items: state.items, // Persist history
      }),
    }
  )
);
