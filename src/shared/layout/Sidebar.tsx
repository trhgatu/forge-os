"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { View } from "@/shared/types/os";
import { cn } from "@/shared/lib/utils";
import { useLanguage, useSound } from "@/contexts";
import {
  LayoutDashboard,
  BrainCircuit,
  BookOpen,
  History,
  Settings,
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
  Orbit,
  Trophy,
  Fingerprint,
  Map,
  Ghost,
  Navigation,
  Globe,
  Languages,
  Disc,
  Mic2,
  Aperture,
  Users,
  Radar,
  Inbox,
  Wind,
  Hammer,
  Film,
  LucideIcon,
} from "lucide-react";

interface NavItem {
  id: View;
  labelKey: string;
  icon: LucideIcon;
  group: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: View.PRESENCE, labelKey: "nav.presence", icon: Radar, group: "Meta" },
  { id: View.ECHOES, labelKey: "nav.echoes", icon: Inbox, group: "Meta" },
  { id: View.WIKI, labelKey: "nav.wiki", icon: Globe, group: "Meta" },
  { id: View.INSIGHTS, labelKey: "nav.insights", icon: Telescope, group: "Meta" },
  { id: View.DASHBOARD, labelKey: "nav.dashboard", icon: LayoutDashboard, group: "Main" },
  { id: View.FORGE_CHAMBER, labelKey: "nav.forge_chamber", icon: BrainCircuit, group: "Main" },
  { id: View.THOUGHT_STREAM, labelKey: "nav.thought_stream", icon: Wind, group: "Main" },
  { id: View.TIMELINE, labelKey: "nav.timeline", icon: GitCommitHorizontal, group: "Reflection" },
  { id: View.JOURNAL, labelKey: "nav.journal", icon: BookOpen, group: "Reflection" },
  { id: View.META_JOURNAL, labelKey: "nav.meta_journal", icon: Aperture, group: "Reflection" },
  { id: View.MEMORY, labelKey: "nav.memory", icon: History, group: "Reflection" },
  { id: View.SHADOW_WORK, labelKey: "nav.shadow_work", icon: Ghost, group: "Reflection" },
  { id: View.MOOD, labelKey: "nav.mood", icon: Smile, group: "Reflection" },
  { id: View.QUOTES, labelKey: "nav.quotes", icon: Quote, group: "Reflection" },
  { id: View.MANTRA, labelKey: "nav.mantra", icon: Mic2, group: "Reflection" },
  { id: View.SOUNDTRACK, labelKey: "nav.soundtrack", icon: Disc, group: "Reflection" },
  { id: View.EPIC_SCENE_VAULT, labelKey: "nav.epic_scene_vault", icon: Film, group: "Reflection" },
  { id: View.COMPASS, labelKey: "nav.compass", icon: Navigation, group: "Evolution" },
  { id: View.GOALS, labelKey: "nav.goals", icon: Target, group: "Evolution" },
  { id: View.IDENTITY, labelKey: "nav.identity", icon: Fingerprint, group: "Evolution" },
  { id: View.CONNECTION, labelKey: "nav.connection", icon: Users, group: "Evolution" },
  { id: View.THEMES, labelKey: "nav.themes", icon: Map, group: "Evolution" },
  { id: View.MILESTONES, labelKey: "nav.milestones", icon: Flag, group: "Evolution" },
  { id: View.ACHIEVEMENTS, labelKey: "nav.achievements", icon: Trophy, group: "Evolution" },
  { id: View.HABITS, labelKey: "nav.habits", icon: Repeat, group: "Evolution" },
  { id: View.ROUTINES, labelKey: "nav.routines", icon: Clock, group: "Evolution" },
  { id: View.ENERGY, labelKey: "nav.energy", icon: Zap, group: "Evolution" },
  { id: View.WEEKLY_REVIEW, labelKey: "nav.weekly_review", icon: CalendarCheck, group: "System" },
  { id: View.MONTHLY_REVIEW, labelKey: "nav.monthly_review", icon: Moon, group: "System" },
  { id: View.YEARLY_REVIEW, labelKey: "nav.yearly_review", icon: Orbit, group: "System" },
  { id: View.FORGE_LAB, labelKey: "nav.ideas", icon: Hammer, group: "Creativity" },
  { id: View.SETTINGS, labelKey: "nav.settings", icon: Settings, group: "System" },
];

const getPathForView = (view: View): string => {
  switch (view) {
    case View.DASHBOARD:
      return "/forge/dashboard";
    case View.JOURNAL:
      return "/forge/journal";
    case View.META_JOURNAL:
      return "/forge/meta-journal";
    case View.MEMORY:
      return "/forge/memory";
    case View.MOOD:
      return "/forge/mood";
    case View.QUOTES:
      return "/forge/quote";
    case View.INSIGHTS:
      return "/forge/insights";
    case View.TIMELINE:
      return "/forge/timeline";
    case View.MILESTONES:
      return "/forge/milestones";
    case View.YEARLY_REVIEW:
      return "/forge/yearly-review";
    case View.WEEKLY_REVIEW:
      return "/forge/weekly-review";
    case View.MONTHLY_REVIEW:
      return "/forge/monthly-review";
    case View.GOALS:
      return "/forge/goals";
    case View.HABITS:
      return "/forge/habits";
    case View.ROUTINES:
      return "/forge/routines";
    case View.COMPASS:
      return "/forge/compass";
    case View.SETTINGS:
      return "/forge/settings";
    case View.FORGE_CHAMBER:
      return "/forge/chamber";
    case View.SHADOW_WORK:
      return "/forge/shadow-work";
    case View.CONNECTION:
      return "/forge/connection";
    case View.PRESENCE:
      return "/forge/presence";
    case View.FORGE_LAB:
      return "/forge/ideas";
    case View.WIKI:
      return "/forge/knowledge";
    default:
      return `/forge/${view.toLowerCase().replace(/_/g, "-")}`;
  }
};

export const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { language, setLanguage, t } = useLanguage();
  const { playSound } = useSound();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleLanguage = () => {
    playSound("click");
    setLanguage(language === "en" ? "vi" : "en");
  };

  const handleToggleExpand = () => {
    playSound("click");
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={cn(
        "relative h-full z-50 flex flex-col",
        "border-r border-white/5 bg-black/40 backdrop-blur-2xl",
        "transition-[width] duration-500 ease-spring-out will-change-[width,transform]",
        isExpanded ? "w-72" : "w-20"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center p-6 mb-2 transition-all duration-500",
          isExpanded ? "justify-start gap-3" : "justify-center"
        )}
      >
        <button
          className="relative group shrink-0 cursor-pointer"
          onClick={handleToggleExpand}
          onMouseEnter={() => playSound("hover")}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] relative z-10 transition-all duration-300 hover:scale-105 border border-white/10 bg-black"
            )}
          >
            <Cpu className="w-5 h-5 text-forge-cyan" />
          </div>
        </button>

        <div
          className={cn(
            "flex flex-col overflow-hidden whitespace-nowrap transition-all duration-300 ease-spring-out origin-left",
            isExpanded ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-4 w-0"
          )}
        >
          <span className="font-display font-bold text-lg tracking-wide text-white leading-none">
            FORGE OS
          </span>
          <span className="text-[10px] font-mono mt-1 text-forge-cyan">v2.9.1-beta</span>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav
        ref={navContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 space-y-6 scrollbar-hide"
      >
        {["Meta", "Main", "Reflection", "Creativity", "Evolution", "System"].map((group) => (
          <div key={group} className="relative">
            {/* Group Label */}
            <h3
              className={cn(
                "px-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 transition-all duration-300",
                isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              )}
            >
              {t(`group.${group.toLowerCase()}`)}
            </h3>

            <div className="space-y-1">
              {NAV_ITEMS.filter((item) => item.group === group).map((item, index) => {
                const href = getPathForView(item.id);
                const isActive = pathname.startsWith(href);
                const Icon = item.icon;
                const label = t(item.labelKey);

                return (
                  <Link
                    key={item.id}
                    href={href}
                    onClick={() => playSound("click")}
                    onMouseEnter={() => playSound("hover")}
                    className={cn(
                      "nav-item-btn group relative w-full flex items-center p-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? `bg-white/10 text-white shadow-inner border border-white/5`
                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent",
                      isExpanded ? "justify-start gap-3" : "justify-center"
                    )}
                  >
                    {/* Active Indicator Pill */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-forge-cyan shadow-[0_0_10px_#22D3EE] transition-all duration-700" />
                    )}

                    {/* Icon */}
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
                        isExpanded
                          ? "opacity-100 translate-x-0 w-auto delay-75"
                          : "opacity-0 -translate-x-4 w-0"
                      )}
                      style={{ transitionDelay: isExpanded ? `${index * 35}ms` : "0ms" }}
                    >
                      {label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Controls */}
      <div className="p-4 mt-auto border-t border-white/5 bg-black/20 space-y-2">
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          onMouseEnter={() => playSound("hover")}
          className={cn(
            "w-full flex items-center rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-white/5 group",
            isExpanded ? "p-2 gap-3" : "p-2 justify-center"
          )}
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
            <Languages size={16} />
          </div>
          {isExpanded && (
            <div className="flex-1 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400">{t("settings.language")}</span>
              <div className="flex bg-black/40 rounded-md p-0.5 border border-white/10">
                <span
                  className={cn(
                    "px-2 py-0.5 text-[10px] rounded font-bold transition-all",
                    language === "en" ? "bg-white text-black" : "text-gray-500"
                  )}
                >
                  EN
                </span>
                <span
                  className={cn(
                    "px-2 py-0.5 text-[10px] rounded font-bold transition-all",
                    language === "vi" ? "bg-white text-black" : "text-gray-500"
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
};
