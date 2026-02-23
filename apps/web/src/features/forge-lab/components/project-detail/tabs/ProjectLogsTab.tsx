import React from "react";
import { Project } from "../../../types";
import { cn } from "@/shared/lib/utils";

interface ProjectLogsTabProps {
  project: Project;
  isLoading?: boolean;
}

export const ProjectLogsTab: React.FC<ProjectLogsTabProps> = ({ project, isLoading }) => {
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative pl-8 border-l border-white/5 pb-8">
            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-white/10" />
            <div className="flex items-center gap-3 mb-2">
              <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-12 bg-white/5 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {project.logs?.map((log) => (
        <div key={log.id} className="relative pl-8 border-l border-white/10 pb-8 last:pb-0">
          <div
            className={cn(
              "absolute -left-1.5 top-0 w-3 h-3 rounded-full border-2 border-[#09090b]",
              log.type === "milestone" ? "bg-yellow-400" : "bg-gray-500"
            )}
          />
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-mono text-gray-500">{log.date.toLocaleDateString()}</span>
            <span
              className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase",
                log.type === "milestone"
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-gray-500/10 text-gray-400"
              )}
            >
              {log.type}
            </span>
          </div>
          <p className="text-gray-200">{log.content}</p>
        </div>
      ))}
    </div>
  );
};
