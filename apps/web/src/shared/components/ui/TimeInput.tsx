import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export interface TimeInputProps {
  value: string; // "HH:MM" format
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  className,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hourScrollRef = useRef<HTMLDivElement>(null);
  const minuteScrollRef = useRef<HTMLDivElement>(null);

  // Parse current value
  const [selectedHour, selectedMinute] = value && value.includes(':') 
    ? value.split(':') 
    : ['', ''];

  // Generate hours (00-23) and minutes (00-59)
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Scroll active elements into view when popover opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (selectedHour && hourScrollRef.current) {
          const activeHourEl = hourScrollRef.current.querySelector('[data-active="true"]');
          if (activeHourEl) {
            activeHourEl.scrollIntoView({ block: 'center', behavior: 'auto' });
          }
        }
        if (selectedMinute && minuteScrollRef.current) {
          const activeMinuteEl = minuteScrollRef.current.querySelector('[data-active="true"]');
          if (activeMinuteEl) {
            activeMinuteEl.scrollIntoView({ block: 'center', behavior: 'auto' });
          }
        }
      }, 50);
    }
  }, [isOpen, selectedHour, selectedMinute]);

  const handleSelectHour = (hour: string) => {
    const min = selectedMinute || '00';
    onChange(`${hour}:${min}`);
  };

  const handleSelectMinute = (minute: string) => {
    const hr = selectedHour || '12';
    onChange(`${hr}:${minute}`);
  };

  const formattedDisplay = value && value.includes(':') 
    ? value 
    : 'Set time';

  return (
    <div className={cn('relative w-44', className)} ref={containerRef}>
      {/* Target Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-10 w-full items-center gap-3 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white backdrop-blur-sm transition-all text-left outline-none cursor-pointer',
          isOpen ? 'ring-1 ring-forge-cyan border-forge-cyan/50' : 'hover:border-white/20',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <Clock className={cn('h-4 w-4 transition-colors', isOpen ? 'text-forge-cyan' : 'text-gray-500')} />
        <span className={cn('font-mono', !value && 'text-gray-500 font-sans')}>
          {formattedDisplay}
        </span>
      </button>

      {/* Popover time picker */}
      {isOpen && (
        <div 
          className="absolute left-0 mt-2 z-50 flex h-48 w-44 rounded-xl border border-white/10 bg-[#09090b]/95 backdrop-blur-xl p-2 shadow-2xl shadow-black animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Hours Column */}
          <div 
            ref={hourScrollRef}
            className="flex-1 overflow-y-auto pr-1 text-center select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="text-[9px] font-mono uppercase tracking-widest text-gray-600 mb-1 sticky top-0 bg-[#09090b]/90 py-1 backdrop-blur-sm">
              Hour
            </div>
            {hours.map((hour) => {
              const active = hour === selectedHour;
              return (
                <button
                  type="button"
                  key={hour}
                  data-active={active}
                  onClick={() => handleSelectHour(hour)}
                  className={cn(
                    'w-full py-1 text-sm font-mono rounded-md transition-all cursor-pointer block',
                    active 
                      ? 'bg-forge-cyan/15 text-forge-cyan font-bold shadow-[0_0_8px_rgba(34,211,238,0.1)]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {hour}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-px bg-white/5 my-1" />

          {/* Minutes Column */}
          <div 
            ref={minuteScrollRef}
            className="flex-1 overflow-y-auto pl-1 text-center select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="text-[9px] font-mono uppercase tracking-widest text-gray-600 mb-1 sticky top-0 bg-[#09090b]/90 py-1 backdrop-blur-sm">
              Min
            </div>
            {minutes.map((minute) => {
              const active = minute === selectedMinute;
              return (
                <button
                  type="button"
                  key={minute}
                  data-active={active}
                  onClick={() => handleSelectMinute(minute)}
                  className={cn(
                    'w-full py-1 text-sm font-mono rounded-md transition-all cursor-pointer block',
                    active 
                      ? 'bg-forge-cyan/15 text-forge-cyan font-bold shadow-[0_0_8px_rgba(34,211,238,0.1)]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {minute}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
