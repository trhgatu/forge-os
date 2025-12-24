import { apiClient } from "@/services/apiClient";
import type { BackendResponse } from "@/shared/types/api";
import type { User } from "@/shared/store/authStore";
import type { LoginResponse, RawUser } from "../types";

export const authService = {
  login: async (email: string, password: string) => {
    // 1. Login to get tokens
    const loginRes = await apiClient.post<LoginResponse>("/auth/login", { email, password });
    const { accessToken, refreshToken } = loginRes.data;

    // 2. Fetch User Profile using the new token
    // Note: We need to manually attach header because store is not yet updated
    const profileRes = await apiClient.get<BackendResponse<RawUser>>("/auth/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const userData = profileRes.data.data;

    // 3. Normalize
    const user: User = {
      id: userData._id || userData.id,
      email: userData.email,
      name: userData.name,
      role: {
        id: userData.role._id || userData.role.id,
        name: userData.role.name,
        permissions:
          userData.role.permissions?.map((p) => (typeof p === "string" ? p : p.name)) || [],
      },
    };

    return { user, token: accessToken, refreshToken };
  },
};
