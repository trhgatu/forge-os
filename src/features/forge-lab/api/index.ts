import { apiClient } from "@/services/apiClient";
import { Project, ContributionStats, UserProfile, PaginatedResponse } from "../types";

export const forgeApi = {
  getProjects: () =>
    apiClient
      .get<PaginatedResponse<Project> | Project[]>("/engineering/projects")
      .then((res) => res.data),
  getProject: (id: string) =>
    apiClient.get<Project>(`/engineering/projects/${id}`).then((res) => res.data),
  createProject: (data: Partial<Project>) =>
    apiClient.post<Project>("/engineering/projects", data).then((res) => res.data),
  updateProject: (id: string, data: Partial<Project>) =>
    apiClient.patch<Project>(`/engineering/projects/${id}`, data).then((res) => res.data),
  deleteProject: (id: string) => apiClient.delete<void>(`/engineering/projects/${id}`),
  syncProject: (id: string) =>
    apiClient.post<Project>(`/engineering/projects/${id}/sync`).then((res) => res.data),
  getProjectGithubStats: (projectId: string) =>
    apiClient
      .get<import("../types").HybridStats>(`/engineering/projects/${projectId}/github-stats`)
      .then((res) => res.data),
  getProjectReadme: (projectId: string) =>
    apiClient
      .get<{ content: string }>(`/engineering/projects/${projectId}/readme`)
      .then((res) => res.data),
  getProjectTaskBoard: (projectId: string) =>
    apiClient
      .get<Project["taskBoard"]>(`/engineering/projects/${projectId}/taskboard`)
      .then((res) => res.data),
  getProjectLogs: (projectId: string, page = 1, limit = 20) =>
    apiClient
      .get<
        PaginatedResponse<{
          id: string;
          content: string;
          date: Date;
          type: "update" | "milestone" | "issue" | "alert";
        }>
      >(`/engineering/projects/${projectId}/logs`, {
        params: { page, limit },
      })
      .then((res) => res.data),
  getGithubStats: (username: string) =>
    apiClient
      .get<ContributionStats>(`/engineering/projects/github/stats/${username}`)
      .then((res) => res.data),
  getGithubRepos: (username: string) =>
    apiClient
      .get<import("../types").GithubRepo[]>(`/engineering/projects/github/repos/${username}`)
      .then((res) => res.data),
  connectAccount: (data: {
    provider: string;
    identifier: string;
    metadata?: Record<string, unknown>;
  }) => apiClient.post<void>("/users/connect", data),
  getUser: (id: string) => apiClient.get<UserProfile>(`/users/${id}`).then((res) => res.data),
};
