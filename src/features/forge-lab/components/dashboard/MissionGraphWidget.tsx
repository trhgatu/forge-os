import React from "react";
import { Activity } from "lucide-react";
import { GlassCard } from "../GlassCard";
import { ConnectGithubWidget } from "../ConnectGithubWidget";
import { ContributionStats } from "@/features/forge-lab/types";
import { cn } from "@/shared/lib/utils";
import { forgeApi } from "@/features/forge-lab/api";

interface MissionGraphWidgetProps {
    contributionStats: ContributionStats | null;
    loadingStats: boolean;
    onStatsUpdate: (stats: ContributionStats) => void;
    setLoading: (loading: boolean) => void;
}

export const MissionGraphWidget: React.FC<MissionGraphWidgetProps> = ({
    contributionStats,
    loadingStats,
    onStatsUpdate,
    setLoading,
}) => {
    return (
        <GlassCard className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-50">
                <Activity size={20} className="text-emerald-500/50" />
            </div>

            {!contributionStats && !loadingStats ? (
                <div className="flex flex-col items-center justify-center py-10">
                    <ConnectGithubWidget
                        onConnected={(username) => {
                            setLoading(true);
                            forgeApi
                                .getGithubStats(username)
                                .then(onStatsUpdate)
                                .catch((err) => console.error("Failed to load freshly connected stats", err))
                                .finally(() => setLoading(false));
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
                    </div>

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
    );
};
