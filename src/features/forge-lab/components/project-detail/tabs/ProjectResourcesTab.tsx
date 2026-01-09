import React from "react";
import { Plus, GitBranch, Link as LinkIcon, PenTool, FileText } from "lucide-react";
import { Project } from "../../../types";
import { GlassCard } from "../../ui/GlassCard";

interface ProjectLink {
  title: string;
  url: string;
  icon?: "github" | "figma" | "doc" | "link";
}

interface ProjectResourcesTabProps {
  project: Project;
  onAdd: () => void;
  onEdit: (link: ProjectLink, index: number) => void;
}

export const ProjectResourcesTab: React.FC<ProjectResourcesTabProps> = ({
  project,
  onAdd,
  onEdit,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <GlassCard
        onClick={onAdd}
        className="border-dashed border-white/20 flex flex-col items-center justify-center py-10 text-gray-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
      >
        <Plus size={32} className="mb-2" />
        <span className="font-medium">Add Resource</span>
      </GlassCard>
      {project.links?.map((link, i) => (
        <GlassCard
          key={i}
          onClick={() => onEdit(link, i)}
          className="group hover:bg-white/10 cursor-pointer transition-colors relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity -rotate-12 translate-x-2 -translate-y-2">
            {link.icon === "github" ? <GitBranch size={64} /> : <LinkIcon size={64} />}
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="p-2 w-fit rounded-lg bg-white/5 text-gray-400 group-hover:text-white transition-colors mb-4">
              {link.icon === "github" ? (
                <GitBranch size={24} />
              ) : link.icon === "figma" ? (
                <PenTool size={24} />
              ) : link.icon === "doc" ? (
                <FileText size={24} />
              ) : (
                <LinkIcon size={24} />
              )}
            </div>
            <div>
              <div className="font-bold text-xl text-white mb-1">{link.title}</div>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-forge-cyan opacity-0 group-hover:opacity-100 transition-colors truncate hover:underline block"
                onClick={(e) => e.stopPropagation()}
              >
                Open Resource &rarr;
              </a>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};
