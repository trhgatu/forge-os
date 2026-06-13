'use client';

import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '@/shared/lib/utils';

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  // Dùng để đánh dấu các ngày đã hoàn thành (Ví dụ: ["2026-06-08", "2026-06-05"])
  highlightedDates?: string[];
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateChange,
  highlightedDates = [],
  className,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startDayOfMonth = (date: Date) => {
    // Quy đổi: 0 = Chủ Nhật, 1 = Thứ 2, ..., 6 = Thứ 7
    // Để hiển thị Thứ 2 đầu tiên, ta điều chỉnh chỉ số trả về
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthYearString = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentMonth(new Date(currentMonth.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentMonth(new Date(newYear, currentMonth.getMonth(), 1));
  };

  const getDaysArray = () => {
    const totalDays = daysInMonth(currentMonth);
    const offset = startDayOfMonth(currentMonth);
    const arr = [];

    // Thêm các ô trống của tháng trước
    for (let i = 0; i < offset; i++) {
      arr.push(null);
    }

    // Thêm các ngày trong tháng hiện tại
    for (let i = 1; i <= totalDays; i++) {
      arr.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }

    return arr;
  };

  const formatDateString = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const calendarDays = getDaysArray();

  return (
    <div className={cn('p-5 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md text-white select-none', className)}>
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1.5">
          <CalendarIcon size={14} className="text-forge-cyan animate-pulse shrink-0" />
          
          <select
            value={currentMonth.getMonth()}
            onChange={handleMonthChange}
            className="bg-transparent text-white border-0 hover:bg-white/5 cursor-pointer font-mono font-bold text-xs uppercase tracking-wider focus:outline-none py-0.5 px-1 rounded transition-all outline-none"
          >
            {months.map((m, idx) => (
              <option key={m} value={idx} className="bg-slate-950 text-white font-mono">
                {m.substring(0, 3)}
              </option>
            ))}
          </select>

          <select
            value={currentMonth.getFullYear()}
            onChange={handleYearChange}
            className="bg-transparent text-white border-0 hover:bg-white/5 cursor-pointer font-mono font-bold text-xs focus:outline-none py-0.5 px-1 rounded transition-all outline-none"
          >
            {years.map((y) => (
              <option key={y} value={y} className="bg-slate-950 text-white font-mono">
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg border border-white/5 bg-white/5 hover:border-white/20 text-gray-400 hover:text-white transition cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg border border-white/5 bg-white/5 hover:border-white/20 text-gray-400 hover:text-white transition cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Week Labels */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekLabels.map((lbl) => (
          <span key={lbl} className="text-[10px] font-mono text-gray-600 uppercase tracking-widest py-1 block">
            {lbl}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {calendarDays.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const dayStr = formatDateString(day);
          const hasHighlight = highlightedDates.includes(dayStr);
          const activeSelected = isSelected(day);
          const activeToday = isToday(day);

          return (
            <button
              key={dayStr}
              onClick={() => onDateChange(day)}
              className={cn(
                'aspect-square rounded-xl border flex flex-col items-center justify-center relative transition-all duration-300 group cursor-pointer text-xs font-mono',
                activeSelected
                  ? 'bg-forge-cyan text-slate-950 font-bold border-forge-cyan shadow-[0_0_15px_rgba(34,211,238,0.25)] scale-105 z-10'
                  : activeToday
                  ? 'bg-white/10 border-forge-cyan/50 text-forge-cyan font-semibold'
                  : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10 text-gray-300'
              )}
            >
              <span>{day.getDate()}</span>
              {/* Highlight dot representing completed chains */}
              {hasHighlight && (
                <span
                  className={cn(
                    'absolute bottom-1.5 w-1 h-1 rounded-full',
                    activeSelected ? 'bg-slate-950' : 'bg-forge-cyan animate-pulse'
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
