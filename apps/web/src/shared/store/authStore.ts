import type { User } from '@forge/auth';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type { User };

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isHydrated: false,
      login: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken, isAuthenticated: true }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'forge-auth-v2', // unique name
      // TODO(security): Currently using localStorage for MVP. Plan to migrate to HttpOnly cookies for better XSS protection in Phase 2.
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);


