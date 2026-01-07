"use client";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { forgeApi } from "../api";
import { ProjectAdapter } from "../utils/projectAdapter";
import { toast } from "sonner";
import { Project } from "../types";

export type Tab = "overview" | "readme" | "tasks" | "logs" | "resources";

interface ResourceLink {
  title: string;
  url: string;
  icon?: "github" | "link" | "figma" | "doc";
}

const PROJECT_KEYS = {
  all: ["projects"] as const,
  detail: (id: string) => [...PROJECT_KEYS.all, id] as const,
  summary: (id: string) => [...PROJECT_KEYS.detail(id), "summary"] as const,
  githubStats: (id: string) => [...PROJECT_KEYS.detail(id), "githubStats"] as const,
  readme: (id: string) => [...PROJECT_KEYS.detail(id), "readme"] as const,
  taskBoard: (id: string) => [...PROJECT_KEYS.detail(id), "taskBoard"] as const,
  logs: (id: string, page: number, limit: number) =>
    [...PROJECT_KEYS.detail(id), "logs", page, limit] as const,
};

export const useProject = (projectId: string) => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [logsPage, setLogsPage] = useState(1);
  const logsLimit = 20;

  // 1. Summary (Always fetched)
  const summaryQuery = useQuery({
    queryKey: PROJECT_KEYS.summary(projectId),
    queryFn: () => forgeApi.getProject(projectId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const summary = summaryQuery.data;

  // 2. Lazy Queries (Dependent on activeTab)
  const githubStatsQuery = useQuery({
    queryKey: PROJECT_KEYS.githubStats(projectId),
    queryFn: () => forgeApi.getProjectGithubStats(projectId),
    enabled: activeTab === "overview" && !!summary,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const readmeQuery = useQuery({
    queryKey: PROJECT_KEYS.readme(projectId),
    queryFn: () => forgeApi.getProjectReadme(projectId),
    enabled: activeTab === "readme" && !!summary,
    staleTime: Infinity, // Creating readme rarely changes
  });

  const taskBoardQuery = useQuery({
    queryKey: PROJECT_KEYS.taskBoard(projectId),
    queryFn: () => forgeApi.getProjectTaskBoard(projectId),
    enabled: activeTab === "tasks" && !!summary,
  });

  const logsQuery = useQuery({
    queryKey: PROJECT_KEYS.logs(projectId, logsPage, logsLimit),
    queryFn: () => forgeApi.getProjectLogs(projectId, logsPage, logsLimit),
    enabled: activeTab === "logs" && !!summary,
    placeholderData: keepPreviousData, // Seamless pagination (React Query v5)
  });

  // 3. Adapter: Merge everything
  const project = useMemo<Project | null>(() => {
    if (!summary) return null;

    return ProjectAdapter.toProject(
      summary,
      githubStatsQuery.data,
      readmeQuery.data,
      taskBoardQuery.data,
      logsQuery.data
    );
  }, [summary, githubStatsQuery.data, readmeQuery.data, taskBoardQuery.data, logsQuery.data]);

  // 4. Mutations
  const syncMutation = useMutation({
    mutationFn: () => forgeApi.syncProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.detail(projectId) });
      toast.success("Project synced with GitHub!");
    },
    onError: () => toast.error("Failed to sync project"),
  });

  const updateLinkMutation = useMutation({
    mutationFn: (links: ResourceLink[]) => forgeApi.updateProject(projectId, { links }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.summary(projectId) });
      toast.success("Links updated");
    },
    onError: () => toast.error("Failed to update links"),
  });

  // Manual refetch wrapper for compatibility
  const refetchAll = async () => {
    await Promise.all([
      summaryQuery.refetch(),
      activeTab === "overview" && githubStatsQuery.refetch(),
      activeTab === "readme" && readmeQuery.refetch(),
      activeTab === "tasks" && taskBoardQuery.refetch(),
      activeTab === "logs" && logsQuery.refetch(),
    ]);
  };

  return {
    // Data
    project,
    activeTab,
    setActiveTab,

    // Pagination
    logsPage,
    setLogsPage,
    logsTotal: logsQuery.data?.total || 0,

    // Loading States
    isLoading: summaryQuery.isLoading,
    isStatsLoading: githubStatsQuery.isLoading,
    isReadmeLoading: readmeQuery.isLoading,
    isTasksLoading: taskBoardQuery.isLoading,
    isLogsLoading: logsQuery.isLoading,
    isSyncing: syncMutation.isPending, // React Query v5 uses isPending instead of isLoading for mutations

    // Errors
    error: summaryQuery.error,

    // Actions
    refetch: refetchAll,
    sync: syncMutation.mutateAsync,
    updateLinks: updateLinkMutation.mutateAsync,

    // Expose mutations for custom usage
    mutations: {
      sync: syncMutation,
      updateLinks: updateLinkMutation,
    },
  };
};
