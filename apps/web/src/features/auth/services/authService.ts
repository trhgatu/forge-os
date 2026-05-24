import type { User } from '@forge/auth';
import type { BackendResponse } from '@forge/core';

import { apiClient } from '@/services/apiClient';

import type { LoginResponse } from '../types';

export const authService = {
  login: async (email: string, password: string) => {
    const loginRes = await apiClient.post<BackendResponse<LoginResponse>>('/auth/login', { email, password });
    const { accessToken, refreshToken } = loginRes.data.data;
    const profileRes = await apiClient.get<BackendResponse<any>>('/auth/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userData = profileRes.data.data.data || profileRes.data.data;

    const user: User = {
      id: userData._id || userData.id,
      email: userData.email,
      name: userData.name,
      isActive: userData.isActive ?? true,
      createdAt: userData.createdAt || new Date().toISOString(),
      role: {
        id: userData.role?._id || userData.role?.id || 'default',
        name: userData.role?.name || 'User',
        permissions:
          userData.role?.permissions?.map((p: string | { name: string }) =>
            typeof p === 'string' ? p : p.name
          ) || [],
      },
    };

    return { user, accessToken, refreshToken };
  },
};

