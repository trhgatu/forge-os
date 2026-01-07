import { apiClient } from "@/services/apiClient";
import { Project, ContributionStats, UserProfile, PaginatedResponse } from "./types";

export const forgeApi = {
  getProjects: () =>
    apiClient
      .get<PaginatedResponse<Project> | Project[]>("/engineering/projects")
      .then((res) => res.data),
  getProject: (id: string) =>
    apiClient
      .get<import("./types/dto").ProjectSummaryResponse>(`/engineering/projects/${id}`)
      .then((res) => res.data),
  getProjectGithubStats: (id: string) =>
    apiClient
      .get<import("./types/dto").GithubStatsResponse>(`/engineering/projects/${id}/github-stats`)
      .then((res) => res.data),
  getProjectReadme: (id: string) =>
    apiClient
      .get<import("./types/dto").ReadmeResponse>(`/engineering/projects/${id}/readme`)
      .then((res) => res.data),
  getProjectTaskBoard: (id: string) =>
    apiClient
      .get<import("./types/dto").TaskBoardResponse>(`/engineering/projects/${id}/taskboard`)
      .then((res) => res.data),
  getProjectLogs: (id: string, page: number = 1, limit: number = 20) =>
    apiClient
      .get<
        import("./types/dto").PaginatedLogsResponse
      >(`/engineering/projects/${id}/logs`, { params: { page, limit } })
      .then((res) => res.data),
  createProject: (data: Partial<Project>) =>
    apiClient.post<Project>("/engineering/projects", data).then((res) => res.data),
  updateProject: (id: string, data: Partial<Project>) =>
    apiClient.patch<Project>(`/engineering/projects/${id}`, data).then((res) => res.data),
  deleteProject: (id: string) => apiClient.delete<void>(`/engineering/projects/${id}`),
  syncProject: (id: string) =>
    apiClient.post<Project>(`/engineering/projects/${id}/sync`).then((res) => res.data),
  getGithubStats: (username: string) =>
    apiClient
      .get<ContributionStats>(`/engineering/projects/github/stats/${username}`)
      .then((res) => res.data),
  getGithubRepos: (username: string) =>
    apiClient
      .get<import("./types").GithubRepo[]>(`/engineering/projects/github/repos/${username}`)
      .then((res) => res.data),
  connectAccount: (data: {
    provider: string;
    identifier: string;
    metadata?: Record<string, unknown>;
  }) => apiClient.post<void>("/users/connect", data),
  getUser: (id: string) => apiClient.get<UserProfile>(`/users/${id}`).then((res) => res.data),
};
