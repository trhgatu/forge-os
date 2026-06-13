import React from 'react';

import { cn } from '@/shared/lib/utils';

export interface ActiveDaysSelectorProps {
  selectedDays: number[];
  onChange: (days: number[]) => void;
  className?: string;
  disabled?: boolean;
}

const DAYS_OF_WEEK = [
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' },
  { value: 7, label: 'Sun' },
];

export const ActiveDaysSelector: React.FC<ActiveDaysSelectorProps> = ({
  selectedDays,
  onChange,
  className,
  disabled = false,
}) => {
  const toggleDay = (day: number) => {
    if (disabled) return;
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day].sort((a, b) => a - b);
    onChange(newDays);
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {DAYS_OF_WEEK.map((day) => {
        const active = selectedDays.includes(day.value);
        return (
          <button
            type="button"
            key={day.value}
            disabled={disabled}
            onClick={() => toggleDay(day.value)}
            className={cn(
              'px-3 py-1.5 rounded-md border text-xs font-mono transition-all cursor-pointer',
              active
                ? 'bg-forge-cyan/15 border-forge-cyan text-forge-cyan shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {day.label}
          </button>
        );
      })}
    </div>
  );
};
