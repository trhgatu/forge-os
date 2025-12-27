import React, { useState } from "react";
import {
  ArrowLeft,
  Github,
  Plus,
  Users,
  Cpu,
  Link as LinkIcon,
  GitBranch,
  PenTool,
  Layout,
  ListTodo,
  History,
  Activity,
  Clock,
  FileText,
} from "lucide-react";
import { Project } from "../types";
import { GlassCard } from "./GlassCard";
import { cn } from "@/shared/lib/utils";

import { forgeApi } from "../api";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

type Tab = "overview" | "tasks" | "resources" | "logs";

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project: initialProject,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [project, setProject] = useState<Project>(initialProject);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [editingResourceIndex, setEditingResourceIndex] = useState<number | null>(null);

  const handleSaveResource = async () => {
    try {
      const updatedLinks = [...(project.links || [])];
      const iconType = newLink.url.includes("github") ? "github" : "link";
      const linkData = { ...newLink, icon: iconType as "github" | "link" };

      if (editingResourceIndex !== null) {
        updatedLinks[editingResourceIndex] = linkData;
      } else {
        updatedLinks.push(linkData);
      }

      // API Call - Now returns updated project
      const updated = await forgeApi.updateProject(project.id, { links: updatedLinks });
      toast.success(editingResourceIndex !== null ? "Resource updated" : "Resource added");

      if (updated) {
        setProject({
          ...updated,
          updatedAt: new Date(updated.updatedAt),
          dueDate: updated.dueDate ? new Date(updated.dueDate) : undefined,
          logs: updated.logs?.map((l) => ({ ...l, date: new Date(l.date) })),
          taskBoard: updated.taskBoard || { todo: [], inProgress: [], done: [] },
        });
      }

      setShowResourceModal(false);
      setNewLink({ title: "", url: "" });
      setEditingResourceIndex(null);
    } catch (error) {
      console.error("Failed to save resource", error);
      toast.error("Failed to save resource");
    }
  };

  const handleDeleteResource = async () => {
    if (editingResourceIndex === null) return;
    try {
      const updatedLinks = [...(project.links || [])];
      updatedLinks.splice(editingResourceIndex, 1);

      // API Call
      const updated = await forgeApi.updateProject(project.id, { links: updatedLinks });
      toast.success("Resource deleted");

      if (updated) {
        setProject({
          ...updated,
          updatedAt: new Date(updated.updatedAt),
          dueDate: updated.dueDate ? new Date(updated.dueDate) : undefined,
          logs: updated.logs?.map((l) => ({ ...l, date: new Date(l.date) })),
          taskBoard: updated.taskBoard || { todo: [], inProgress: [], done: [] },
        });
      }

      setShowResourceModal(false);
      setNewLink({ title: "", url: "" });
      setEditingResourceIndex(null);
    } catch (error) {
      console.error("Failed to delete resource", error);
      toast.error("Failed to delete resource");
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const updated = await forgeApi.syncProject(project.id);
      toast.success("Sync started");

      if (updated) {
        setProject({
          ...updated,
          updatedAt: new Date(updated.updatedAt),
          dueDate: updated.dueDate ? new Date(updated.dueDate) : undefined,
          logs: updated.logs?.map((l) => ({ ...l, date: new Date(l.date) })),
          taskBoard: updated.taskBoard || { todo: [], inProgress: [], done: [] },
        });
        toast.success("Project synced with GitHub!");
      }
    } catch (error) {
      console.error("Sync failed", error);
      toast.error("Failed to sync project");
    } finally {
      setIsSyncing(false);
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
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-none tracking-tight mb-2">
            {project.title}
          </h1>
          {activeTab === "overview" && (
            <p className="text-lg text-gray-400 font-light max-w-2xl animate-in fade-in slide-in-from-bottom-1 duration-500 border-l border-white/10 pl-4 mt-4 italic">
              &quot;{project.description}&quot;
            </p>
          )}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="min-h-[400px]">
        {/* 1. OVERVIEW TAB - Mission Control Dashboard style */}
        {activeTab === "overview" && (
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
                        {project.currentMilestone?.dueDate.toLocaleDateString()}
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
                      <div className="text-[9px] text-gray-500 uppercase mb-1">Time Remaing</div>
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
                              <div
                                className={`w-2 h-2 rounded-full ${colors[i % colors.length]}`}
                              />
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
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Activity size={16} /> Activity Heatmap
                    </h3>
                    <select className="bg-black/20 border border-white/10 rounded-lg text-[10px] text-gray-400 px-2 py-1 outline-none">
                      <option>Last 6 Months</option>
                      <option>All Time</option>
                    </select>
                  </div>

                  {/* Real Heatmap Grid */}
                  <div className="flex gap-1 justify-between overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
                    {(() => {
                      // Prepare Data Map
                      const commitMap = new Map<string, number>();
                      project.githubStats?.commitActivity?.forEach((c) => {
                        commitMap.set(new Date(c.date).toDateString(), c.count);
                      });

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
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="mt-1">
                          <div className="w-2 h-2 rounded-full bg-forge-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                          <div className="w-px h-full bg-white/5 mx-auto mt-1" />
                        </div>
                        <div className="pb-4">
                          <div className="text-sm text-gray-200">
                            Merged PR <span className="text-forge-cyan font-mono">#342</span>: Fix
                            login race condition
                          </div>
                          <div className="text-[10px] text-gray-500 mt-1">
                            2 hours ago by @trungadmin
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Top Contributors */}
                <GlassCard>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Users size={16} /> Top Contributors
                  </h3>
                  <div className="space-y-3">
                    {project.team?.slice(0, 4).map((member, i) => (
                      <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400 border border-white/5 group-hover:border-white/20 transition-colors">
                            {member.name[0]}
                          </div>
                          <div>
                            <div className="text-sm text-gray-300 font-medium">{member.name}</div>
                            <div className="text-[10px] text-gray-500">32 commits</div>
                          </div>
                        </div>
                        <div className="text-xs font-mono text-emerald-400">+1245</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        )}

        {/* 2. TASKS TAB (Board) */}
        {activeTab === "tasks" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* TODO */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  To Do
                </span>
                <span className="text-xs bg-white/10 px-2 rounded-full text-white">
                  {project.taskBoard?.todo.length}
                </span>
              </div>
              <div className="space-y-3">
                {project.taskBoard?.todo.map((task) => (
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
                <span className="text-xs bg-forge-cyan/20 px-2 rounded-full text-forge-cyan">
                  {project.taskBoard?.inProgress.length}
                </span>
              </div>
              <div className="space-y-3">
                {project.taskBoard?.inProgress.map((task) => (
                  <GlassCard
                    key={task.id}
                    className="border-forge-cyan/30 bg-forge-cyan/5 hover:bg-forge-cyan/10 cursor-grab"
                  >
                    <div className="text-sm text-gray-100 mb-2">{task.title}</div>
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
              </div>
            </div>

            {/* DONE */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
                  Done
                </span>
                <span className="text-xs bg-emerald-500/20 px-2 rounded-full text-emerald-500">
                  {project.taskBoard?.done.length}
                </span>
              </div>
              <div className="space-y-3">
                {project.taskBoard?.done.map((task) => (
                  <GlassCard
                    key={task.id}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <div className="text-sm text-gray-400 line-through mb-2">{task.title}</div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. LOGS TAB */}
        {activeTab === "logs" && (
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
                  <span className="text-xs font-mono text-gray-500">
                    {log.date.toLocaleDateString()}
                  </span>
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
        )}

        {/* 4. RESOURCES TAB */}
        {activeTab === "resources" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <GlassCard
              onClick={() => {
                setEditingResourceIndex(null);
                setNewLink({ title: "", url: "" });
                setShowResourceModal(true);
              }}
              className="border-dashed border-white/20 flex flex-col items-center justify-center py-10 text-gray-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <Plus size={32} className="mb-2" />
              <span className="font-medium">Add Resource</span>
            </GlassCard>
            {project.links?.map((link, i) => (
              <GlassCard
                key={i}
                onClick={() => {
                  setEditingResourceIndex(i);
                  setNewLink(link);
                  setShowResourceModal(true);
                }}
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
        )}

        {/* Add Resource Modal */}
        {showResourceModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <GlassCard className="w-full max-w-md p-6 space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">
                {editingResourceIndex !== null ? "Edit Resource" : "Add Resource Link"}
              </h3>
              <div className="space-y-3">
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
    </div>
  );
};
