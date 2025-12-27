import { apiClient } from "@/services/apiClient";
import { Project, ContributionStats, UserProfile } from "./types";

export const forgeApi = {
  getProjects: () => apiClient.get<Project[]>("/engineering/projects").then((res) => res.data),
  getProject: (id: string) =>
    apiClient.get<Project>(`/engineering/projects/${id}`).then((res) => res.data),
  createProject: (data: Partial<Project>) => apiClient.post<void>("/engineering/projects", data),
  updateProject: (id: string, data: Partial<Project>) =>
    apiClient.patch<Project>(`/engineering/projects/${id}`, data).then((res) => res.data),
  syncProject: (id: string) =>
    apiClient.post<Project>(`/engineering/projects/${id}/sync`).then((res) => res.data),
  getGithubStats: (username: string) =>
    apiClient
      .get<ContributionStats>(`/engineering/projects/github/stats/${username}`)
      .then((res) => res.data),
  connectAccount: (data: {
    provider: string;
    identifier: string;
    metadata?: Record<string, unknown>;
  }) => apiClient.post<void>("/users/connect", data),
  getUser: (id: string) => apiClient.get<UserProfile>(`/users/${id}`).then((res) => res.data),
};
