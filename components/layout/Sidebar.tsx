"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  LayoutDashboard,
  BrainCircuit,
  BookOpen,
  History,
  Lightbulb,
  Settings,
  Activity,
  Cpu,
  GitCommitHorizontal,
  Quote,
  Smile,
  Telescope,
  Target,
  Repeat,
  Clock,
  Zap,
  Flag,
  CalendarCheck,
  Moon,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/forge/dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Main" },
  { href: "/forge/chamber", label: "Forge Chamber", icon: BrainCircuit, group: "Main" },

  { href: "/forge/timeline", label: "Timeline", icon: GitCommitHorizontal, group: "Reflection" },
  { href: "/forge/journal", label: "Journal", icon: BookOpen, group: "Reflection" },
  { href: "/forge/memory", label: "Memory", icon: History, group: "Reflection" },
  { href: "/forge/mood", label: "Mood", icon: Smile, group: "Reflection" },
  { href: "/forge/quote", label: "Wisdom", icon: Quote, group: "Reflection" },

  { href: "/forge/goals", label: "Goals", icon: Target, group: "Evolution" },
  { href: "/forge/milestones", label: "Milestones", icon: Flag, group: "Evolution" },
  { href: "/forge/habits", label: "Habits", icon: Repeat, group: "Evolution" },
  { href: "/forge/routines", label: "Routines", icon: Clock, group: "Evolution" },
  { href: "/forge/energy", label: "Energy", icon: Zap, group: "Evolution" },

  { href: "/forge/insights", label: "Observatory", icon: Telescope, group: "System" },
  { href: "/forge/weekly-review", label: "Weekly Review", icon: CalendarCheck, group: "System" },
  { href: "/forge/monthly-review", label: "Monthly Review", icon: Moon, group: "System" },
  { href: "/forge/ideas", label: "Forge Lab", icon: Lightbulb, group: "Creativity" },
  { href: "/forge/settings", label: "System", icon: Settings, group: "System" },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={cn(
        "relative h-full z-50 flex flex-col",
        "border-r border-forge-border bg-forge-bg/60 backdrop-blur-2xl",
        "transition-[width] duration-500 ease-spring-out will-change-[width, transform]",
        isExpanded ? "w-72" : "w-20"
      )}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            "absolute top-0 left-0 w-full h-32 bg-linear-to-b from-forge-accent/10 to-transparent transition-opacity duration-500",
            isExpanded ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      {/* Header */}
      <div
        className={cn(
          "flex items-center p-6 mb-2 transition-all duration-500",
          isExpanded ? "justify-start gap-3" : "justify-center"
        )}
      >
        <div
          className="relative group shrink-0 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-forge-accent to-forge-cyan flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)] relative z-10 transition-transform duration-300 hover:scale-105">
            <Cpu className="text-white w-5 h-5" />
          </div>

          <div className="absolute inset-0 bg-white/50 blur-lg rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
        </div>

        <div
          className={cn(
            "flex flex-col overflow-hidden whitespace-nowrap transition-all duration-300 ease-spring-out origin-left",
            isExpanded ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-4 w-0"
          )}
        >
          <span className="font-display font-bold text-lg tracking-wide text-white leading-none">
            FORGE OS
          </span>
          <span className="text-[10px] font-mono text-forge-cyan mt-1">v2.5.0-beta</span>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 space-y-6 scrollbar-hide">
        {["Main", "Reflection", "Creativity", "Evolution", "System"].map((group) => (
          <div key={group} className="relative">
            {/* Group Label */}
            <h3
              className={cn(
                "px-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 transition-all duration-300",
                isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              )}
            >
              {group}
            </h3>

            <div className="space-y-1">
              {NAV_ITEMS.filter((item) => item.group === group).map((item, index) => {
                const isActive = pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <button
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className={cn(
                      "group relative w-full flex items-center p-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-white/10 text-white shadow-inner border border-white/5"
                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent",
                      isExpanded ? "justify-start gap-3" : "justify-center"
                    )}
                  >
                    {/* Active Pill */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-forge-cyan rounded-r-full shadow-[0_0_10px_#22D3EE] transition-all duration-300" />
                    )}

                    <Icon
                      size={20}
                      className={cn(
                        "transition-all duration-300 z-10 shrink-0",
                        isActive ? "text-forge-cyan" : "text-gray-400 group-hover:text-gray-200",
                        !isExpanded && isActive ? "scale-110" : ""
                      )}
                    />

                    {/* Label */}
                    <span
                      className={cn(
                        "whitespace-nowrap transition-all duration-300 ease-spring-out origin-left",
                        isExpanded ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-4 w-0"
                      )}
                      style={{ transitionDelay: isExpanded ? `${index * 35}ms` : "0ms" }}
                    >
                      {item.label}
                    </span>

                    {/* Active Dot */}
                    {isActive && isExpanded && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-forge-cyan shadow-[0_0_8px_#22D3EE] animate-pulse" />
                    )}

                    {/* Tooltip for collapsed */}
                    {!isExpanded && (
                      <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 border border-white/10 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none z-50 shadow-xl backdrop-blur-xl">
                        {item.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Status */}
      <div className="p-4 mt-auto border-t border-forge-border bg-black/20">
        <div
          className={cn(
            "flex items-center rounded-xl transition-all duration-300",
            isExpanded ? "p-2 gap-3 bg-white/5 border border-white/5" : "p-0 justify-center bg-transparent border-none"
          )}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-linear-to-r from-gray-700 to-gray-600 flex items-center justify-center border border-white/10 shadow-lg">
              <span className="text-xs font-bold">U</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-forge-bg rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>

          <div
            className={cn(
              "flex-1 min-w-0 overflow-hidden transition-all duration-300",
              isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
            )}
          >
            <div className="text-sm font-medium text-white truncate">User_01</div>
            <div className="text-xs text-forge-cyan flex items-center gap-1">
              <Activity size={10} /> Online
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
