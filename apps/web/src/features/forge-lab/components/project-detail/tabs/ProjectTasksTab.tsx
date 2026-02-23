import { ListTodo, GitBranch, Plus, ArrowLeft } from "lucide-react";
import React, { useState } from "react";


import { GlassCard } from "@/shared/components/ui/GlassCard";
import { cn } from "@/shared/lib/utils";

import type { Project } from "../../../types";

interface ProjectTasksTabProps {
  project: Project;
  isLoading?: boolean;
}

export const ProjectTasksTab: React.FC<ProjectTasksTabProps> = ({ project, isLoading }) => {
  const [taskViewMode, setTaskViewMode] = useState<"board" | "issues">("board");

  if (isLoading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex gap-4 border-b border-white/5 pb-4">
          <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
                <div className="h-3 w-6 bg-white/5 rounded-full animate-pulse" />
              </div>
              <div className="h-24 bg-white/5 rounded-xl animate-pulse" />
              <div className="h-24 bg-white/5 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Task View Toggle */}
      <div className="flex items-center gap-4 border-b border-white/5 pb-4">
        <button
          onClick={() => setTaskViewMode("board")}
          className={cn(
            "text-sm font-bold uppercase tracking-wider flex items-center gap-2 pb-2 -mb-4 border-b-2 transition-all",
            taskViewMode === "board"
              ? "text-white border-forge-cyan"
              : "text-gray-500 border-transparent hover:text-gray-300"
          )}
        >
          <ListTodo size={14} /> Internal Board
        </button>
        <button
          onClick={() => setTaskViewMode("issues")}
          className={cn(
            "text-sm font-bold uppercase tracking-wider flex items-center gap-2 pb-2 -mb-4 border-b-2 transition-all",
            taskViewMode === "issues"
              ? "text-white border-forge-cyan"
              : "text-gray-500 border-transparent hover:text-gray-300"
          )}
        >
          <GitBranch size={14} /> GitHub Issues
          {project.githubStats?.issuesList && project.githubStats.issuesList.length > 0 && (
            <span className="bg-white/10 text-white text-[9px] px-1.5 rounded-full">
              {project.githubStats.issuesList.length}
            </span>
          )}
        </button>
      </div>

      {taskViewMode === "board" ? (
        // INTERNAL BOARD VIEW
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TODO */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                To Do
              </span>
              <span className="text-xs bg-white/10 px-2 rounded-full text-white">
                {project.taskBoard?.todo.length || 0}
              </span>
            </div>
            <div className="space-y-3">
              {project.taskBoard?.todo?.map((task) => (
                <GlassCard
                  key={task.id}
                  className="hover:border-white/20 cursor-grab active:cursor-grabbing"
                >
                  <div className="text-sm text-gray-200 mb-2">{task.title}</div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        task.priority === "high" ? "bg-red-500" : "bg-gray-500"
                      )}
                    />
                    <span className="text-[10px] text-gray-500 font-mono uppercase">
                      {task.priority}
                    </span>
                  </div>
                </GlassCard>
              ))}
              <button className="w-full py-3 rounded-xl border border-dashed border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-all text-sm flex items-center justify-center gap-2">
                <Plus size={14} /> Add Task
              </button>
            </div>
          </div>

          {/* IN PROGRESS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-forge-cyan uppercase tracking-widest">
                In Progress
              </span>
              <span className="text-xs bg-forge-cyan/10 text-forge-cyan px-2 rounded-full">
                {project.taskBoard?.inProgress.length || 0}
              </span>
            </div>
            <div className="space-y-3">
              {project.taskBoard?.inProgress?.map((task) => (
                <GlassCard key={task.id} className="border-forge-cyan/30 bg-forge-cyan/5">
                  <div className="text-sm text-gray-200 mb-2">{task.title}</div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        task.priority === "high" ? "bg-red-500" : "bg-gray-500"
                      )}
                    />
                    <span className="text-[10px] text-gray-500 font-mono uppercase">
                      {task.priority}
                    </span>
                  </div>
                </GlassCard>
              ))}
              <button className="w-full py-3 rounded-xl border border-dashed border-forge-cyan/20 text-forge-cyan/70 hover:text-forge-cyan hover:border-forge-cyan/50 transition-all text-sm flex items-center justify-center gap-2">
                <Plus size={14} /> Add Task
              </button>
            </div>
          </div>

          {/* DONE */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
                Done
              </span>
              <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 rounded-full">
                {project.taskBoard?.done.length || 0}
              </span>
            </div>
            <div className="space-y-3">
              {project.taskBoard?.done?.map((task) => (
                <GlassCard key={task.id} className="opacity-70 hover:opacity-100">
                  <div className="text-sm text-gray-400 line-through mb-2">{task.title}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-500 font-mono uppercase">
                      Completed
                    </span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // GITHUB ISSUES VIEW
        <div className="grid grid-cols-1 gap-3 animate-in fade-in duration-300">
          {project.githubStats?.issuesList && project.githubStats.issuesList.length > 0 ? (
            project.githubStats.issuesList.map((issue) => (
              <a
                key={issue.id}
                href={issue.html_url}
                target="_blank"
                rel="noreferrer"
                className="block group"
              >
                <GlassCard
                  className="py-3 px-4 flex items-center justify-between group-hover:border-white/20 transition-all"
                  noPadding
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-4 h-4 rounded-full border-2 border-green-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-200 font-medium group-hover:text-forge-cyan transition-colors line-clamp-1">
                        {issue.title} <span className="text-gray-500">#{issue.number}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        {issue.labels.map((label: { name: string; color: string }) => (
                          <span
                            key={label.name}
                            className="text-[10px] px-1.5 py-0.5 rounded border"
                            style={{
                              borderColor: `#${label.color}30`,
                              backgroundColor: `#${label.color}10`,
                              color: `#${label.color}`,
                            }}
                          >
                            {label.name}
                          </span>
                        ))}
                        <span className="text-[10px] text-gray-500">
                          opened on {new Date(issue.created_at).toLocaleDateString()}
                        </span>
                        {issue.assignee && (
                          <div className="flex items-center gap-1 ml-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={issue.assignee.avatar_url}
                              alt=""
                              className="w-3 h-3 rounded-full"
                            />
                            <span className="text-[10px] text-gray-400">
                              {issue.assignee.login}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-500 group-hover:text-white transition-colors">
                    <ArrowLeft className="rotate-[135deg]" size={14} />
                  </div>
                </GlassCard>
              </a>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
              <ListTodo size={32} className="mb-3 opacity-30" />
              <p>No open issues found on GitHub.</p>
              <p className="text-xs opacity-50 mt-1">Great job clearing the backlog!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
