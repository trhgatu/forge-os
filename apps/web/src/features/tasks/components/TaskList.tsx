'use client';

import { ArrowRight, Check, Maximize2, Trash2, Zap } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib/utils';

import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  getPriorityColor: (prio: string) => string;
  onFocus: (task: Task) => void;
  onStatusChange: (id: string, status: 'todo' | 'in_progress' | 'done') => void;
  onDelete: (id: string) => void;
  playSound: (sound: any) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  getPriorityColor,
  onFocus,
  onStatusChange,
  onDelete,
  playSound,
}) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={cn(
            'group relative rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md p-5 hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 flex items-center justify-between gap-6 overflow-hidden',
            task.status === 'done' && 'opacity-60 hover:opacity-85'
          )}
        >
          <div className="flex items-center gap-4 flex-1">
            {/* Completion check box */}
            <button
              onClick={() => {
                onStatusChange(task.id, task.status === 'done' ? 'todo' : 'done');
              }}
              className={cn(
                'w-6 h-6 rounded-lg border border-white/10 hover:border-forge-cyan transition-all flex items-center justify-center cursor-pointer',
                task.status === 'done' && 'bg-emerald-500/10 border-emerald-500/30'
              )}
            >
              {task.status === 'done' ? <Check size={12} className="text-emerald-400" /> : null}
            </button>

            <div className="space-y-1">
              <h3
                className={cn(
                  'text-sm font-medium text-gray-200 transition-colors',
                  task.status === 'done' && 'line-through text-gray-500'
                )}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-xs text-gray-500 font-light line-clamp-1 max-w-xl">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className={cn('text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border', getPriorityColor(task.priority))}>
              {task.priority}
            </span>
            <span className="text-[9px] font-mono text-gray-500 flex items-center gap-1 uppercase tracking-widest">
              <Zap size={10} className="text-forge-cyan animate-pulse" /> Quest Item
            </span>

            {task.status !== 'done' && (
              <button
                onClick={() => {
                  playSound('on');
                  onFocus(task);
                }}
                className="p-1.5 rounded-lg border border-white/5 hover:border-forge-cyan/30 text-gray-500 hover:text-forge-cyan transition-all hover:bg-forge-cyan/5 cursor-pointer"
                title="Enter Focus Mode"
              >
                <Maximize2 size={13} />
              </button>
            )}

            {/* Dropdown status changer for list view */}
            {task.status !== 'done' && (
              <button
                onClick={() => {
                  onStatusChange(task.id, task.status === 'todo' ? 'in_progress' : 'done');
                }}
                className="text-xs font-mono text-gray-500 hover:text-white flex items-center gap-1 transition-all"
              >
                {task.status === 'todo' ? 'Start' : 'Complete'} <ArrowRight size={12} />
              </button>
            )}

            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded-lg border border-white/5 hover:border-rose-500/30 text-gray-500 hover:text-rose-500 transition-all hover:bg-rose-500/5 cursor-pointer"
              title="Dissolve Action"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
