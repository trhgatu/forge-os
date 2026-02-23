"use client";

import type {
  LucideIcon} from "lucide-react";
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
  Hammer,
  Film,
  ChevronDown,
  WindIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

import type { SoundType } from "@/contexts";
import { useLanguage, useSound } from "@/contexts";
import XPBar from "@/features/gamification/components/XPBar";
import { cn } from "@/shared/lib/utils";
import { View } from "@/shared/types/os";



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
  { id: View.THOUGHT_STREAM, labelKey: "nav.thought_stream", icon: WindIcon, group: "Main" },
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
  { id: View.FORGE_LAB, labelKey: "nav.forge_lab", icon: Hammer, group: "Creativity" },
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
      return "/forge/lab";
    case View.WIKI:
      return "/forge/knowledge";
    default:
      return `/forge/${view.toLowerCase().replace(/_/g, "-")}`;
  }
};

const SidebarGroup: React.FC<{
  group: string;
  isSidebarExpanded: boolean;
  items: NavItem[];
  pathname: string;
  playSound: (sound: SoundType) => void;
  t: (key: string) => string;
}> = ({ group, isSidebarExpanded, items, pathname, playSound, t }) => {
  // Default expanded if it contains active item OR is 'Main'/'Meta'
  const hasActiveItem = items.some((i) => pathname.startsWith(getPathForView(i.id)));
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (group === "Main" || group === "Meta") return false;
    return !hasActiveItem;
  });

  useEffect(() => {
    if (hasActiveItem) {
      setIsCollapsed(false);
    }
  }, [hasActiveItem]);

  const toggle = () => {
    playSound("click");
    setIsCollapsed(!isCollapsed);
  };

  // If sidebar is minimized, we generally want to show icons or just hide the grouping effect visually?
  // Actually, usually minimized sidebar just shows a flat list of icons.
  // Accordion interaction inside a 80px sidebar is weird.
  // Logic: If !isSidebarExpanded, show ALL items always (ignore collapse), but hide Header Text.

  // BUT user might want to collapse groups even in mini sidebar? No, that hides icons.
  // Let's assume when minimized, we show everything.

  const effectiveCollapsed = isSidebarExpanded ? isCollapsed : false;

  return (
    <div className="relative">
      {/* Group Label / Toggle */}
      <button
        onClick={toggle}
        disabled={!isSidebarExpanded}
        className={cn(
          "flex items-center w-full px-4 mb-2 transition-all duration-300 group/header outline-none",
          isSidebarExpanded
            ? "justify-between opacity-100 translate-x-0 cursor-pointer"
            : "justify-center opacity-0 -translate-x-2 pointer-events-none h-0 mb-0 overflow-hidden"
        )}
      >
        <span className="text-sm font-[family-name:var(--font-rajdhani)] font-bold text-gray-500 uppercase tracking-[0.15em] group-hover/header:text-forge-cyan transition-colors">
          {t(`group.${group.toLowerCase()}`)}
        </span>
        <div
          className={cn(
            "text-gray-600 group-hover/header:text-forge-cyan transition-transform duration-300",
            effectiveCollapsed ? "-rotate-90" : "rotate-0"
          )}
        >
          <ChevronDown size={12} />
        </div>
      </button>

      {/* Items Container */}
      <div
        className={cn(
          "space-y-1 overflow-hidden transition-all duration-500 ease-in-out",
          effectiveCollapsed ? "max-h-0 opacity-50" : "max-h-[500px] opacity-100"
        )}
      >
        {items.map((item, index) => {
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
                "nav-item-btn group relative w-full flex items-center p-3 rounded-xl text-[14px] font-[family-name:var(--font-rajdhani)] font-bold tracking-wide transition-all duration-200",
                isActive
                  ? `bg-white/10 text-white shadow-inner border border-white/5`
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent",
                isSidebarExpanded ? "justify-start gap-3" : "justify-center"
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
                  !isSidebarExpanded && isActive ? "scale-110" : ""
                )}
              />

              {/* Label */}
              <span
                className={cn(
                  "whitespace-nowrap transition-all duration-300 ease-spring-out origin-left",
                  isSidebarExpanded
                    ? "opacity-100 translate-x-0 w-auto delay-75"
                    : "opacity-0 -translate-x-4 w-0"
                )}
                style={{ transitionDelay: isSidebarExpanded ? `${index * 35}ms` : "0ms" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
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
          <span className="font-[family-name:var(--font-rajdhani)] font-bold text-xl tracking-wide text-white leading-none">
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
        {["Meta", "Main", "Reflection", "Creativity", "Evolution", "System"].map((group) => {
          return (
            <SidebarGroup
              key={group}
              group={group}
              isSidebarExpanded={isExpanded}
              items={NAV_ITEMS.filter((item) => item.group === group)}
              pathname={pathname}
              playSound={playSound}
              t={t}
            />
          );
        })}
      </nav>

      {/* XP Bar (Global Gamification) */}
      <div className="mt-auto border-t border-white/5 bg-black/20">
        <div
          className={cn(
            "py-4 transition-all duration-300",
            isExpanded ? "px-6" : "px-2 flex justify-center"
          )}
        >
          <XPBar compact={!isExpanded} />
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-white/5 bg-black/20 space-y-2">
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
              <span className="text-sm font-medium text-gray-400">{t("settings.language")}</span>
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
