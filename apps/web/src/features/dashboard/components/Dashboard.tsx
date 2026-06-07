'use client';

import {
  Clock,
  Calendar,
  ArrowUpRight,
  Target,
  BrainCircuit,
  TrendingUp,
  Activity,
  ChevronRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

import { AGENTS } from '@/features/chamber/components/AgentDock';
import { WidgetShell, Label, Tag, Skeleton } from '@/shared/components/ui';
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

export const Dashboard: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [focusScore] = useState(85);
  const [loading, setLoading] = useState(true);
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
    const loadTimer = setTimeout(() => setLoading(false), 1200);
    return () => {
      clearInterval(timer);
      clearTimeout(loadTimer);
    };
  }, []);

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
          {/* Ethereal label */}
          <div className="mb-3 flex items-center gap-2 opacity-80 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
            <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase">
              Mission Control
            </Label>
          </div>

          <Label variant="default" className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3 block capitalize animate-in fade-in slide-in-from-left-4 duration-500 delay-75">
            {greeting},{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forge-cyan via-cyan-300 to-forge-accent">
              Traveler.
            </span>
          </Label>

          <div className="flex items-center gap-4 text-gray-400 animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
            <span className="flex items-center gap-2 font-light text-xs">
              <Calendar size={13} /> {dateString}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <Tag variant="cyan" className="text-[9px] font-mono uppercase tracking-wider py-0.5 px-2">
              Systems Nominal
            </Tag>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-min">
          {/* TIME WIDGET */}
          <WidgetShell
            className="col-span-1 md:col-span-2 row-span-1 min-h-[220px] relative overflow-hidden"
            delay={0}
          >
            {loading ? (
              <div className="h-full flex flex-col justify-between animate-pulse">
                <div className="flex justify-between items-start">
                  <Skeleton variant="glowing" className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton variant="default" className="h-3 w-16 rounded-md" />
                    <Skeleton variant="default" className="h-6 w-10 rounded-md" />
                  </div>
                </div>
                <div className="space-y-3 mt-4">
                  <Skeleton variant="glowing" className="h-16 w-48 rounded-2xl" />
                  <Skeleton variant="default" className="h-4 w-36 rounded-md" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-between h-full relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
                    <Clock className="text-forge-cyan" size={20} />
                  </div>

                  <div className="text-right">
                    <Label variant="dim" className="text-[10px] uppercase tracking-wider block">Focus Score</Label>
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
            )}
          </WidgetShell>

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
            {loading ? (
              <div className="p-6 h-full w-full flex items-center justify-center">
                <Skeleton variant="default" className="w-full h-full rounded-2xl" />
              </div>
            ) : (
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
            )}
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
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 w-full">
                <Skeleton variant="default" className="h-10 w-full rounded-xl" />
                <Skeleton variant="default" className="h-10 w-full rounded-xl" />
              </div>
            ) : (
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
            )}
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
            {loading ? (
              <div className="space-y-4 w-full h-full">
                <Skeleton variant="default" className="h-8 w-full rounded-xl" />
                <Skeleton variant="default" className="h-8 w-full rounded-xl" />
                <Skeleton variant="default" className="h-8 w-full rounded-xl" />
              </div>
            ) : (
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
                      <Label variant="dim" className="text-[10px] font-mono mb-0.5 block">{item.time}</Label>
                      <div className="text-xs font-medium text-gray-200 line-clamp-1">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
            {loading ? (
              <div className="grid grid-cols-3 gap-3 h-full">
                <Skeleton variant="default" className="h-full w-full rounded-xl" />
                <Skeleton variant="default" className="h-full w-full rounded-xl" />
                <Skeleton variant="default" className="h-full w-full rounded-xl" />
              </div>
            ) : (
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
                      <Tag variant="default" className="text-[8px] py-0 px-1 border-white/5 bg-white/5 text-zinc-400">{item.type}</Tag>
                      <Label variant="dim" className="text-[9px] font-mono">{item.date}</Label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </WidgetShell>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-80 shrink-0 border-l border-white/5 bg-black/20 backdrop-blur-xl h-full flex-col overflow-hidden flex xl:flex">
        <div className="p-6 border-b border-white/5">
          <Label variant="default" className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center gap-2 block">
            Daily Synthesis
          </Label>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Cognitive Diagnostics */}
          <div>
            <Label variant="dim" className="text-xs font-mono text-gray-500 uppercase tracking-[0.15em] mb-4 font-bold block">
              Cognitive Diagnostics
            </Label>

            {loading ? (
              <div className="space-y-4">
                <Skeleton variant="default" className="h-10 w-full rounded-md" />
                <Skeleton variant="default" className="h-10 w-full rounded-md" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cognitive Load */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5">
                    <Label variant="default" className="text-[11px] font-mono text-zinc-400 block">Cognitive Load</Label>
                    <Label variant="cyan" className="text-[11px] font-mono text-forge-cyan block">62%</Label>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-forge-cyan rounded-full w-[62%] transition-all duration-500" />
                  </div>
                </div>

                {/* Mental RAM */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5">
                    <Label variant="default" className="text-[11px] font-mono text-zinc-400 block">Mental RAM</Label>
                    <Label variant="accent" className="text-[11px] font-mono text-forge-accent block">30%</Label>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-forge-accent rounded-full w-[30%] transition-all duration-500" />
                  </div>
                </div>

                {/* Focus Index */}
                <div className="flex justify-between items-center text-[11px] font-mono text-gray-400">
                  <Label variant="default" className="text-[11px] font-mono text-zinc-400 block">Focus Stability</Label>
                  <Tag variant="cyan" className="text-[9px] px-1.5 py-0.5 font-bold">STABLE / HIGH</Tag>
                </div>
              </div>
            )}
          </div>

          {/* AI Synthesis Summary */}
          <div>
            <Label variant="dim" className="text-xs font-mono text-gray-500 uppercase tracking-[0.15em] mb-3 font-bold block">
              AI Synthesis Report
            </Label>
            {loading ? (
              <Skeleton variant="glowing" className="h-24 w-full rounded-2xl" />
            ) : (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-gray-300 leading-relaxed font-light italic">
                "Tâm trí hôm nay duy trì sự tập trung cao độ vào buổi sáng, biểu đồ cảm xúc ổn định ở trạng thái tĩnh tâm. Hệ thống đề xuất duy trì nhịp độ làm việc hiện tại và dành 20 phút ngắt kết nối ngắn vào cuối ngày."
              </div>
            )}
          </div>

          {/* Suggested Actions */}
          <div>
            <Label variant="dim" className="text-xs font-mono text-gray-500 uppercase tracking-[0.15em] mb-3 font-bold block">
              Suggested Actions
            </Label>

            {loading ? (
              <div className="space-y-2">
                <Skeleton variant="default" className="h-10 w-full rounded-md" />
                <Skeleton variant="default" className="h-10 w-full rounded-md" />
                <Skeleton variant="default" className="h-10 w-full rounded-md" />
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


