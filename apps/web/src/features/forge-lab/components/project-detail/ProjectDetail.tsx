import {
  ArrowLeft,
  Github,
  Link as LinkIcon,
  Layout,
  ListTodo,
  History,
  Activity,
  FileText,
  Settings,
  Trash2,
  Loader2,
  RefreshCw,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

import { cn } from "@/shared/lib/utils";

import {
  useProject,
  useProjectGithubStats,
  useProjectReadme,
  useProjectTaskBoard,
  useProjectLogs,
  useUpdateProject,
  useDeleteProject,
  useSyncProject,
} from "../../hooks/useProjects";
import type { Project, GithubRepo } from "../../types";
import { GlassCard } from "../ui/GlassCard";


import { EditProjectModal, DeleteConfirmModal } from "./ProjectModals";
import { RepoPicker } from "./RepoPicker";
import { ProjectLogsTab } from "./tabs/ProjectLogsTab";
import { ProjectOverviewTab } from "./tabs/ProjectOverviewTab";
import { ProjectReadmeTab } from "./tabs/ProjectReadmeTab";
import { ProjectResourcesTab } from "./tabs/ProjectResourcesTab";
import { ProjectTasksTab } from "./tabs/ProjectTasksTab";



interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
  githubUsername?: string;
  onUpdate?: (id: string, data: Partial<Project>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

type Tab = "overview" | "tasks" | "resources" | "logs" | "readme";

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  projectId,
  onBack,
  githubUsername,
  onUpdate,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const {
    data: projectSummary,
    isLoading: isSummaryLoading,
    error: summaryError,
  } = useProject(projectId);
  const { data: projectStats } = useProjectGithubStats(projectId, true);
  const { data: projectReadme, isLoading: isReadmeLoading } = useProjectReadme(
    projectId,
    activeTab === "readme"
  );
  const { data: projectTaskBoard, isLoading: isTaskBoardLoading } = useProjectTaskBoard(
    projectId,
    activeTab === "tasks"
  );
  const { data: projectLogs, isLoading: isLogsLoading } = useProjectLogs(
    projectId,
    1,
    activeTab === "logs"
  );

  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();
  const syncProjectMutation = useSyncProject();

  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showRepoPicker, setShowRepoPicker] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [editingResourceIndex, setEditingResourceIndex] = useState<number | null>(null);

  const project: Project | null = projectSummary
    ? {
        ...projectSummary,
        updatedAt: new Date(projectSummary.updatedAt),
        dueDate: projectSummary.dueDate ? new Date(projectSummary.dueDate) : undefined,
        logs:
          projectLogs?.data?.map((l) => ({ ...l, date: new Date(l.date) })) ||
          projectSummary.logs?.map((l) => ({ ...l, date: new Date(l.date) })),
        // Merge TaskBoard
        taskBoard: projectTaskBoard ||
          projectSummary.taskBoard || { todo: [], inProgress: [], done: [] },
        links: projectSummary.links || [],
        // Merge Stats
        githubStats: projectStats
          ? {
              ...projectSummary.githubStats,
              ...projectStats,
              // If specific readme fetched, override stats readme
              readme: projectReadme?.content || projectStats.readme,
            }
          : projectSummary.githubStats,
      }
    : null;

  const loading = isSummaryLoading;
  const error = summaryError ? "Failed to load project details" : null;
  const isSyncing = syncProjectMutation.isPending;

  // Effect removed - React Query handles fetching

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 md:p-10 pb-32">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="h-8 w-64 bg-white/5 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-96 bg-white/5 rounded-xl animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-64 bg-white/5 rounded-xl animate-pulse" />
            <div className="h-64 bg-white/5 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="max-w-7xl mx-auto p-6 md:p-10 pb-32">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <GlassCard className="p-12 text-center">
          <div className="text-red-400 mb-4">
            <Activity size={48} className="mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Failed to Load Project</h2>
          <p className="text-gray-400 mb-6">{error || "Project not found"}</p>
          <button
            onClick={onBack}
            className="px-6 py-2 rounded-xl bg-forge-cyan/10 border border-forge-cyan/20 text-forge-cyan hover:bg-forge-cyan/20 transition-colors"
          >
            Back to Projects
          </button>
        </GlassCard>
      </div>
    );
  }

  const handleRepoSelect = (repo: GithubRepo) => {
    setNewLink({
      title: repo.full_name,
      url: repo.html_url,
    });
    setShowRepoPicker(false);
  };

  const handleSaveResource = async () => {
    if (!project) return;
    try {
      const updatedLinks = [...(project.links || [])];
      const iconType = newLink.url.includes("github") ? "github" : "link";
      const linkData = { ...newLink, icon: iconType as "github" | "link" };

      if (editingResourceIndex !== null) {
        updatedLinks[editingResourceIndex] = linkData;
      } else {
        updatedLinks.push(linkData);
      }

      await updateProjectMutation.mutateAsync({
        id: project.id,
        data: { links: updatedLinks },
      });

      toast.success(editingResourceIndex !== null ? "Resource updated" : "Resource added");

      setShowResourceModal(false);
      setNewLink({ title: "", url: "" });
      setEditingResourceIndex(null);
    } catch {
      // Error handled by mutation hook
    }
  };

  const handleDeleteResource = async () => {
    if (!project || editingResourceIndex === null) return;
    try {
      const updatedLinks = [...(project.links || [])];
      updatedLinks.splice(editingResourceIndex, 1);

      await updateProjectMutation.mutateAsync({
        id: project.id,
        data: { links: updatedLinks },
      });

      toast.success("Resource deleted");

      setShowResourceModal(false);
      setNewLink({ title: "", url: "" });
      setEditingResourceIndex(null);
    } catch {
      // Error handled by mutation hook
    }
  };

  const handleSync = async () => {
    if (!project) return;
    try {
      await syncProjectMutation.mutateAsync(project.id);
      // Toast handled by mutation
    } catch {
      // Error handled by mutation mutation
    }
  };

  const handleUpdate = async (id: string, data: Partial<Project>) => {
    try {
      await updateProjectMutation.mutateAsync({ id, data });
      setShowEditModal(false);
      // Toast handled by mutation
    } catch {
      // Error handled by mutation
    }
  };

  const handleDelete = async () => {
    if (!project) return;
    try {
      await deleteProjectMutation.mutateAsync(project.id);
      setShowDeleteModal(false);
      onBack();
    } catch {
      // Error handled by mutation
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 pb-32 animate-in fade-in slide-in-from-bottom-2 duration-700 ease-spring-out relative">
      {/* Ambient Background */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-forge-cyan/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]pointer-events-none -z-10" />

      {/* Navigation & Toolbar */}
      <div className="flex items-center justify-between mb-8 sticky top-4 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#09090b]/60 backdrop-blur-md border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-mono uppercase tracking-wider">Mission Control</span>
        </button>
        <div className="flex items-center gap-3">
          {/* GitHub Connect Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18171d]/80 border border-white/10 backdrop-blur-md">
            {project.githubStats ? (
              <>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-white font-mono flex items-center gap-2">
                  <Github size={12} /> {project.githubStats.stars || 0} Stars
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-gray-500" />
                <span className="text-xs text-gray-400 font-mono flex items-center gap-2">
                  <Github size={12} /> No Data
                </span>
              </>
            )}

            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="text-[10px] bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-white transition-colors flex items-center gap-1 ml-2"
            >
              {isSyncing ? <Loader2 size={10} className="animate-spin" /> : <RefreshCw size={10} />}
              {isSyncing ? "Syncing..." : "Sync GitHub"}
            </button>
          </div>

          <div className="flex items-center gap-2 bg-[#09090b]/60 backdrop-blur-md p-1 rounded-full border border-white/10">
            {[
              { id: "overview", icon: Layout, label: "Overview" },
              { id: "tasks", icon: ListTodo, label: "Tasks" },
              { id: "readme", icon: FileText, label: "Readme" },
              { id: "resources", icon: LinkIcon, label: "Resources" },
              { id: "logs", icon: History, label: "Logs" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header / Mission Brief (Collapsed on other tabs) */}
      <div
        className={cn(
          "mb-8 relative transition-all duration-500",
          activeTab !== "overview" && "mb-4 opacity-80"
        )}
      >
        <div className="pl-6 border-l-2 border-forge-cyan/30">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-none tracking-tight mb-2">
              {project.title}
            </h1>
            <div className="flex items-center gap-2 shrink-0">
              {onUpdate && (
                <button
                  onClick={() => setShowEditModal(true)}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
                  title="Edit Project"
                >
                  <Settings size={20} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all"
                  title="Delete Project"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
          {activeTab === "overview" && (
            <p className="text-lg text-gray-400 font-light max-w-2xl animate-in fade-in slide-in-from-bottom-1 duration-500 border-l border-white/10 pl-4 mt-4 italic">
              &quot;{project.description}&quot;
            </p>
          )}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="min-h-[400px]">
        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && <ProjectOverviewTab project={project} />}

        {/* 2. README TAB */}
        {activeTab === "readme" && (
          <ProjectReadmeTab
            project={project}
            onSync={handleSync}
            isSyncing={isSyncing}
            isLoading={isReadmeLoading}
          />
        )}

        {/* 3. TASKS TAB */}
        {activeTab === "tasks" && (
          <ProjectTasksTab project={project} isLoading={isTaskBoardLoading} />
        )}

        {/* 4. LOGS TAB */}
        {activeTab === "logs" && <ProjectLogsTab project={project} isLoading={isLogsLoading} />}

        {/* 5. RESOURCES TAB */}
        {activeTab === "resources" && (
          <ProjectResourcesTab
            project={project}
            onAdd={() => {
              setEditingResourceIndex(null);
              setNewLink({ title: "", url: "" });
              setShowResourceModal(true);
            }}
            onEdit={(link, index) => {
              setEditingResourceIndex(index);
              setNewLink(link);
              setShowResourceModal(true);
            }}
          />
        )}

        {/* Add Resource Modal */}
        {showResourceModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <GlassCard className="w-full max-w-md p-6 space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">
                {editingResourceIndex !== null ? "Edit Resource" : "Add Resource Link"}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-end -mb-2">
                  <button
                    onClick={() => setShowRepoPicker(true)}
                    className="text-xs text-forge-cyan hover:underline flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!githubUsername}
                    title={!githubUsername ? "Connect GitHub to import" : "Import repository"}
                  >
                    <Github size={12} /> Import from GitHub
                  </button>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold block mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newLink.title}
                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-forge-cyan/50"
                    placeholder="e.g. GitHub Repo"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold block mb-1">
                    URL
                  </label>
                  <input
                    type="text"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-forge-cyan/50"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                {editingResourceIndex !== null ? (
                  <button
                    onClick={handleDeleteResource}
                    className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowResourceModal(false);
                      setNewLink({ title: "", url: "" });
                      setEditingResourceIndex(null);
                    }}
                    className="px-4 py-2 rounded-lg text-gray-400 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveResource}
                    disabled={!newLink.title || !newLink.url}
                    className="px-4 py-2 rounded-lg bg-forge-cyan text-black font-bold hover:bg-forge-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editingResourceIndex !== null ? "Save Changes" : "Add Link"}
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
      {/* Modals */}
      <RepoPicker
        isOpen={showRepoPicker}
        onClose={() => setShowRepoPicker(false)}
        onSelect={handleRepoSelect}
        username={githubUsername}
      />

      <EditProjectModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={handleUpdate}
        project={project}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        projectTitle={project.title}
      />
    </div>
  );
};
