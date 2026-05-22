'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface DropdownOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  className,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {/* Toggle button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-all text-left cursor-pointer duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed',
          isOpen && 'border-white/20 bg-white/[0.08] shadow-[0_0_15px_rgba(255,255,255,0.05)]'
        )}
      >
        <span className={cn('truncate', !selectedOption && 'text-gray-500')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-gray-500 transition-transform duration-300 shrink-0 ml-2',
            isOpen && 'transform rotate-180 text-white'
          )}
        />
      </button>

      {/* Dropdown Options List */}
      <div
        className={cn(
          'absolute z-50 left-0 right-0 mt-2 bg-[#09090b]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl max-h-60 overflow-y-auto overflow-x-hidden transition-all duration-300 origin-top scrollbar-thin',
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        )}
      >
        <div className="p-1 space-y-0.5">
          {options.length === 0 ? (
            <div className="py-3 px-4 text-xs text-gray-500 italic text-center">No options available</div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    'w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 flex flex-col justify-center cursor-pointer select-none',
                    isSelected
                      ? 'bg-white/10 text-white font-medium shadow-inner'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {option.sublabel && (
                    <span className={cn('text-[9px] mt-0.5 block truncate', isSelected ? 'text-white/60' : 'text-gray-600')}>
                      {option.sublabel}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
