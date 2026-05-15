import type { User } from '@forge/auth';
import type { BackendResponse } from '@forge/core';

import { apiClient } from '@/services/apiClient';

import type { LoginResponse, RawUser } from '../types';

export const authService = {
  login: async (email: string, password: string) => {
    // 1. Login to get tokens
    const loginRes = await apiClient.post<BackendResponse<LoginResponse>>('/auth/login', { email, password });
    const { accessToken, refreshToken } = loginRes.data.data;

    // 2. Fetch User Profile using the new token
    const profileRes = await apiClient.get<BackendResponse<any>>('/auth/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // The backend wraps the user object in a 'data' property inside the response 'data'
    const userData = profileRes.data.data.data || profileRes.data.data;

    // 3. Normalize to match the Enterprise User interface
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

