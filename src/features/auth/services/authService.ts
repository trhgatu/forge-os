import { apiClient } from "@/services/apiClient";
import type { User } from "@/shared/store/authStore";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    email: string;
    name?: string;
    role: {
      _id: string;
      name: string;
      permissions: { name: string }[];
    };
  };
}

export const authService = {
  login: async (email: string, password: string) => {
    // 1. Login to get tokens
    const loginRes = await apiClient.post<LoginResponse>("/auth/login", { email, password });
    const { accessToken } = loginRes.data;

    // 2. Fetch User Profile using the new token
    // Note: We need to manually attach header because store is not yet updated
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const profileRes = await apiClient.get<any>("/auth/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const userData = profileRes.data; // Depending on backend wrapper, might be profileRes.data.data or just profileRes.data

    // 3. Normalize
    const user: User = {
      id: userData._id || userData.id,
      email: userData.email,
      name: userData.name,
      role: {
        id: userData.role?._id || userData.role?.id,
        name: userData.role?.name,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        permissions:
          userData.role?.permissions?.map((p: any) => (typeof p === "string" ? p : p.name)) || [],
      },
    };

    return { user, token: accessToken };
  },
};
