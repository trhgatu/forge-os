import React from "react";
import {
  Layers,
  Book,
  Network,
  Sparkles,
  Activity,
  GitBranch,
  Star,
  Terminal,
  Zap,
  Cpu,
} from "lucide-react";
import { GlassCard } from "./GlassCard";
import {
  Project,
  Foundation,
  ResearchTrail,
  ForgeTab,
  ContributionStats,
  UserConnection,
} from "../types";
import { cn } from "@/shared/lib/utils";
import { forgeApi } from "../api";
import { SYSTEM_CONFIG } from "@/shared/config/system.config";
import { ConnectGithubWidget } from "./ConnectGithubWidget";
import { useAuthStore } from "@/shared/store/authStore";

interface LabDashboardProps {
  projects: Project[];
  foundations: Foundation[];
  trails: ResearchTrail[];
  setActiveTab: (tab: ForgeTab) => void;
  setActiveProject: (project: Project | null) => void;
}

export const LabDashboard: React.FC<LabDashboardProps> = ({
  projects,
  foundations,
  trails,
  setActiveTab,
  setActiveProject,
}) => {
  const [contributionStats, setContributionStats] = React.useState<ContributionStats | null>(null);
  const [loadingStats, setLoadingStats] = React.useState(true);
  const authUser = useAuthStore((state) => state.user);

  React.useEffect(() => {
    console.log("LabDashboard: Auth User Identity:", authUser);
    const initIdentity = async () => {
      // If no user is logged in (or yet to hydrate), we can't fetch profile.
      // But we should stop loading to avoid "Eternal Skeleton" if user is null.
      if (!authUser?.id) {
        console.warn("LabDashboard: No Auth User ID found. Stopping load.");
        setLoadingStats(false);
        return;
      }

      try {
        console.log("LabDashboard: Fetching profile for", authUser.id);
        // 1. Fetch full profile to check connections
        const profile = await forgeApi.getUser(authUser.id);
        console.log("LabDashboard: Profile loaded", profile);
        const githubConnection = profile.connections?.find(
          (c: UserConnection) => c.provider === "github"
        );

        if (githubConnection) {
          console.log("LabDashboard: Found GitHub connection", githubConnection);
          const username = githubConnection.identifier;
          const stats = await forgeApi.getGithubStats(username);
          setContributionStats(stats);
        } else {
          console.log("LabDashboard: No GitHub connection found. Show Connect Widget.");
          // Force widget view
          setContributionStats(null);
        }
      } catch (e) {
        console.error("LabDashboard: Error loading identity", e);
        // On error (e.g. 401), stop loading so we might see something (or empty state)
      } finally {
        setLoadingStats(false);
      }
    };

    initIdentity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?.id]);

  return (
    <div className="max-w-[1600px] mx-auto p-6 md:p-10 pb-32 space-y-10 animate-in fade-in zoom-in-95 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-400 mb-4 hover:bg-white/10 transition-colors cursor-default">
            <Sparkles size={12} className="text-forge-cyan animate-pulse-slow" />{" "}
            {SYSTEM_CONFIG.identity.role}
            <span className="ml-1 opacity-50">{SYSTEM_CONFIG.identity.level}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight mb-2">
            Forge Lab
          </h1>
          <p className="text-lg text-gray-400 font-light max-w-xl">
            Central Command for{" "}
            <span className="text-forge-cyan font-medium">System Evolution</span> &{" "}
            <span className="text-fuchsia-400 font-medium">Neural Research</span>.
          </p>
        </div>

        {/* Quick Stats Widget */}
        <div className="flex gap-4">
          <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-white/10 flex flex-col items-center min-w-[100px] group hover:border-forge-cyan/50 transition-colors">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Projects</div>
            <div className="text-2xl font-bold text-white group-hover:text-forge-cyan transition-colors">
              {projects.length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-white/10 flex flex-col items-center min-w-[100px] group hover:border-fuchsia-400/50 transition-colors">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Modules</div>
            <div className="text-2xl font-bold text-white group-hover:text-fuchsia-400 transition-colors">
              {foundations.length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-[#0c0c0e] border border-white/10 flex flex-col items-center min-w-[100px] group hover:border-emerald-400/50 transition-colors">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Research</div>
            <div className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
              {trails.length}
            </div>
          </div>
        </div>
      </div>

      {/* Nova Reflection Banner (Restored & Enhanced) */}
      <div className="relative p-0.5 rounded-3xl bg-linear-to-r from-forge-cyan/30 via-fuchsia-500/30 to-transparent overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-forge-cyan/10 via-fuchsia-500/10 to-transparent opacity-50 blur-xl"></div>
        <div className="bg-[#09090b]/90 backdrop-blur-xl rounded-[22px] p-6 md:p-8 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-forge-cyan/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-forge-cyan uppercase tracking-widest mb-3">
                <Sparkles size={14} /> System Reflection
              </div>
              <p className="text-xl md:text-2xl text-gray-200 font-light italic leading-relaxed">
                &quot;The architecture is stabilizing. Your integration of the &apos;Heatmap&apos;
                visualizer has increased system transparency by{" "}
                <span className="text-emerald-400 font-bold">42%</span>.&quot;
              </p>
            </div>
            {/* Interactive Action */}
            <button className="whitespace-nowrap px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-forge-cyan/50 transition-all text-sm font-medium text-white group flex items-center gap-3">
              <Zap size={16} className="text-yellow-400 group-hover:animate-pulse" />
              Initiate Deep Scan
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* COLUMN 1: Pinned "Directives" & Navigation */}
        <div className="lg:col-span-4 space-y-6">
          {/* Navigation Menu */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                id: "projects",
                label: "Projects",
                icon: Layers,
                color: "text-cyan-400",
                bg: "bg-cyan-400/10",
              },
              {
                id: "foundations",
                label: "Foundations",
                icon: Book,
                color: "text-fuchsia-400",
                bg: "bg-fuchsia-400/10",
              },
              {
                id: "research",
                label: "Research",
                icon: Network,
                color: "text-emerald-400",
                bg: "bg-emerald-400/10",
              },
              {
                id: "cli",
                label: "Terminal",
                icon: Terminal,
                color: "text-gray-400",
                bg: "bg-white/5",
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ForgeTab)}
                className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-[#0d1117] hover:bg-white/[0.03] hover:border-white/20 transition-all group text-left"
              >
                <div className={cn("p-2 rounded-lg transition-colors", item.bg, item.color)}>
                  <item.icon size={18} />
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Pinned Projects "Active Directives" */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Active Directives
              </h3>
              <button className="text-xs text-forge-cyan hover:underline">Customize</button>
            </div>

            {/* Dynamic Pinned Items */}
            {[...projects, ...foundations]
              .filter((item) => item.isPinned)
              .map((item) => (
                <GlassCard
                  key={item.id}
                  className={cn(
                    "group cursor-pointer transition-all border-white/5",
                    (item as { status?: string }).status === "active"
                      ? "hover:border-forge-cyan/30"
                      : "hover:border-fuchsia-400/30"
                  )}
                  noPadding
                  onClick={() =>
                    "type" in item ? setActiveTab("foundations") : setActiveProject(item as Project)
                  }
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        {"type" in item ? (
                          <Book size={16} className="text-fuchsia-400" />
                        ) : (
                          <Layers size={16} className="text-forge-cyan" />
                        )}
                        <span
                          className={cn(
                            "font-bold text-white text-sm transition-colors",
                            "type" in item
                              ? "group-hover:text-fuchsia-400"
                              : "group-hover:text-forge-cyan"
                          )}
                        >
                          {item.title}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-gray-400 border border-white/10">
                        {"githubStats" in item ? "Public" : "Internal"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {item.githubStats?.language && (
                        <div className="flex items-center gap-1.5">
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full",
                              item.githubStats.language === "TypeScript"
                                ? "bg-blue-500"
                                : "bg-yellow-400"
                            )}
                          />
                          <span className="text-gray-300">{item.githubStats.language}</span>
                        </div>
                      )}
                      {item.githubStats?.stars !== undefined && (
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-500/50" /> {item.githubStats.stars}
                        </div>
                      )}
                      {item.githubStats?.forks !== undefined && (
                        <div className="flex items-center gap-1">
                          <GitBranch size={12} /> {item.githubStats.forks}
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
          </div>
        </div>

        {/* COLUMN 2: Heatmap & Activity Feed */}
        <div className="lg:col-span-8 space-y-6">
          {/* Mission Graph (Heatmap) */}
          <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-50">
              <Activity size={20} className="text-emerald-500/50" />
            </div>

            {/* Conditional Rendering: Heatmap or Connect Widget */}
            {!contributionStats && !loadingStats ? (
              <div className="flex flex-col items-center justify-center py-10">
                {/* Determine if we need to connect or just loading */}
                <ConnectGithubWidget
                  onConnected={(username) => {
                    // Refresh stats
                    setLoadingStats(true);
                    forgeApi
                      .getGithubStats(username)
                      .then(setContributionStats)
                      .finally(() => setLoadingStats(false));
                  }}
                />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-0.5">Mission Graph</h3>
                    <p className="text-xs text-gray-500">
                      {contributionStats?.totalContributions
                        ? `${contributionStats.totalContributions} contributions in the last year`
                        : "Loading contributions..."}
                    </p>
                  </div>
                  <select className="bg-black/20 border border-white/10 rounded-lg text-[10px] text-gray-400 px-2 py-1 outline-none">
                    <option>2025</option>
                    <option>2024</option>
                  </select>
                </div>

                {/* Styled Heatmap */}
                <div className="flex gap-1.5 justify-between overflow-x-auto pb-2 scrollbar-hide mask-linear-fade">
                  <div className="flex flex-col justify-between text-[9px] text-gray-600 pr-2 pt-1.5">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>
                  {contributionStats?.weeks
                    ? contributionStats.weeks
                        .slice(contributionStats.weeks.length - 28)
                        .map((week, colIndex) => (
                          <div key={colIndex} className="flex flex-col gap-1.5">
                            {week.contributionDays.map((day, rowIndex) => {
                              const count = day.contributionCount;
                              const color =
                                count > 10
                                  ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                                  : count > 5
                                    ? "bg-emerald-500"
                                    : count > 2
                                      ? "bg-emerald-700/60"
                                      : count > 0
                                        ? "bg-emerald-900/40"
                                        : "bg-white/[0.03]";

                              return (
                                <div
                                  key={rowIndex}
                                  className={cn(
                                    "w-3 h-3 rounded-sm transition-all duration-500 hover:scale-125",
                                    color
                                  )}
                                  title={`${day.date}: ${count} contributions`}
                                />
                              );
                            })}
                          </div>
                        ))
                    : // Skeleton Loader
                      Array.from({ length: 28 }).map((_, colIndex) => (
                        <div key={colIndex} className="flex flex-col gap-1.5">
                          {Array.from({ length: 7 }).map((_, rowIndex) => (
                            <div
                              key={rowIndex}
                              className="w-3 h-3 rounded-sm bg-white/5 animate-pulse"
                            />
                          ))}
                        </div>
                      ))}
                </div>
              </>
            )}
          </GlassCard>

          {/* Activity Stream */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                System Logs
              </h3>
              <button className="text-xs text-forge-cyan hover:underline">View All</button>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:top-3 before:left-[11px] before:w-[2px] before:h-full before:bg-linear-to-b before:from-white/10 before:to-transparent">
              {/* Aggregated Logs from Projects */}
              {projects
                .flatMap((p) => p.logs?.map((log) => ({ ...log, projectTitle: p.title })) || [])
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .slice(0, 5)
                .map((log, index) => (
                  <div
                    key={`${log.projectTitle}-${log.date.getTime()}-${index}`}
                    className="relative group animate-in fade-in slide-in-from-left-4 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={cn(
                        "absolute -left-[23px] top-0 w-6 h-6 rounded-full bg-[#0c0c0e] flex items-center justify-center border border-white/10 z-10 transition-colors shadow-lg shadow-black",
                        log.type === "update"
                          ? "group-hover:border-forge-cyan/50"
                          : "group-hover:border-purple-400/50"
                      )}
                    >
                      {log.type === "update" ? (
                        <GitBranch
                          size={12}
                          className="text-gray-400 group-hover:text-forge-cyan transition-colors"
                        />
                      ) : (
                        <Activity
                          size={12}
                          className="text-gray-400 group-hover:text-purple-400 transition-colors"
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="text-white font-medium">
                          {log.date.toLocaleDateString()}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>
                          {log.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors flex items-start gap-3 cursor-pointer">
                        <div className="mt-0.5">
                          {log.type === "update" ? (
                            <Cpu size={16} className="text-forge-cyan" />
                          ) : (
                            <Zap size={16} className="text-yellow-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">
                            <span className="font-bold text-white">{log.projectTitle}</span>:{" "}
                            {log.content}
                          </div>
                          {log.type === "alert" && (
                            <div className="text-xs text-red-400 mt-1 flex items-center gap-1">
                              <Activity size={10} /> Critical system alert
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {/* Empty State if no logs */}
              {projects.every((p) => !p.logs || p.logs.length === 0) && (
                <div className="text-center py-8 text-gray-500 text-sm italic">
                  No recent system activity detected.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
