import React from "react";
import { Activity, GitBranch, Cpu, Zap } from "lucide-react";
import { Project } from "@/features/forge-lab/types";
import { cn } from "@/shared/lib/utils";

interface SystemLogsWidgetProps {
  projects: Project[];
}

export const SystemLogsWidget: React.FC<SystemLogsWidgetProps> = ({ projects }) => {
  // Aggregate and sort logs
  const aggregatedLogs = projects
    .flatMap((p) => p.logs?.map((log) => ({ ...log, projectTitle: p.title })) || [])
    .filter((log) => log.content) // Only filter empty content
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      // Handle invalid dates by pushing them to the end (or treating as 0)
      const validA = !isNaN(dateA) ? dateA : 0;
      const validB = !isNaN(dateB) ? dateB : 0;
      return validB - validA;
    })
    .slice(0, 50); // Increased limit to see more logs if available

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">System Logs</h3>
      </div>

      <div className="relative pl-6 space-y-8 before:absolute before:top-3 before:left-[11px] before:w-[2px] before:h-full before:bg-linear-to-b before:from-white/10 before:to-transparent">
        {aggregatedLogs.map((log, index) => (
          <div
            key={`${log.projectTitle}-${new Date(log.date).getTime()}-${index}`}
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
                  {!isNaN(new Date(log.date).getTime())
                    ? new Date(log.date).toLocaleDateString()
                    : "Unknown Date"}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span>
                  {!isNaN(new Date(log.date).getTime())
                    ? new Date(log.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "--:--"}
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
                    <span className="font-bold text-white">{log.projectTitle}</span>: {log.content}
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

        {aggregatedLogs.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm italic">
            No recent system activity detected.
          </div>
        )}
      </div>
    </div>
  );
};
