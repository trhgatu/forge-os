import { Cpu, Activity, Clock, History, Users } from "lucide-react";
import Image from "next/image";
import React from "react";


import { GlassCard } from "@/shared/components/ui/GlassCard";
import { cn } from "@/shared/lib/utils";

import type { Project } from "../../../types";

interface ProjectOverviewTabProps {
  project: Project;
}

export const ProjectOverviewTab: React.FC<ProjectOverviewTabProps> = ({ project }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards">
      {/* LEFT COLUMN: Main Stats & Squad */}
      <div className="lg:col-span-4 space-y-6">
        {/* Overall Progress HUD - Cyberpunk Style */}
        <div className="p-6 rounded-3xl bg-[#0c0c0e]/80 backdrop-blur-xl border border-white/10 relative overflow-hidden group shadow-2xl shadow-black/50">
          {/* Grid Background Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="absolute top-0 right-0 p-4 opacity-50">
            <Cpu size={20} className="text-forge-cyan/50" />
          </div>

          <h3 className="text-[10px] font-bold text-forge-cyan uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-forge-cyan animate-pulse"></span>
            System Status
          </h3>

          <div className="flex flex-col items-center justify-center py-4 relative">
            {/* Accurate Circular Progress */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Outer Ring decoration */}
              <div className="absolute inset-0 rounded-full border border-white/5 border-dashed animate-[spin_10s_linear_infinite]" />

              <svg className="w-full h-full -rotate-90 transform drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                {/* Track */}
                <circle
                  cx="88"
                  cy="88"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white/5"
                />
                {/* Indicator */}
                <circle
                  cx="88"
                  cy="88"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * (project.progress || 0)) / 100}
                  className="text-forge-cyan transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-display font-bold text-white tracking-tighter">
                  {project.progress}
                  <span className="text-lg text-gray-500 font-normal">%</span>
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                  Optimization
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3 relative z-10">
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border-l-2 border-l-forge-cyan border-y border-r border-white/5">
              <div>
                <div className="text-[9px] text-gray-500 uppercase tracking-wider">
                  Current Milestone
                </div>
                <div className="text-sm font-bold text-white max-w-[120px] truncate">
                  {project.currentMilestone?.title || "Phase 1 Init"}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-forge-accent font-bold">
                  {project.currentMilestone?.progress}%
                </div>
                <div className="text-[9px] text-gray-500">
                  {project.currentMilestone?.dueDate instanceof Date
                    ? project.currentMilestone?.dueDate.toLocaleDateString()
                    : project.currentMilestone?.dueDate}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[9px] text-gray-500 uppercase mb-1">Velocity</div>
                <div className="text-sm text-emerald-400 font-mono flex items-center gap-1">
                  <Activity size={12} /> Optimal
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[9px] text-gray-500 uppercase mb-1">Time Remaining</div>
                <div className="text-sm text-white font-mono flex items-center gap-1">
                  <Clock size={12} /> 14 Days
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Language Distribution (New) */}
        <GlassCard>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
            Language Composition
          </h3>
          <div className="flex h-3 w-full rounded-full overflow-hidden mb-3">
            <div className="h-full bg-blue-500 w-[45%]" />
            <div className="h-full bg-yellow-400 w-[30%]" />
            <div className="h-full bg-pink-500 w-[15%]" />
            <div className="h-full bg-gray-500 w-[10%]" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="flex items-center gap-1.5 text-gray-300">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              TypeScript (45%)
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              JavaScript (30%)
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <div className="w-2 h-2 rounded-full bg-pink-500" />
              SCSS (15%)
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              Other (10%)
            </div>
          </div>
        </GlassCard>

        {/* Tech Stack & Languages */}
        <GlassCard>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Cpu size={14} /> Technologies
          </h3>

          {/* GitHub Languages Distribution */}
          {project.githubStats?.languages &&
            Object.keys(project.githubStats.languages).length > 0 && (
              <div className="mb-6 space-y-2">
                <div className="flex h-2 w-full rounded-full overflow-hidden bg-white/5">
                  {(() => {
                    const total = Object.values(project.githubStats!.languages!).reduce(
                      (a, b) => a + b,
                      0
                    );
                    const colors = [
                      "bg-blue-500",
                      "bg-yellow-400",
                      "bg-red-500",
                      "bg-purple-500",
                      "bg-green-500",
                      "bg-gray-500",
                    ];
                    return Object.entries(project.githubStats!.languages!).map(
                      ([lang, bytes], i) => (
                        <div
                          key={lang}
                          style={{ width: `${(bytes / total) * 100}%` }}
                          className={colors[i % colors.length]}
                          title={`${lang}: ${Math.round((bytes / total) * 100)}%`}
                        />
                      )
                    );
                  })()}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {(() => {
                    const colors = [
                      "bg-blue-500",
                      "bg-yellow-400",
                      "bg-red-500",
                      "bg-purple-500",
                      "bg-green-500",
                      "bg-gray-500",
                    ];
                    return Object.keys(project.githubStats!.languages!).map((lang, i) => (
                      <div
                        key={lang}
                        className="flex items-center gap-1.5 text-[10px] text-gray-400"
                      >
                        <div className={`w-2 h-2 rounded-full ${colors[i % colors.length]}`} />
                        {lang}
                      </div>
                    ));
                  })()}
                </div>
              </div>
            )}

          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech) => (
              <div
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 font-mono hover:bg-white/10 hover:border-forge-cyan/30 transition-colors cursor-default"
              >
                {tech}
              </div>
            ))}
            <button className="px-3 py-1.5 rounded-lg border border-dashed border-white/10 text-xs text-gray-500 hover:text-white hover:border-white/20 transition-colors">
              + Add
            </button>
          </div>
        </GlassCard>
      </div>

      {/* MIDDLE: Heatmap & Activity */}
      <div className="lg:col-span-8 space-y-6">
        {/* Contribution Heatmap (Real) */}
        <GlassCard className="relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity size={16} /> Activity Heatmap
                </h3>
                {project.githubStats && (
                  <div className="text-[10px] text-gray-500 mt-1 font-mono">
                    {(() => {
                      const activityCount =
                        project.githubStats.commitActivity?.reduce(
                          (acc, curr) => acc + curr.count,
                          0
                        ) || 0;
                      const recentCount = project.githubStats.recentCommits?.length || 0;
                      const displayCount = activityCount > 0 ? activityCount : recentCount;
                      const isEstimate = activityCount === 0 && recentCount > 0;

                      return (
                        <>
                          {displayCount}
                          {isEstimate ? "+" : ""} commits{" "}
                          {isEstimate ? "recently" : "in the last year"}
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
              <select className="bg-black/20 border border-white/10 rounded-lg text-[10px] text-gray-400 px-2 py-1 outline-none">
                <option>Last 1 Year</option>
              </select>
            </div>

            {/* Real Heatmap Grid */}
            <div className="flex gap-1 justify-between overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
              {(() => {
                // Prepare Data Map
                const commitMap = new Map<string, number>();

                // 1. Try to load from official stats
                if (
                  project.githubStats?.commitActivity &&
                  project.githubStats.commitActivity.length > 0
                ) {
                  project.githubStats.commitActivity.forEach((c) => {
                    commitMap.set(new Date(c.date).toDateString(), c.count);
                  });
                } else if (project.githubStats?.recentCommits) {
                  // 2. Fallback: Reconstruct from recentCommits if official stats are empty (e.g. 202 status)
                  project.githubStats.recentCommits.forEach((c) => {
                    const dateStr = new Date(c.date).toDateString();
                    commitMap.set(dateStr, (commitMap.get(dateStr) || 0) + 1);
                  });
                }

                // Generate last 28 weeks
                const today = new Date();
                // Find the Sunday of 28 weeks ago to start correct grid?
                // Simplified: Just 28 columns ending today.
                return Array.from({ length: 28 }).map((_, colIndex) => {
                  // colIndex 27 is current week
                  const weekOffset = 27 - colIndex;

                  return (
                    <div key={colIndex} className="flex flex-col gap-1">
                      {Array.from({ length: 7 }).map((_, rowIndex) => {
                        // Calculate exact date for this cell
                        // We want the grid to end at "Today" (or end of this week)
                        // Let's assume today is the last cell of the last column for simplicity or verify date?
                        // Standard GitHub graph: Columns are weeks (Sun-Sat).
                        // Let's say Col 27 is "This Week".

                        const cellDate = new Date();
                        cellDate.setDate(
                          today.getDate() - weekOffset * 7 + (rowIndex - today.getDay())
                        );
                        // Adjustment: Calendar usually aligns rows as Sun(0)-Sat(6).
                        // rowIndex 0-6.
                        // We basically iterate days backwards.

                        const dateStr = cellDate.toDateString();
                        const count = commitMap.get(dateStr) || 0;

                        const color =
                          count === 0
                            ? "bg-white/5"
                            : count <= 2
                              ? "bg-emerald-900/40"
                              : count <= 5
                                ? "bg-emerald-600/60"
                                : count <= 10
                                  ? "bg-emerald-500/80"
                                  : "bg-emerald-400";

                        return (
                          <div
                            key={rowIndex}
                            className={cn("w-3 h-3 rounded-[2px] transition-all", color)}
                            title={`${dateStr}: ${count} commits`}
                          />
                        );
                      })}
                    </div>
                  );
                });
              })()}
            </div>
            <div className="flex justify-end items-center gap-2 mt-2 text-[10px] text-gray-500">
              <span>Less</span>
              <div className="w-2 h-2 rounded-[2px] bg-white/5" />
              <div className="w-2 h-2 rounded-[2px] bg-emerald-900/40" />
              <div className="w-2 h-2 rounded-[2px] bg-emerald-600/60" />
              <div className="w-2 h-2 rounded-[2px] bg-emerald-500/80" />
              <div className="w-2 h-2 rounded-[2px] bg-emerald-400" />
              <span>More</span>
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <GlassCard>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <History size={16} /> Recent Updates
            </h3>
            <div className="space-y-4">
              {project.githubStats?.recentCommits ? (
                project.githubStats.recentCommits.slice(0, 5).map((commit, i) => (
                  <div key={i} className="flex gap-3 h-full group">
                    <div className="mt-1 flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-forge-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                      <div className="w-px h-full bg-white/5 mt-1 group-last:hidden" />
                    </div>
                    <div className="pb-4 w-full">
                      <a
                        href={commit.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-gray-300 hover:text-forge-cyan transition-colors line-clamp-2 font-medium mb-1"
                        title={commit.message}
                      >
                        {commit.message}
                      </a>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <span className="font-mono text-xs text-emerald-500/80">
                          {new Date(commit.date).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span>by</span>
                        <span className="text-gray-400 font-medium">{commit.author}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-500 italic py-4 text-center">
                  No recent activity fetched.
                </div>
              )}
            </div>
          </GlassCard>

          {/* Top Contributors */}
          <GlassCard>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Users size={16} /> Top Contributors
            </h3>
            <div className="space-y-3">
              {project.githubStats?.contributors && project.githubStats.contributors.length > 0 ? (
                project.githubStats.contributors.slice(0, 4).map((contributor, i) => (
                  <a
                    key={i}
                    href={contributor.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between group p-1 -mx-1 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {contributor.avatar_url ? (
                        <Image
                          src={contributor.avatar_url}
                          alt={contributor.login}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full border border-white/5 group-hover:border-white/20 transition-colors"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400 border border-white/5 group-hover:border-white/20 transition-colors">
                          {contributor.login[0].toUpperCase()}
                        </div>
                      )}

                      <div>
                        <div className="text-sm text-gray-300 font-medium group-hover:text-forge-cyan transition-colors">
                          {contributor.login}
                        </div>
                        <div className="text-[10px] text-gray-500">
                          {contributor.contributions} commits
                        </div>
                      </div>
                    </div>
                    {i === 0 && (
                      <div className="text-[10px] font-mono text-yellow-400/80 bg-yellow-400/10 px-1.5 py-0.5 rounded border border-yellow-400/20">
                        #1
                      </div>
                    )}
                  </a>
                ))
              ) : (
                <div className="text-xs text-gray-500 italic py-4 text-center">
                  No contributors fetched.
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
