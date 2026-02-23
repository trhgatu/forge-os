import { FileText, RefreshCw } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";

import { GlassCard } from "@/shared/components/ui/GlassCard";

import type { Project } from "../../../types";


interface ProjectReadmeTabProps {
  project: Project;
  onSync: () => void;
  isSyncing: boolean;
  isLoading?: boolean;
}

export const ProjectReadmeTab: React.FC<ProjectReadmeTabProps> = ({
  project,
  onSync,
  isSyncing,
  isLoading,
}) => {
  return (
    <GlassCard className="min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-500">
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-1/3 bg-white/5 rounded" />
          <div className="h-4 w-full bg-white/5 rounded" />
          <div className="h-4 w-full bg-white/5 rounded" />
          <div className="h-4 w-2/3 bg-white/5 rounded" />
          <div className="my-8 h-px bg-white/5" />
          <div className="h-4 w-full bg-white/5 rounded" />
          <div className="h-4 w-1/2 bg-white/5 rounded" />
        </div>
      ) : project.githubStats?.readme ? (
        <div className="prose prose-invert prose-sm md:prose-base max-w-none text-gray-300">
          <ReactMarkdown
            components={{
              img: ({ ...props }) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img {...props} className="rounded-xl border border-white/10" alt="readme" />
              ),
            }}
          >
            {project.githubStats.readme}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <FileText size={48} className="mb-4 opacity-20" />
          <p className="font-light">No README.md found in linked repository.</p>
          <button
            onClick={onSync}
            disabled={isSyncing}
            className="mt-4 text-forge-cyan hover:underline text-sm flex items-center gap-1"
          >
            <RefreshCw size={12} /> Sync Now
          </button>
        </div>
      )}
    </GlassCard>
  );
};
