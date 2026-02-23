import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { forgeApi } from "../api";
import type { Project } from "../types";

// Keys for cache management
export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  detail: (id: string) => [...projectKeys.all, "detail", id] as const,
  stats: (id: string) => [...projectKeys.all, "stats", id] as const,
};

export const useProjects = () => {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: () => forgeApi.getProjects(),
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => forgeApi.getProject(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // Keep summary fresh for 5 mins
  });
};

export const useProjectGithubStats = (id: string, enabled = true) => {
  return useQuery({
    queryKey: projectKeys.stats(id),
    queryFn: () => forgeApi.getProjectGithubStats(id),
    enabled: !!id && enabled,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
};

export const useProjectReadme = (id: string, enabled = false) => {
  return useQuery({
    queryKey: [...projectKeys.detail(id), "readme"],
    queryFn: () => forgeApi.getProjectReadme(id),
    enabled: !!id && enabled,
    staleTime: 30 * 60 * 1000,
  });
};

export const useProjectTaskBoard = (id: string, enabled = false) => {
  return useQuery({
    queryKey: [...projectKeys.detail(id), "taskboard"],
    queryFn: () => forgeApi.getProjectTaskBoard(id),
    enabled: !!id && enabled,
    staleTime: 1 * 60 * 1000,
  });
};

export const useProjectLogs = (id: string, page = 1, enabled = false) => {
  return useQuery({
    queryKey: [...projectKeys.detail(id), "logs", page],
    queryFn: () => forgeApi.getProjectLogs(id, page),
    enabled: !!id && enabled,
    // keepPreviousData: true, // Deprecated in v5, use placeholderData
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Project>) => forgeApi.createProject(data),
    onSuccess: () => {
      toast.success("Project created successfully");
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create project");
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) =>
      forgeApi.updateProject(id, data),
    onSuccess: (updatedProject) => {
      // toast.success("Project updated successfully");

      // Update Detail Cache
      queryClient.setQueryData(projectKeys.detail(updatedProject.id), updatedProject);

      // Invalidate List to refresh summaries
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update project");
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => forgeApi.deleteProject(id),
    onSuccess: () => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to delete project");
    },
  });
};

export const useSyncProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => forgeApi.syncProject(id),
    onSuccess: (syncedProject) => {
      toast.success("Project synced with GitHub!");

      // Update Detail Cache
      queryClient.setQueryData(projectKeys.detail(syncedProject.id), syncedProject);

      // Also update stats cache if sync returns fresh stats
      if (syncedProject.githubStats) {
        queryClient.setQueryData(projectKeys.stats(syncedProject.id), syncedProject.githubStats);
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to sync project");
    },
  });
};
