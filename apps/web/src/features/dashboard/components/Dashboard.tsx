'use client';

/* import { getDailyInsight } from "@/services/geminiService"; */
/* import { getDailyInsight } from "@/services/geminiService"; */

import {
  Clock,
  Calendar,
  ArrowUpRight,
  Target,
  Sparkles,
  BrainCircuit,
  TrendingUp,
  Activity,
  ChevronRight,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

import { AGENTS } from '@/features/chamber/components/AgentDock';
import { cn } from '@/shared/lib/utils';

import { QuoteOfTheDayWidget } from './QuoteOfTheDayWidget';

const MOOD_DATA = [
  { day: 'Mon', value: 6, mood: 'Neutral' },
  { day: 'Tue', value: 4, mood: 'Tired' },
  { day: 'Wed', value: 7, mood: 'Calm' },
  { day: 'Thu', value: 8, mood: 'Focused' },
  { day: 'Fri', value: 5, mood: 'Anxious' },
  { day: 'Sat', value: 9, mood: 'Inspired' },
  { day: 'Sun', value: 8, mood: 'Inspired' },
];

const RECENT_ARTIFACTS = [
  {
    id: 1,
    title: 'The Architecture of Silence',
    type: 'Journal',
    date: '2h ago',
    color: 'bg-fuchsia-500',
  },
  {
    id: 2,
    title: 'Project Nebula Specs',
    type: 'Memory',
    date: '5h ago',
    color: 'bg-blue-500',
  },
  {
    id: 3,
    title: 'Stoic Reflections',
    type: 'Quote',
    date: 'Yesterday',
    color: 'bg-amber-500',
  },
];

const TIMELINE_SNAPSHOT = [
  { id: 1, time: '10:00 AM', label: 'Deep Focus Session', type: 'event' },
  { id: 2, time: '2:30 PM', label: 'Logged Mood: Anxious', type: 'mood' },
  { id: 3, time: '4:45 PM', label: 'Captured Memory', type: 'memory' },
];

// -------------------- WIDGET SHELL --------------------

export interface WidgetProps {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  delay?: number;
  noPadding?: boolean;
}

export const WidgetShell: React.FC<WidgetProps> = ({
  children,
  className,
  title,
  delay = 0,
  noPadding = false,
}) => (
  <div
    className={cn(
      'relative group flex flex-col',
      'bg-[#ffffff]/[0.015] backdrop-blur-xl border border-white/5 rounded-[24px]',
      'hover:bg-[#ffffff]/[0.035] hover:border-forge-cyan/20 hover:-translate-y-1',
      'hover:shadow-[0_20px_50px_rgba(34,211,238,0.06)]',
      'transition-all duration-500 ease-spring-out',
      'overflow-hidden',
      className,
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Floating top glow highlight */}
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-forge-cyan/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30" />

    {title && (
      <div className="flex items-center justify-between px-6 pt-6 pb-2 relative z-10">
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2 font-bold group-hover:text-gray-400 transition-colors">
          {title}
        </div>
        <button className="text-gray-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110">
          <Maximize2 size={12} />
        </button>
      </div>
    )}

    <div className={cn('flex-1 relative z-10', noPadding ? '' : 'p-6 pt-2')}>{children}</div>
  </div>
);

// -------------------- MAIN DASHBOARD --------------------

export const Dashboard: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [focusScore] = useState(85);
  const [tasks, setTasks] = useState([
    { id: 1, label: "Log a reflection on 'Focus'", checked: false },
    { id: 2, label: "Review yesterday's journal", checked: true },
    { id: 3, label: 'Disconnect for 20 mins', checked: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Removed insight useEffect as state is now lazy-initialized

  const timeString = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateString = time.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const hour = time.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="h-full flex bg-forge-bg overflow-hidden">
      {/* MAIN CONTENT */}
      <div className="flex-1 h-full overflow-y-auto overflow-x-hidden scrollbar-hide p-8 pb-24">
        {/* Greeting */}
        <header className="mb-10 relative group">
          <h1 className="text-5xl font-display font-bold text-white mb-2 tracking-tight">
            {greeting},{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forge-cyan via-cyan-300 to-forge-accent">
              Traveler.
            </span>
          </h1>

          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-2 font-light">
              <Calendar size={14} /> {dateString}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="text-forge-cyan font-mono text-xs uppercase tracking-wider">
              Systems Nominal
            </span>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-min">
          {/* TIME WIDGET */}
          <WidgetShell
            className="col-span-1 md:col-span-2 row-span-1 min-h-[220px] relative overflow-hidden"
            delay={0}
          >
            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
                  <Clock className="text-forge-cyan" size={20} />
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Focus Score</div>
                  <div className="text-xl font-bold text-white tracking-tight">{focusScore}%</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-7xl font-display font-bold tracking-tighter text-white leading-none">
                  {timeString}
                </div>
                <p className="text-gray-400 mt-3 text-xs font-light">
                  Optimal flow state detected.
                </p>
              </div>
            </div>
          </WidgetShell>

          {/* WISDOM WIDGET */}
          {/* WISDOM WIDGET */}
          <QuoteOfTheDayWidget />

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
                    {/* Glowing filter for cyberpunk holographic laser line */}
                    <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(7,7,12,0.95)',
                      border: '1px solid rgba(34,211,238,0.2)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(8px)',
                    }}
                    itemStyle={{ color: '#22D3EE' }}
                  />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22D3EE"
                    strokeWidth={2.5}
                    filter="url(#neon-glow)"
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
                      'w-10 h-10 rounded-full border-2 border-forge-bg bg-linear-to-br flex items-center justify-center shadow-lg',
                      agent.gradient,
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
                        'absolute -left-1 top-1.5 w-2 h-2 rounded-full border-2 border-forge-bg',
                        i === 0 ? 'bg-forge-cyan' : 'bg-gray-700',
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
                    <div className={cn('w-1.5 h-1.5 rounded-full', item.color)} />
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
          {/* Cognitive Diagnostics */}
          <div>
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-[0.15em] mb-4 font-bold">
              Cognitive Diagnostics
            </h3>
            
            <div className="space-y-4">
              {/* Cognitive Load */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5">
                  <span>Cognitive Load</span>
                  <span className="text-forge-cyan">62%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-forge-cyan rounded-full w-[62%] transition-all duration-500" />
                </div>
              </div>

              {/* Mental RAM */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5">
                  <span>Mental RAM</span>
                  <span className="text-forge-accent">30%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-forge-accent rounded-full w-[30%] transition-all duration-500" />
                </div>
              </div>

              {/* Focus Index */}
              <div className="flex justify-between items-center text-[11px] font-mono text-gray-400">
                <span>Focus Stability</span>
                <span className="text-emerald-400 font-bold">STABLE / HIGH</span>
              </div>
            </div>
          </div>

          {/* AI Synthesis Summary */}
          <div>
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-[0.15em] mb-3 font-bold">
              AI Synthesis Report
            </h3>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-gray-300 leading-relaxed font-light italic">
              "Tâm trí hôm nay duy trì sự tập trung cao độ vào buổi sáng, biểu đồ cảm xúc ổn định ở trạng thái tĩnh tâm. Hệ thống đề xuất duy trì nhịp độ làm việc hiện tại và dành 20 phút ngắt kết nối ngắn vào cuối ngày."
            </div>
          </div>

          {/* Suggested Actions */}
          <div>
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-[0.15em] mb-3 font-bold">
              Suggested Actions
            </h3>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                >
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300',
                      task.checked
                        ? 'bg-forge-cyan border-forge-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                        : 'border-gray-600 group-hover:border-forge-cyan',
                    )}
                  >
                    {task.checked && <CheckCircle2 size={10} className="text-slate-950 font-bold" />}
                  </div>

                  <span
                    className={cn(
                      'text-sm transition-all duration-300 select-none',
                      task.checked 
                        ? 'text-gray-500 line-through opacity-60 scale-[0.97] origin-left' 
                        : 'text-gray-300 group-hover:text-white',
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


