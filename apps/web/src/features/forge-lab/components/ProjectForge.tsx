import { Plus, Search, Filter, MoreHorizontal, Folder, Clock } from 'lucide-react';
import React from 'react';

import { GlassCard } from '@/shared/components/ui/GlassCard';
import { Button, Input, Label, Tag, Skeleton } from '@/shared/components/ui';

import type { Project } from '../types';

import { ProjectDetail } from './project-detail/ProjectDetail';

interface ProjectForgeProps {
  projects: Project[];
  activeProjectId: string | null;
  setActiveProjectId: (projectId: string | null) => void;
  githubUsername?: string;
  onUpdateProject?: (id: string, data: Partial<Project>) => Promise<void>;
  onDeleteProject?: (id: string) => Promise<void>;
  onRequestCreate?: () => void;
  isLoading?: boolean;
}

export const ProjectForge: React.FC<ProjectForgeProps> = ({
  projects,
  activeProjectId,
  setActiveProjectId,
  githubUsername,
  onUpdateProject,
  onDeleteProject,
  onRequestCreate,
  isLoading,
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Ethereal label */}
          <div className="mb-3 flex items-center gap-2 opacity-85">
            <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
            <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase">
              System Operations
            </Label>
          </div>

          {/* Poetic Title */}
          <Label variant="default" className="text-3xl md:text-4xl font-bold text-white tracking-tight block capitalize mb-2">
            Projects
          </Label>

          {/* Flowing Subtitle */}
          <p className="text-gray-400 font-light">
            Manage your active systems and creative endeavors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Search projects..."
            icon={<Search size={14} />}
            className="bg-black/40 text-xs h-10 border-white/10 w-full md:w-64"
          />
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Filter size={18} />
          </Button>
          <Button
            onClick={onRequestCreate}
            className="flex items-center gap-2 bg-forge-cyan/15 border border-forge-cyan/20 text-forge-cyan hover:bg-forge-cyan/25 transition-colors font-medium h-10 rounded-xl px-4"
          >
            <Plus size={16} /> New Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <GlassCard key={i} className="flex flex-col h-full space-y-4">
              <div className="flex justify-between items-start">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="w-8 h-8 rounded-lg" />
              </div>
              <Skeleton className="w-40 h-6 animate-pulse" />
              <div className="space-y-2 flex-1">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-5/6 h-4" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="w-16 h-5 rounded-full" />
                <Skeleton className="w-12 h-5 rounded-full" />
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>
            </GlassCard>
          ))
        ) : (
          projects.map((project) => (
            <GlassCard
              key={project.id}
              className="group hover:border-white/20 flex flex-col h-full cursor-pointer"
              onClick={() => setActiveProjectId(project.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-gray-300 group-hover:text-white group-hover:bg-white/10 transition-colors">
                  <Folder size={20} />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-white transition-colors h-8 w-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal size={16} />
                </Button>
              </div>

              <Label
                variant="default"
                className="text-lg font-bold text-white mb-2 group-hover:text-forge-cyan transition-colors block"
              >
                {project.title}
              </Label>
              <p className="text-sm text-gray-400 mb-6 line-clamp-2 flex-1 font-light leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map((tag) => (
                  <Tag
                    key={tag}
                    variant="default"
                    className="px-2.5 py-1 text-[10px] font-mono text-gray-400 border border-white/5 bg-white/5"
                  >
                    {tag}
                  </Tag>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${project.status === 'active' ? 'bg-forge-cyan shadow-[0_0_10px_rgba(6,182,212,0.3)] animate-pulse' : 'bg-gray-600'}`}
                  />
                  <span className="capitalize">{project.status}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>{project.updatedAt.toLocaleDateString()}</span>
                </div>
              </div>
            </GlassCard>
          ))
        )}

        {!isLoading && (
          <button
            onClick={onRequestCreate}
            className="group border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 min-h-[250px] hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus size={24} className="text-gray-500 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-gray-500 group-hover:text-white">
              Create New Project
            </span>
          </button>
        )}
      </div>
    </div>
  );
};


