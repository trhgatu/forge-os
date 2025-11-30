"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

import { useLanguage, useSound } from "@/contexts";

import {
  LayoutDashboard,
  BrainCircuit,
  BookOpen,
  History,
  Lightbulb,
  Settings,
  GitCommitHorizontal,
  Quote,
  Smile,
  Target,
  Repeat,
  Clock,
  Zap,
  Flag,
  CalendarCheck,
  Moon,
  Orbit,
  Telescope,
  Navigation,
  Fingerprint,
  Users,
  Map,
  Mic2,
  Disc,
  Ghost,
  Cpu,
  Languages,
  Radar,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/forge/presence", labelKey: "nav.presence", icon: Radar, group: "Meta" },

  { href: "/forge/dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard, group: "Main" },
  { href: "/forge/chamber", labelKey: "nav.forge_chamber", icon: BrainCircuit, group: "Main" },

  {
    href: "/forge/timeline",
    labelKey: "nav.timeline",
    icon: GitCommitHorizontal,
    group: "Reflection",
  },
  { href: "/forge/journal", labelKey: "nav.journal", icon: BookOpen, group: "Reflection" },
  {
    href: "/forge/meta-journal",
    labelKey: "nav.meta_journal",
    icon: Lightbulb,
    group: "Reflection",
  },
  { href: "/forge/memory", labelKey: "nav.memory", icon: History, group: "Reflection" },
  { href: "/forge/shadow-work", labelKey: "nav.shadow_work", icon: Ghost, group: "Reflection" },
  { href: "/forge/mood", labelKey: "nav.mood", icon: Smile, group: "Reflection" },
  { href: "/forge/quote", labelKey: "nav.quotes", icon: Quote, group: "Reflection" },
  { href: "/forge/mantra", labelKey: "nav.mantra", icon: Mic2, group: "Reflection" },
  { href: "/forge/soundtrack", labelKey: "nav.soundtrack", icon: Disc, group: "Reflection" },

  { href: "/forge/compass", labelKey: "nav.compass", icon: Navigation, group: "Evolution" },
  { href: "/forge/goals", labelKey: "nav.goals", icon: Target, group: "Evolution" },
  { href: "/forge/identity", labelKey: "nav.identity", icon: Fingerprint, group: "Evolution" },
  { href: "/forge/connection", labelKey: "nav.connection", icon: Users, group: "Evolution" },
  { href: "/forge/themes", labelKey: "nav.themes", icon: Map, group: "Evolution" },
  { href: "/forge/milestones", labelKey: "nav.milestones", icon: Flag, group: "Evolution" },
  { href: "/forge/routines", labelKey: "nav.routines", icon: Clock, group: "Evolution" },
  { href: "/forge/habits", labelKey: "nav.habits", icon: Repeat, group: "Evolution" },
  { href: "/forge/energy", labelKey: "nav.energy", icon: Zap, group: "Evolution" },

  { href: "/forge/insights", labelKey: "nav.insights", icon: Telescope, group: "System" },
  {
    href: "/forge/weekly-review",
    labelKey: "nav.weekly_review",
    icon: CalendarCheck,
    group: "System",
  },
  { href: "/forge/monthly-review", labelKey: "nav.monthly_review", icon: Moon, group: "System" },
  { href: "/forge/yearly-review", labelKey: "nav.yearly_review", icon: Orbit, group: "System" },

  { href: "/forge/ideas", labelKey: "nav.ideas", icon: Lightbulb, group: "Creativity" },

  { href: "/forge/settings", labelKey: "nav.settings", icon: Settings, group: "System" },
];

const GROUPS = ["Meta", "Main", "Reflection", "Creativity", "Evolution", "System"];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isExpanded, setIsExpanded] = useState(true);

  const { t, language, setLanguage } = useLanguage();
  const { playSound } = useSound();

  return (
    <aside
      className={cn(
        "relative h-full z-50 flex flex-col",
        "border-r border-white/5 bg-black/40 backdrop-blur-2xl",
        "transition-[width] duration-500 ease-spring-out",
        isExpanded ? "w-64" : "w-20"
      )}
    >
      <div
        className={cn(
          "flex items-center p-6 mb-2 transition-all duration-500",
          isExpanded ? "justify-start gap-3" : "justify-center"
        )}
      >
        <div
          className="relative group shrink-0 cursor-pointer"
          onClick={() => {
            setIsExpanded(!isExpanded);
            playSound("click");
          }}
          onMouseEnter={() => playSound("hover")}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-black shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105">
            <Cpu className="w-5 h-5 text-forge-cyan" />
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col overflow-hidden whitespace-nowrap transition-all duration-300 origin-left",
            isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0"
          )}
        >
          <span className="font-display font-bold text-lg text-white">FORGE OS</span>
          <span className="text-[10px] font-mono text-forge-cyan mt-1">v2.5.0-beta</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 space-y-6 scrollbar-hide">
        {GROUPS.map((group) => (
          <div key={group}>
            <h3
              className={cn(
                "px-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 transition-all",
                isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              )}
            >
              {t(`group.${group.toLowerCase()}`)}
            </h3>

            <div className="space-y-1">
              {NAV_ITEMS.filter((i) => i.group === group).map((item, index) => {
                const isActive = pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <button
                    key={item.href}
                    onMouseEnter={() => playSound("hover")}
                    onClick={() => {
                      playSound("click");
                      router.push(item.href);
                    }}
                    className={cn(
                      "group relative w-full flex items-center p-3 rounded-xl text-sm transition-all",
                      isActive
                        ? "bg-white/10 text-white shadow-inner border border-white/5"
                        : "text-gray-400 hover:text-white hover:bg-white/5",
                      isExpanded ? "justify-start gap-3" : "justify-center"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-forge-cyan rounded-r-full shadow-[0_0_10px_#22D3EE]" />
                    )}

                    <Icon
                      size={20}
                      className={cn(
                        "transition-all duration-300 z-10 shrink-0",
                        isActive ? "text-forge-cyan" : "text-gray-400 group-hover:text-gray-200",
                        !isExpanded && isActive ? "scale-110" : ""
                      )}
                    />

                    <span
                      className={cn(
                        "whitespace-nowrap transition-all origin-left",
                        isExpanded
                          ? "opacity-100 translate-x-0 w-auto"
                          : "opacity-0 -translate-x-4 w-0"
                      )}
                      style={{ transitionDelay: isExpanded ? `${index * 35}ms` : "0ms" }}
                    >
                      {t(item.labelKey)}
                    </span>

                    {!isExpanded && (
                      <div className="absolute left-full ml-4 px-3 py-1.5 bg-black/90 border border-white/10 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 backdrop-blur-xl">
                        {t(item.labelKey)}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-white/5 bg-black/20">
        <button
          onMouseEnter={() => playSound("hover")}
          onClick={() => {
            playSound("click");
            setLanguage(language === "en" ? "vi" : "en");
          }}
          className={cn(
            "w-full flex items-center rounded-lg hover:bg-white/5 transition-all border border-white/10",
            isExpanded ? "p-2 gap-3" : "p-2 justify-center"
          )}
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
            <Languages size={16} />
          </div>

          {isExpanded && (
            <div className="flex-1 flex items-center justify-between">
              <span className="text-xs text-gray-400">Language</span>
              <div className="flex bg-black/40 rounded-md p-0.5 border border-white/10">
                <span
                  className={cn(
                    "px-2 py-0.5 text-[10px] font-bold",
                    language === "en" && "bg-white text-black"
                  )}
                >
                  EN
                </span>
                <span
                  className={cn(
                    "px-2 py-0.5 text-[10px] font-bold",
                    language === "vi" && "bg-white text-black"
                  )}
                >
                  VI
                </span>
              </div>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
