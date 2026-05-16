import type { BackendResponse, PaginatedResponse } from '@forge/core';

import { apiClient } from '@/services/apiClient';

import type {
  Project,
  ContributionStats,
  UserProfile,
  HybridStats,
  GithubRepo,
} from '../types';

export const forgeApi = {
  getProjects: () =>
    apiClient
      .get<BackendResponse<PaginatedResponse<Project> | Project[]>>('/engineering/projects')
      .then((res) => res.data.data),
  getProject: (id: string) =>
    apiClient.get<BackendResponse<Project>>(`/engineering/projects/${id}`).then((res) => res.data.data),
  createProject: (data: Partial<Project>) =>
    apiClient.post<BackendResponse<Project>>('/engineering/projects', data).then((res) => res.data.data),
  updateProject: (id: string, data: Partial<Project>) =>
    apiClient.patch<BackendResponse<Project>>(`/engineering/projects/${id}`, data).then((res) => res.data.data),
  deleteProject: (id: string) => apiClient.delete<void>(`/engineering/projects/${id}`),
  syncProject: (id: string) =>
    apiClient.post<BackendResponse<Project>>(`/engineering/projects/${id}/sync`).then((res) => res.data.data),
  getProjectGithubStats: (projectId: string) =>
    apiClient
      .get<BackendResponse<HybridStats>>(`/engineering/projects/${projectId}/github-stats`)
      .then((res) => res.data.data),
  getProjectReadme: (projectId: string) =>
    apiClient
      .get<BackendResponse<{ content: string }>>(`/engineering/projects/${projectId}/readme`)
      .then((res) => res.data.data),
  getProjectTaskBoard: (projectId: string) =>
    apiClient
      .get<BackendResponse<Project['taskBoard']>>(`/engineering/projects/${projectId}/taskboard`)
      .then((res) => res.data.data),
  getProjectLogs: (projectId: string, page = 1, limit = 20) =>
    apiClient
      .get<
        BackendResponse<
          PaginatedResponse<{
            id: string;
            content: string;
            date: Date;
            type: 'update' | 'milestone' | 'issue' | 'alert';
          }>
        >
      >(`/engineering/projects/${projectId}/logs`, {
        params: { page, limit },
      })
      .then((res) => res.data.data),
  getGithubStats: (username: string) =>
    apiClient
      .get<BackendResponse<ContributionStats>>(`/engineering/projects/github/stats/${username}`)
      .then((res) => res.data.data),
  getGithubRepos: (username: string) =>
    apiClient
      .get<BackendResponse<GithubRepo[]>>(`/engineering/projects/github/repos/${username}`)
      .then((res) => res.data.data),
  connectAccount: (data: {
    provider: string;
    identifier: string;
    metadata?: Record<string, unknown>;
  }) => apiClient.post<void>('/users/connect', data),
  getUser: (id: string) => apiClient.get<BackendResponse<UserProfile>>(`/users/${id}`).then((res) => res.data.data),
};

