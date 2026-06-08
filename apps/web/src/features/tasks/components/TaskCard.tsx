'use client';

import { Check, Maximize2, Trash2, Zap } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib/utils';

import type { Task } from '../types';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface TaskCardProps {
  task: Task;
  getPriorityColor: (prio: string) => string;
  onFocus: () => void;
  onStatusChange: (id: string, status: 'todo' | 'in_progress' | 'done') => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  getPriorityColor,
  onFocus,
  onStatusChange,
  onDelete,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    disabled: task.status === 'done',
  });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}

      className={cn(
        'group relative rounded-2xl border transition-all duration-300 p-5 flex flex-col justify-between min-h-[140px] overflow-hidden shadow-lg select-none',
        isDragging
          ? 'opacity-20 border-dashed border-forge-cyan/30 scale-[0.97] bg-[#09090b]'
          : task.status === 'done'
          ? 'opacity-60 hover:opacity-85 border-white/5 bg-[#0d0d0f]'
          : 'cursor-grab active:cursor-grabbing hover:scale-[1.02] border-white/5 bg-[#101012] hover:bg-[#151518] hover:border-white/10'
      )}
    >
      <div className="space-y-3">
        {/* Card Header Tags */}
        <div className="flex items-center justify-between">
          <span className={cn('text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border', getPriorityColor(task.priority))}>
            {task.priority}
          </span>
          <span className="text-[8px] font-mono text-gray-500 flex items-center gap-0.5 uppercase tracking-widest">
            <Zap size={9} className="text-forge-cyan animate-pulse" /> Quest Item
          </span>
        </div>

        {/* Title & Desc */}
        <div className="space-y-1">
          <h4
            className={cn(
              'text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300',
              task.status === 'done' && 'line-through text-gray-500'
            )}
          >
            {task.title}
          </h4>
          {task.description && (
            <p className="text-xs text-gray-500 font-light font-sans line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-4">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 rounded-lg border border-transparent hover:border-rose-500/30 text-gray-600 hover:text-rose-500 hover:bg-rose-500/5 transition-all cursor-pointer"
            title="Dissolve"
          >
            <Trash2 size={12} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {task.status !== 'done' && (
            <button
              onClick={onFocus}
              className="p-1 rounded-lg border border-transparent hover:border-forge-cyan/30 text-gray-600 hover:text-forge-cyan hover:bg-forge-cyan/5 transition-all cursor-pointer"
              title="Focus Mode"
            >
              <Maximize2 size={12} />
            </button>
          )}

          {task.status === 'todo' && (
            <button
              onClick={() => onStatusChange(task.id, 'in_progress')}
              className="px-2 py-1 rounded-lg border border-white/5 hover:border-white/10 text-gray-400 hover:text-white text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer"
            >
              Execute
            </button>
          )}

          {task.status === 'in_progress' && (
            <button
              onClick={() => onStatusChange(task.id, 'done')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-forge-cyan hover:bg-forge-cyan/90 text-black text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Check size={10} /> Clear
            </button>
          )}

          {task.status === 'done' && (
            <button
              onClick={() => onStatusChange(task.id, 'todo')}
              className="text-[10px] font-mono text-emerald-400 font-medium"
            >
              Cleared ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
