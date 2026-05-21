'use client';

import type { LucideIcon } from 'lucide-react';
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
  Sun,
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
} from 'lucide-react';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

import type { SoundType } from '@/contexts';
import { useLanguage, useSound, useTheme } from '@/contexts';
import XPBar from '@/features/gamification/components/XPBar';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/shared/store';
import { View } from '@/shared/types/os';

interface NavItem {
  id: View;
  labelKey: string;
  icon: LucideIcon;
  group: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: View.PRESENCE, labelKey: 'nav.presence', icon: Radar, group: 'Meta' },
  { id: View.ECHOES, labelKey: 'nav.echoes', icon: Inbox, group: 'Meta' },
  { id: View.WIKI, labelKey: 'nav.wiki', icon: Globe, group: 'Meta' },
  { id: View.INSIGHTS, labelKey: 'nav.insights', icon: Telescope, group: 'Meta' },
  { id: View.DASHBOARD, labelKey: 'nav.dashboard', icon: LayoutDashboard, group: 'Main' },
  { id: View.FORGE_CHAMBER, labelKey: 'nav.forge_chamber', icon: BrainCircuit, group: 'Main' },
  { id: View.THOUGHT_STREAM, labelKey: 'nav.thought_stream', icon: WindIcon, group: 'Main' },
  { id: View.TIMELINE, labelKey: 'nav.timeline', icon: GitCommitHorizontal, group: 'Reflection' },
  { id: View.JOURNAL, labelKey: 'nav.journal', icon: BookOpen, group: 'Reflection' },
  { id: View.META_JOURNAL, labelKey: 'nav.meta_journal', icon: Aperture, group: 'Reflection' },
  { id: View.MEMORY, labelKey: 'nav.memory', icon: History, group: 'Reflection' },
  { id: View.SHADOW_WORK, labelKey: 'nav.shadow_work', icon: Ghost, group: 'Reflection' },
  { id: View.MOOD, labelKey: 'nav.mood', icon: Smile, group: 'Reflection' },
  { id: View.QUOTES, labelKey: 'nav.quotes', icon: Quote, group: 'Reflection' },
  { id: View.MANTRA, labelKey: 'nav.mantra', icon: Mic2, group: 'Reflection' },
  { id: View.SOUNDTRACK, labelKey: 'nav.soundtrack', icon: Disc, group: 'Reflection' },
  { id: View.EPIC_SCENE_VAULT, labelKey: 'nav.epic_scene_vault', icon: Film, group: 'Reflection' },
  { id: View.COMPASS, labelKey: 'nav.compass', icon: Navigation, group: 'Evolution' },
  { id: View.GOALS, labelKey: 'nav.goals', icon: Target, group: 'Evolution' },
  { id: View.IDENTITY, labelKey: 'nav.identity', icon: Fingerprint, group: 'Evolution' },
  { id: View.CONNECTION, labelKey: 'nav.connection', icon: Users, group: 'Evolution' },
  { id: View.THEMES, labelKey: 'nav.themes', icon: Map, group: 'Evolution' },
  { id: View.MILESTONES, labelKey: 'nav.milestones', icon: Flag, group: 'Evolution' },
  { id: View.ACHIEVEMENTS, labelKey: 'nav.achievements', icon: Trophy, group: 'Evolution' },
  { id: View.HABITS, labelKey: 'nav.habits', icon: Repeat, group: 'Evolution' },
  { id: View.ROUTINES, labelKey: 'nav.routines', icon: Clock, group: 'Evolution' },
  { id: View.ENERGY, labelKey: 'nav.energy', icon: Zap, group: 'Evolution' },
  { id: View.WEEKLY_REVIEW, labelKey: 'nav.weekly_review', icon: CalendarCheck, group: 'System' },
  { id: View.MONTHLY_REVIEW, labelKey: 'nav.monthly_review', icon: Moon, group: 'System' },
  { id: View.YEARLY_REVIEW, labelKey: 'nav.yearly_review', icon: Orbit, group: 'System' },
  { id: View.FORGE_LAB, labelKey: 'nav.forge_lab', icon: Hammer, group: 'Creativity' },
  { id: View.SETTINGS, labelKey: 'nav.settings', icon: Settings, group: 'System' },
];

const getPathForView = (view: View): string => {
  switch (view) {
    case View.DASHBOARD:
      return '/forge/dashboard';
    case View.JOURNAL:
      return '/forge/journal';
    case View.META_JOURNAL:
      return '/forge/meta-journal';
    case View.MEMORY:
      return '/forge/memory';
    case View.MOOD:
      return '/forge/mood';
    case View.QUOTES:
      return '/forge/quote';
    case View.INSIGHTS:
      return '/forge/insights';
    case View.TIMELINE:
      return '/forge/timeline';
    case View.MILESTONES:
      return '/forge/milestones';
    case View.YEARLY_REVIEW:
      return '/forge/yearly-review';
    case View.WEEKLY_REVIEW:
      return '/forge/weekly-review';
    case View.MONTHLY_REVIEW:
      return '/forge/monthly-review';
    case View.GOALS:
      return '/forge/goals';
    case View.HABITS:
      return '/forge/habits';
    case View.ROUTINES:
      return '/forge/routines';
    case View.COMPASS:
      return '/forge/compass';
    case View.SETTINGS:
      return '/forge/settings';
    case View.FORGE_CHAMBER:
      return '/forge/chamber';
    case View.SHADOW_WORK:
      return '/forge/shadow-work';
    case View.CONNECTION:
      return '/forge/connection';
    case View.PRESENCE:
      return '/forge/presence';
    case View.FORGE_LAB:
      return '/forge/lab';
    case View.WIKI:
      return '/forge/knowledge';
    default:
      return `/forge/${view.toLowerCase().replace(/_/g, '-')}`;
  }
};

const GROUP_KANJI: Record<string, string> = {
  Meta: '界',
  Main: '殿',
  Reflection: '記',
  Creativity: '造',
  Evolution: '術',
  System: '制',
};

const SidebarGroup: React.FC<{
  group: string;
  isSidebarExpanded: boolean;
  items: NavItem[];
  pathname: string;
  playSound: (sound: SoundType) => void;
  t: (key: string) => string;
}> = ({ group, isSidebarExpanded, items, pathname, playSound, t }) => {
  const hasActiveItem = items.some((i) => pathname.startsWith(getPathForView(i.id)));
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (group === 'Main' || group === 'Meta') return false;
    return !hasActiveItem;
  });

  useEffect(() => {
    if (hasActiveItem) {
      setIsCollapsed(false);
    }
  }, [hasActiveItem]);

  const toggle = () => {
    playSound('click');
    setIsCollapsed(!isCollapsed);
  };

  const effectiveCollapsed = isSidebarExpanded ? isCollapsed : false;

  return (
    <div className="relative">
      <button
        onClick={toggle}
        disabled={!isSidebarExpanded}
        className={cn(
          'flex items-center w-full px-4 mb-2 transition-all duration-300 group/header outline-none',
          isSidebarExpanded
            ? 'justify-between opacity-100 translate-x-0 cursor-pointer'
            : 'justify-center opacity-0 -translate-x-2 pointer-events-none h-0 mb-0 overflow-hidden',
        )}
      >
        <div className="flex items-center gap-2">
          <span className="font-serif text-red-700/60 font-black text-sm tracking-wider">{GROUP_KANJI[group]}</span>
          <span className="text-[10px] font-serif font-black text-gray-500 uppercase tracking-[0.2em] group-hover/header:text-red-700/80 transition-colors">
            {t(`group.${group.toLowerCase()}`)}
          </span>
        </div>
        <div
          className={cn(
            'text-gray-600 group-hover/header:text-red-700/80 transition-transform duration-300',
            effectiveCollapsed ? '-rotate-90' : 'rotate-0',
          )}
        >
          <ChevronDown size={12} />
        </div>
      </button>
      <div
        className={cn(
          'space-y-1 overflow-hidden transition-all duration-500 ease-in-out',
          effectiveCollapsed ? 'max-h-0 opacity-50' : 'max-h-[500px] opacity-100',
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
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              className={cn(
                'nav-item-btn group relative w-full flex items-center p-3 rounded-lg text-[13px] font-serif tracking-widest transition-all duration-300',
                isActive
                  ? `bg-white/[0.03] text-white border-y border-white/5 border-l border-l-red-800/40 border-r-transparent`
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.015] border border-transparent',
                isSidebarExpanded ? 'justify-start gap-3' : 'justify-center',
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-red-700 shadow-[0_0_10px_rgba(185,28,28,0.5)] transition-all duration-500" style={{ filter: "url(#line-torn-filter)" }} />
              )}
              <Icon
                size={18}
                className={cn(
                  'transition-all duration-300 z-10 shrink-0',
                  isActive ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-200',
                  !isSidebarExpanded && isActive ? 'scale-110' : '',
                )}
              />

              <span
                className={cn(
                  'whitespace-nowrap transition-all duration-300 ease-spring-out origin-left font-serif',
                  isSidebarExpanded
                    ? 'opacity-100 translate-x-0 w-auto delay-75'
                    : 'opacity-0 -translate-x-4 w-0',
                )}
                style={{ transitionDelay: isSidebarExpanded ? `${index * 35}ms` : '0ms' }}
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
  const { user: authUser, logout } = useAuthStore();
  const { language, setLanguage, t } = useLanguage();
  const { playSound } = useSound();
  const { theme, toggleTheme } = useTheme();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleLanguage = () => {
    playSound('click');
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  const handleToggleExpand = () => {
    playSound('click');
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={cn(
        'relative h-full z-50 flex flex-col',
        'border-r dark:border-white/5 border-black/5 dark:bg-[#080808]/95 bg-[#f7f5f0]/95 backdrop-blur-3xl font-serif select-none transition-all duration-300',
        isExpanded ? 'w-72' : 'w-20',
      )}
    >
      <div className="absolute right-0 top-0 bottom-0 w-[1px] dark:bg-white/10 bg-black/5 z-50 pointer-events-none" style={{ filter: "url(#line-torn-filter)" }} />
      <div
        className={cn(
          'flex items-center p-6 mb-2 transition-all duration-500',
          isExpanded ? 'justify-start gap-3' : 'justify-center',
        )}
      >
        <button
          className="relative group shrink-0 cursor-pointer"
          onClick={handleToggleExpand}
          onMouseEnter={() => playSound('hover')}
        >
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 hover:scale-105 border border-red-800/40 dark:bg-red-950/20 bg-red-50 text-[#8b0000] font-serif text-xl font-bold shadow-[0_0_15px_rgba(139,0,0,0.15)]',
            )}
            style={{ filter: "url(#line-torn-filter)" }}
          >
            煉
          </div>
        </button>

        <div
          className={cn(
            'flex flex-col overflow-hidden whitespace-nowrap transition-all duration-300 ease-spring-out origin-left',
            isExpanded ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-4 w-0',
          )}
        >
          <span className="font-serif font-black text-xl tracking-[0.2em] dark:text-white text-[#1c1c1a] leading-none">FORGE OS</span>
          <span className="text-[10px] font-mono mt-1 text-red-600/70 font-semibold uppercase tracking-widest">v2.9.1-beta</span>
        </div>
      </div>

      <nav
        ref={navContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 space-y-6 scrollbar-hide"
      >
        {['Meta', 'Main', 'Reflection', 'Creativity', 'Evolution', 'System'].map((group) => {
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

      <div className="mt-auto border-t dark:border-white/5 border-black/5 dark:bg-black/20 bg-black/[0.01]">
        <div
          className={cn(
            'py-4 transition-all duration-300',
            isExpanded ? 'px-6' : 'px-2 flex justify-center',
          )}
        >
          <XPBar compact={!isExpanded} />
        </div>

        {/* User Profile Section */}
        <div className={cn(
          "p-4 border-t dark:border-white/5 border-black/5 dark:bg-white/[0.02] bg-black/[0.01] flex items-center gap-3 transition-all",
          !isExpanded && "justify-center"
        )}>
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full dark:bg-zinc-900 bg-zinc-100 dark:border-white/10 border-black/10 flex items-center justify-center dark:text-red-600 text-red-700 font-serif font-black shadow-lg dark:shadow-black" style={{ filter: "url(#line-torn-filter)" }}>
              {authUser?.name?.[0]?.toUpperCase() || <Users size={18} />}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-red-700 shadow-[0_0_8px_rgba(185,28,28,0.7)] border-2 dark:border-black border-white rounded-full" />
          </div>

          {isExpanded && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold dark:text-white text-[#1c1c1a] truncate">{authUser?.name || 'Traveller'}</p>
              <p className="text-[10px] dark:text-gray-500 text-gray-500 font-mono truncate">{authUser?.email}</p>
            </div>
          )}

          {isExpanded && (
            <button
              onClick={() => {
                playSound('click');
                logout();
              }}
              className="p-2 rounded-lg dark:text-gray-500 text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="p-4 border-t dark:border-white/5 border-black/5 dark:bg-black/20 bg-black/[0.01] space-y-2">
        {/* Language switch */}
        <button
          onClick={toggleLanguage}
          onMouseEnter={() => playSound('hover')}
          className={cn(
            'w-full flex items-center rounded-lg hover:bg-white/5 dark:hover:bg-white/5 transition-all border border-transparent hover:border-black/5 dark:hover:border-white/5 group',
            isExpanded ? 'p-2 gap-3' : 'p-2 justify-center',
          )}
        >
          <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-red-700 dark:group-hover:text-white transition-colors">
            <Languages size={16} />
          </div>
          {isExpanded && (
            <div className="flex-1 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('settings.language')}</span>
              <div className="flex bg-black/[0.04] dark:bg-black/40 rounded-md p-0.5 border dark:border-white/10 border-black/10">
                <span
                  className={cn(
                    'px-2 py-0.5 text-[10px] rounded font-bold transition-all',
                    language === 'en' ? 'bg-[#1c1c1a] text-white dark:bg-white dark:text-black' : 'text-gray-500',
                  )}
                >
                  EN
                </span>
                <span
                  className={cn(
                    'px-2 py-0.5 text-[10px] rounded font-bold transition-all',
                    language === 'vi' ? 'bg-[#1c1c1a] text-white dark:bg-white dark:text-black' : 'text-gray-500',
                  )}
                >
                  VI
                </span>
              </div>
            </div>
          )}
        </button>

        {/* Theme toggle */}
        <button
          onClick={() => {
            playSound('click');
            toggleTheme();
          }}
          onMouseEnter={() => playSound('hover')}
          className={cn(
            'w-full flex items-center rounded-lg hover:bg-white/5 dark:hover:bg-white/5 transition-all border border-transparent hover:border-black/5 dark:hover:border-white/5 group',
            isExpanded ? 'p-2 gap-3' : 'p-2 justify-center',
          )}
        >
          <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-red-700 dark:group-hover:text-white transition-colors">
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          </div>
          {isExpanded && (
            <div className="flex-1 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Theme</span>
              <div className="flex bg-black/[0.04] dark:bg-black/40 rounded-md p-0.5 border dark:border-white/10 border-black/10">
                <span
                  className={cn(
                    'px-2 py-0.5 text-[10px] rounded font-bold transition-all',
                    theme === 'light' ? 'bg-[#1c1c1a] text-white dark:bg-white dark:text-black' : 'text-gray-500',
                  )}
                >
                  LIGHT
                </span>
                <span
                  className={cn(
                    'px-2 py-0.5 text-[10px] rounded font-bold transition-all',
                    theme === 'dark' ? 'bg-[#1c1c1a] text-white dark:bg-white dark:text-black' : 'text-gray-500',
                  )}
                >
                  DARK
                </span>
              </div>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};



