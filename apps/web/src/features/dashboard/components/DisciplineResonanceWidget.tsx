'use client';

import React from 'react';
import Link from 'next/link';
import { Flame } from 'lucide-react';

import { useRoutines } from '@/features/routines/hooks/useRoutines';
import { WidgetShell, Skeleton } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

export const DisciplineResonanceWidget: React.FC = () => {
  const { data: routines = [], isLoading } = useRoutines();

  const formatDateString = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const heatmapData = React.useMemo(() => {
    const data = [];
    const today = new Date();
    // Quay ngược 15 tuần trước về thứ 2 của tuần đó
    const currentDay = today.getDay();
    const daysToMonday = currentDay === 0 ? 6 : currentDay - 1;
    const startOfTarget = new Date(today);
    startOfTarget.setDate(today.getDate() - daysToMonday - 15 * 7);

    for (let i = 0; i < 112; i++) {
      const cellDate = new Date(startOfTarget);
      cellDate.setDate(startOfTarget.getDate() + i);

      const yyyy = cellDate.getFullYear();
      const mm = String(cellDate.getMonth() + 1).padStart(2, '0');
      const dd = String(cellDate.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;

      const isCompleted = routines.some((r) =>
        r.completions?.some((cStr: string) => cStr.startsWith(dateStr))
      );

      data.push({
        dateStr,
        date: cellDate,
        isCompleted,
      });
    }

    const weeksList = [];
    for (let i = 0; i < 16; i++) {
      weeksList.push(data.slice(i * 7, (i + 1) * 7));
    }
    return weeksList;
  }, [routines]);

  return (
    <Link
      href="/forge/routines"
      className="col-span-1 md:col-span-2 lg:col-span-2 block group/heatmap"
    >
      <WidgetShell
        className="w-full h-full min-h-[180px] cursor-pointer border-white/5 group-hover/heatmap:border-forge-cyan/25 transition-all duration-300"
        delay={600}
        title={
          <>
            <Flame size={12} className="text-forge-cyan animate-pulse group-hover/heatmap:text-forge-accent transition-colors" /> Discipline Resonance
          </>
        }
      >
        {isLoading ? (
          <div className="w-full h-full flex flex-col gap-2">
            <Skeleton variant="default" className="h-4 w-40 rounded" />
            <Skeleton variant="glowing" className="h-16 w-full rounded-2xl" />
          </div>
        ) : (
          <div className="flex flex-col gap-4 h-full justify-center">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                16-week discipline history.
              </p>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-500 shrink-0">
                <span>Less</span>
                <div className="w-2.5 h-2.5 rounded-xs bg-white/[0.02] border border-white/5" />
                <div className="w-2.5 h-2.5 rounded-xs bg-forge-cyan/40 border border-forge-cyan/20" />
                <div className="w-2.5 h-2.5 rounded-xs bg-forge-cyan border border-forge-cyan/50 shadow-[0_0_8px_rgba(34,211,238,0.25)]" />
                <span>More</span>
              </div>
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide select-none w-full justify-between">
              {/* Day labels */}
              <div className="flex flex-col justify-between text-[9px] font-mono text-gray-600 pr-2 py-0.5 shrink-0">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
                <span>Sun</span>
              </div>

              {/* Weeks grid */}
              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                {heatmapData.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5">
                    {week.map((day) => (
                      <div
                        key={day.dateStr}
                        className={cn(
                          "w-3 h-3 rounded-xs border transition-all duration-300 cursor-help",
                          day.isCompleted
                            ? "bg-forge-cyan border-forge-cyan/50 shadow-[0_0_8px_rgba(34,211,238,0.25)] scale-105"
                            : "bg-white/[0.02] border-white/5 hover:border-white/10"
                        )}
                        title={`${day.date.toLocaleDateString()}: ${day.isCompleted ? 'Combo Completed' : 'No completion'}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </WidgetShell>
    </Link>
  );
};
