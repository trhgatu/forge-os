"use client";

import React, { useState, useEffect } from "react";
/* import { getDailyInsight } from "@/services/geminiService"; */
import { InsightData } from "@/shared/types";
import { cn } from "@/shared/lib/utils";

import {
  Clock,
  Calendar,
  ArrowUpRight,
  Target,
  Sparkles,
  BrainCircuit,
  TrendingUp,
  Quote,
  Activity,
  ChevronRight,
  Maximize2,
  CheckCircle2,
} from "lucide-react";

import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

import { AGENTS } from "@/features/chamber/components/AgentDock";

const MOOD_DATA = [
  { day: "Mon", value: 6, mood: "Neutral" },
  { day: "Tue", value: 4, mood: "Tired" },
  { day: "Wed", value: 7, mood: "Calm" },
  { day: "Thu", value: 8, mood: "Focused" },
  { day: "Fri", value: 5, mood: "Anxious" },
  { day: "Sat", value: 9, mood: "Inspired" },
  { day: "Sun", value: 8, mood: "Inspired" },
];

const RECENT_ARTIFACTS = [
  {
    id: 1,
    title: "The Architecture of Silence",
    type: "Journal",
    date: "2h ago",
    color: "bg-fuchsia-500",
  },
  {
    id: 2,
    title: "Project Nebula Specs",
    type: "Memory",
    date: "5h ago",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Stoic Reflections",
    type: "Quote",
    date: "Yesterday",
    color: "bg-amber-500",
  },
];

const TIMELINE_SNAPSHOT = [
  { id: 1, time: "10:00 AM", label: "Deep Focus Session", type: "event" },
  { id: 2, time: "2:30 PM", label: "Logged Mood: Anxious", type: "mood" },
  { id: 3, time: "4:45 PM", label: "Captured Memory", type: "memory" },
];

// -------------------- WIDGET SHELL --------------------

interface WidgetProps {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  delay?: number;
  noPadding?: boolean;
}

const WidgetShell: React.FC<WidgetProps> = ({
  children,
  className,
  title,
  delay = 0,
  noPadding = false,
}) => (
  <div
    className={cn(
      "relative group flex flex-col",
      "bg-white/2 backdrop-blur-xl border border-white/5 rounded-[20px]",
      "hover:bg-white/4 hover:border-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-forge-accent/5",
      "transition-all duration-500 ease-spring-out",
      "overflow-hidden",
      "animate-in slide-in-from-bottom-4 fill-mode-backwards",
      className
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    {title && (
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
          {title}
        </div>
        <button className="text-gray-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
          <Maximize2 size={12} />
        </button>
      </div>
    )}

    <div className={cn("flex-1", noPadding ? "" : "p-5 pt-2")}>{children}</div>
  </div>
);

// -------------------- MAIN DASHBOARD --------------------

const MOCK_INSIGHTS: InsightData[] = [
  {
    quote: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    theme: "Innovation",
  },
  {
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    theme: "Design",
  },
  {
    quote: "Code is poetry.",
    author: "Automattic",
    theme: "Coding",
  },
  {
    quote: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    theme: "Execution",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    theme: "Passion",
  },
];

export const Dashboard: React.FC = () => {
  const [time, setTime] = useState(new Date());
  // Initialize with random quote directly to avoid effect/cascading render
  const [insight] = useState<InsightData | null>(
    () => MOCK_INSIGHTS[Math.floor(Math.random() * MOCK_INSIGHTS.length)]
  );
  const [focusScore] = useState(85);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Removed insight useEffect as state is now lazy-initialized

  const timeString = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateString = time.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const hour = time.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="h-full flex bg-forge-bg overflow-hidden">
      {/* MAIN CONTENT */}
      <div className="flex-1 h-full overflow-y-auto overflow-x-hidden scrollbar-hide p-8 pb-24">
        {/* Greeting */}
        <header className="mb-10 relative">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-forge-accent/10 rounded-full blur-[80px] pointer-events-none" />

          <h1 className="text-5xl font-display font-bold text-white mb-2 tracking-tight animate-in slide-in-from-bottom-2 duration-700">
            {greeting},{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-forge-cyan to-forge-accent">
              Traveler.
            </span>
          </h1>

          <div className="flex items-center gap-4 text-gray-400 animate-in slide-in-from-bottom-3 duration-700 delay-100">
            <span className="flex items-center gap-2 font-light">
              <Calendar size={14} /> {dateString}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="text-forge-cyan font-mono text-xs">Systems Nominal</span>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-min">
          {/* TIME WIDGET */}
          <WidgetShell
            className="col-span-1 md:col-span-2 row-span-1 min-h-[220px] relative overflow-hidden"
            delay={0}
          >
            {/* clock rings */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-64 h-64 border border-white/5 rounded-full opacity-20 animate-[spin_60s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-48 h-48 border border-white/5 rounded-full opacity-30 animate-[spin_40s_linear_infinite_reverse]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-forge-cyan rounded-full shadow-[0_0_10px_#22D3EE]" />
            </div>

            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
                  <Clock className="text-forge-cyan" size={20} />
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-500 font-mono uppercase">Focus Score</div>
                  <div className="text-xl font-bold text-white">{focusScore}%</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-7xl font-display font-bold tracking-tighter text-white leading-none">
                  {timeString}
                </div>
                <p className="text-gray-400 mt-2 font-light flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Optimal flow state detected.
                </p>
              </div>
            </div>
          </WidgetShell>

          {/* WISDOM WIDGET */}
          <WidgetShell
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-linear-to-br from-forge-accent/5 to-transparent"
            delay={100}
            title={
              <>
                <Quote size={12} /> Wisdom
              </>
            }
          >
            <div className="h-full flex flex-col justify-center">
              {insight ? (
                <>
                  <blockquote className="text-xl font-display font-medium text-white leading-relaxed mb-4">
                    &quot;{insight.quote}&quot;
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <cite className="text-sm text-forge-cyan font-mono not-italic">
                      — {insight.author}
                    </cite>

                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-gray-400">
                      {insight.theme}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5">
                    <p className="text-xs text-gray-500 italic flex items-center gap-2">
                      <Sparkles size={10} className="text-forge-accent" />
                      AI: This resonates with your recent focus on mindfulness.
                    </p>
                  </div>
                </>
              ) : (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                </div>
              )}
            </div>
          </WidgetShell>

          {/* MOOD CHART */}
          <WidgetShell
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 min-h-[200px]"
            delay={200}
            title={
              <>
                <TrendingUp size={12} /> Emotional Resonance
              </>
            }
            noPadding
          >
            <div className="h-full w-full pt-4">
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={MOOD_DATA}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#000",
                      border: "1px solid #333",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22D3EE"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorVal)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </WidgetShell>

          {/* NEURAL CORE */}
          <WidgetShell
            className="col-span-1 row-span-1"
            delay={300}
            title={
              <>
                <BrainCircuit size={12} /> Neural Core
              </>
            }
          >
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="flex -space-x-3">
                {AGENTS.slice(0, 3).map((agent) => (
                  <div
                    key={agent.id}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 border-forge-bg bg-linear-to-br flex items-center justify-center shadow-lg",
                      agent.gradient
                    )}
                  >
                    <agent.icon size={14} className="text-white" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-forge-bg bg-white/5 flex items-center justify-center text-xs text-gray-400">
                  +1
                </div>
              </div>

              <div className="w-full relative">
                <input
                  placeholder="Ask Chamber..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-forge-accent transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </WidgetShell>

          {/* TIMELINE */}
          <WidgetShell
            className="col-span-1 row-span-1"
            delay={400}
            title={
              <>
                <Activity size={12} /> Pulse
              </>
            }
          >
            <div className="relative h-full pl-4">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10" />

              <div className="space-y-4">
                {TIMELINE_SNAPSHOT.map((item, i) => (
                  <div key={item.id} className="relative pl-4">
                    <div
                      className={cn(
                        "absolute -left-1 top-1.5 w-2 h-2 rounded-full border-2 border-forge-bg",
                        i === 0 ? "bg-forge-cyan" : "bg-gray-700"
                      )}
                    />
                    <div className="text-[10px] text-gray-500 font-mono mb-0.5">{item.time}</div>
                    <div className="text-xs font-medium text-gray-200 line-clamp-1">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WidgetShell>

          {/* MEMORY DIGEST */}
          <WidgetShell
            className="col-span-1 md:col-span-2 row-span-1 min-h-[180px]"
            delay={500}
            title={
              <>
                <Target size={12} /> Artifacts
              </>
            }
          >
            <div className="grid grid-cols-3 gap-3 h-full">
              {RECENT_ARTIFACTS.map((item) => (
                <div
                  key={item.id}
                  className="group/card relative bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className={cn("w-1.5 h-1.5 rounded-full", item.color)} />
                    <ArrowUpRight
                      size={10}
                      className="text-gray-600 group-hover/card:text-white opacity-0 group-hover/card:opacity-100 transition-all"
                    />
                  </div>

                  <div className="text-xs font-medium text-gray-300 group-hover/card:text-white line-clamp-2 mb-2">
                    {item.title}
                  </div>

                  <div className="mt-auto flex justify-between items-center text-[10px] text-gray-500">
                    <span>{item.type}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </WidgetShell>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-80 shrink-0 border-l border-white/5 bg-black/20 backdrop-blur-xl h-full flex-col overflow-hidden flex xl:flex">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles size={14} className="text-forge-accent" /> Daily Synthesis
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
              Suggested Actions
            </h3>

            <div className="space-y-2">
              {[
                { label: "Log a reflection on 'Focus'", checked: false },
                { label: "Review yesterday's journal", checked: true },
                { label: "Disconnect for 20 mins", checked: false },
              ].map((task, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                      task.checked
                        ? "bg-forge-accent border-forge-accent"
                        : "border-gray-600 group-hover:border-white"
                    )}
                  >
                    {task.checked && <CheckCircle2 size={10} className="text-white" />}
                  </div>

                  <span
                    className={cn(
                      "text-sm",
                      task.checked ? "text-gray-500 line-through" : "text-gray-300"
                    )}
                  >
                    {task.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
