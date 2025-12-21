"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Activity } from "lucide-react";

import { GlassCard } from "@/shared/ui/GlassCard";
import type { MoodEntry } from "@/shared/types/mood";
import { MOOD_CHART_COLOR, MOOD_CHART_GRADIENT_ID } from "../config";

interface MoodChartProps {
  history: MoodEntry[];
}

export function MoodChart({ history }: MoodChartProps) {
  const data = history.map((entry) => ({
    date: entry.date.toLocaleDateString([], { weekday: "short" }),
    fullDate: entry.date.toLocaleDateString(),
    value: entry.intensity,
    mood: entry.mood,
  }));

  return (
    <div className="mb-12 h-64 w-full">
      <GlassCard className="relative h-full overflow-hidden" noPadding>
        <div className="absolute left-6 top-4 z-10">
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white">
            <Activity size={14} className="text-forge-cyan" />
            Resonance Frequency
          </h3>
        </div>

        <div className="h-full w-full pt-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={MOOD_CHART_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={MOOD_CHART_COLOR} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={MOOD_CHART_COLOR} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis dataKey="date" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                labelFormatter={(label, payload) => {
                  const first = payload?.[0];
                  if (first && typeof first.payload.fullDate === "string") {
                    return first.payload.fullDate;
                  }
                  return label;
                }}
                contentStyle={{
                  backgroundColor: "#09090b",
                  borderColor: "#333",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={MOOD_CHART_COLOR}
                fill={`url(#${MOOD_CHART_GRADIENT_ID})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
