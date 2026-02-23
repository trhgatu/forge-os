import { formatDistanceToNow } from "date-fns";
import {
  GitBranch,
  Activity,
  Rocket,
  RefreshCw,
  Trash2,
  AlertTriangle,
  FileEdit,
} from "lucide-react";
import React from "react";

import { cn } from "@/shared/lib/utils";


export interface Log {
  id?: string;
  date: Date | string;
  type: "create" | "update" | "sync" | "delete" | "alert" | "milestone" | "other";
  content: string;
  projectTitle?: string;
}

interface TimelineItemProps {
  log: Log;
  isLast?: boolean;
  compact?: boolean; // For dashboard widget
}

const getLogConfig = (type: string) => {
  switch (type) {
    case "create":
      return {
        icon: Rocket,
        color: "text-emerald-400",
        bgColor: "bg-emerald-400/10",
        borderColor: "border-emerald-400/30",
        dotColor: "bg-emerald-400",
        shadow: "shadow-emerald-900/50",
      };
    case "update":
      return {
        icon: FileEdit,
        color: "text-forge-cyan",
        bgColor: "bg-forge-cyan/10",
        borderColor: "border-forge-cyan/30",
        dotColor: "bg-forge-cyan",
        shadow: "shadow-cyan-900/50",
      };
    case "sync":
      return {
        icon: RefreshCw,
        color: "text-purple-400",
        bgColor: "bg-purple-400/10",
        borderColor: "border-purple-400/30",
        dotColor: "bg-purple-400",
        shadow: "shadow-purple-900/50",
      };
    case "delete":
      return {
        icon: Trash2,
        color: "text-red-400",
        bgColor: "bg-red-400/10",
        borderColor: "border-red-400/30",
        dotColor: "bg-red-400",
        shadow: "shadow-red-900/50",
      };
    case "alert":
      return {
        icon: AlertTriangle,
        color: "text-orange-400",
        bgColor: "bg-orange-400/10",
        borderColor: "border-orange-400/30",
        dotColor: "bg-orange-400",
        shadow: "shadow-orange-900/50",
      };
    case "milestone":
      return {
        icon: GitBranch, // Or Flag
        color: "text-yellow-400",
        bgColor: "bg-yellow-400/10",
        borderColor: "border-yellow-400/30",
        dotColor: "bg-yellow-400",
        shadow: "shadow-yellow-900/50",
      };
    default:
      return {
        icon: Activity,
        color: "text-gray-400",
        bgColor: "bg-gray-400/10",
        borderColor: "border-gray-400/30",
        dotColor: "bg-gray-400",
        shadow: "shadow-gray-900/50",
      };
  }
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ log, isLast }) => {
  const config = getLogConfig(log.type);
  const Icon = config.icon;
  const dateObj = new Date(log.date);

  // Fallback for invalid dates
  const isValidDate = !isNaN(dateObj.getTime());
  const timeString = isValidDate
    ? formatDistanceToNow(dateObj, { addSuffix: true })
    : "Unknown time";

  return (
    <div className={cn("relative pl-8 group", isLast ? "" : "pb-8")}>
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-white/5 group-hover:bg-white/10 transition-colors" />
      )}

      {/* Dot / Icon Container */}
      <div
        className={cn(
          "absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300 z-10 bg-[#0c0c0e]",
          config.borderColor,
          config.shadow ? `shadow-lg ${config.shadow}` : ""
        )}
      >
        <div
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125",
            config.dotColor
          )}
        />
        {/* Glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity blur-sm",
            config.dotColor
          )}
        />
      </div>

      <div className="flex flex-col gap-1 -mt-1.5 animate-in fade-in slide-in-from-left-4 duration-500">
        {/* Header: Date & Project */}
        <div className="flex items-center gap-2 text-xs">
          <span className={cn("font-bold uppercase tracking-wider", config.color)}>{log.type}</span>
          <span className="w-1 h-1 rounded-full bg-gray-700" />
          <span
            className="text-gray-500 font-mono"
            title={isValidDate ? dateObj.toLocaleString() : ""}
          >
            {timeString}
          </span>
        </div>

        {/* Content Card */}
        <div
          className={cn(
            "mt-1 p-3 rounded-xl border transition-all duration-300 cursor-default",
            "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10 group-hover:translate-x-1"
          )}
        >
          <div className="flex items-start gap-3">
            <div className={cn("mt-0.5 p-1.5 rounded-lg", config.bgColor)}>
              <Icon size={14} className={config.color} />
            </div>
            <div>
              {log.projectTitle && (
                <div className="text-xs font-bold text-gray-300 mb-0.5">{log.projectTitle}</div>
              )}
              <p className="text-sm text-gray-300 leading-relaxed font-light">
                {/* Add keyword highlighting logic if needed here */}
                {log.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
