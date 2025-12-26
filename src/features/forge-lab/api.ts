import { apiClient } from "@/services/apiClient";
import { Project } from "./types";

export const forgeApi = {
  getProjects: () => apiClient.get<Project[]>("/engineering/projects").then((res) => res.data),
  getProject: (id: string) =>
    apiClient.get<Project>(`/engineering/projects/${id}`).then((res) => res.data),
  createProject: (data: Partial<Project>) => apiClient.post<void>("/engineering/projects", data),
  updateProject: (id: string, data: Partial<Project>) =>
    apiClient.patch<Project>(`/engineering/projects/${id}`, data).then((res) => res.data),
  syncProject: (id: string) => apiClient.post<void>(`/engineering/projects/${id}/sync`),
};
