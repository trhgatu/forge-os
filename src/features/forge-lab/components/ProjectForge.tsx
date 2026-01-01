import React from "react";
import { Plus, Search, Filter, MoreHorizontal, Folder, Clock } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Project } from "../types";
import { ProjectDetail } from "./ProjectDetail";

interface ProjectForgeProps {
  projects: Project[];
  activeProjectId: string | null;
  setActiveProjectId: (projectId: string | null) => void;
  githubUsername?: string;
  onUpdateProject?: (id: string, data: Partial<Project>) => Promise<void>;
  onDeleteProject?: (id: string) => Promise<void>;
  onRequestCreate?: () => void;
}

export const ProjectForge: React.FC<ProjectForgeProps> = ({
  projects,
  activeProjectId,
  setActiveProjectId,
  githubUsername,
  onUpdateProject,
  onDeleteProject,
  onRequestCreate,
}) => {
  if (activeProjectId) {
    return (
      <ProjectDetail
        projectId={activeProjectId}
        onBack={() => setActiveProjectId(null)}
        githubUsername={githubUsername}
        onUpdate={onUpdateProject}
        onDelete={onDeleteProject}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 pb-32 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Project Forge</h1>
          <p className="text-gray-400 font-light">
            Manage your active systems and creative endeavors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 w-full md:w-64 transition-colors"
            />
          </div>
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <Filter size={18} />
          </button>
          <button
            onClick={onRequestCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forge-cyan/10 border border-forge-cyan/20 text-forge-cyan hover:bg-forge-cyan/20 transition-colors font-medium text-sm"
          >
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <GlassCard
            key={project.id}
            className="group hover:border-white/20 flex flex-col h-full cursor-pointer"
            onClick={() => setActiveProjectId(project.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-300 group-hover:text-white group-hover:bg-white/10 transition-colors">
                <Folder size={20} />
              </div>
              <button
                className="text-gray-600 hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal size={16} />
              </button>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-forge-cyan transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-400 mb-6 line-clamp-2 flex-1">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-mono text-gray-400 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${project.status === "active" ? "bg-emerald-500" : "bg-gray-600"}`}
                />
                <span className="capitalize">{project.status}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} />
                <span>{project.updatedAt.toLocaleDateString()}</span>
              </div>
            </div>
          </GlassCard>
        ))}

        <button
          onClick={onRequestCreate}
          className="group border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 min-h-[250px] hover:bg-white/5 hover:border-white/20 transition-all"
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus size={24} className="text-gray-500 group-hover:text-white" />
          </div>
          <span className="text-sm font-medium text-gray-500 group-hover:text-white">
            Create New Project
          </span>
        </button>
      </div>
    </div>
  );
};
