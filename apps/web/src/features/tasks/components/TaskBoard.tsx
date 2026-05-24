'use client';

import { Plus } from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '@/shared/lib/utils';

import type { Task } from '../types';

import { TaskCard } from './TaskCard';

interface TaskBoardProps {
  tasks: Task[];
  getPriorityColor: (prio: string) => string;
  onFocus: (task: Task) => void;
  onStatusChange: (id: string, status: 'todo' | 'in_progress' | 'done') => void;
  onDelete: (id: string) => void;
  onOpenCreate: () => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  getPriorityColor,
  onFocus,
  onStatusChange,
  onDelete,
  onOpenCreate,
}) => {
  const [dragOverColumn, setDragOverColumn] = useState<'todo' | 'in_progress' | 'done' | null>(null);

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  const handleDragOver = (e: React.DragEvent, col: 'todo' | 'in_progress' | 'done') => {
    e.preventDefault();
    setDragOverColumn(col);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetStatus: 'todo' | 'in_progress' | 'done') => {
    e.preventDefault();
    setDragOverColumn(null);
    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;

    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== targetStatus) {
      onStatusChange(taskId, targetStatus);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <div
        onDragOver={(e) => handleDragOver(e, 'todo')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'todo')}
        className={cn(
          'space-y-4 rounded-2xl bg-white/[0.01] border p-5 min-h-[350px] transition-all duration-300',
          dragOverColumn === 'todo'
            ? 'border-forge-cyan/40 bg-forge-cyan/[0.02] shadow-[0_0_20px_rgba(6,182,212,0.05)]'
            : 'border-white/5'
        )}
      >
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse" /> Pending
          </span>
          <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded-full text-gray-400">
            {todoTasks.length}
          </span>
        </div>
        <div className="space-y-3">
          {todoTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              getPriorityColor={getPriorityColor}
              onFocus={() => onFocus(task)}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
          {dragOverColumn === 'todo' && (
            <div className="border-2 border-dashed border-forge-cyan/35 bg-forge-cyan/[0.03] rounded-2xl h-24 flex items-center justify-center text-[10px] font-mono uppercase tracking-widest text-forge-cyan/70 animate-pulse">
              Drop Pending Action
            </div>
          )}
          <button
            onClick={onOpenCreate}
            className="w-full py-4 rounded-xl border border-dashed border-white/10 text-gray-500 hover:text-white hover:border-white/20 hover:bg-white/[0.01] transition-all text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus size={12} /> Forge Action
          </button>
        </div>
      </div>

      {/* COLUMN: IN PROGRESS */}
      <div
        onDragOver={(e) => handleDragOver(e, 'in_progress')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'in_progress')}
        className={cn(
          'space-y-4 rounded-2xl bg-white/[0.01] border p-5 min-h-[350px] transition-all duration-300',
          dragOverColumn === 'in_progress'
            ? 'border-forge-cyan/40 bg-forge-cyan/[0.02] shadow-[0_0_20px_rgba(6,182,212,0.05)]'
            : 'border-white/5'
        )}
      >
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono font-bold text-forge-cyan uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-forge-cyan animate-pulse" /> Executing
          </span>
          <span className="text-[10px] font-mono bg-forge-cyan/10 px-2 py-0.5 rounded-full text-forge-cyan">
            {inProgressTasks.length}
          </span>
        </div>
        <div className="space-y-3">
          {inProgressTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              getPriorityColor={getPriorityColor}
              onFocus={() => onFocus(task)}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
          {dragOverColumn === 'in_progress' && (
            <div className="border-2 border-dashed border-forge-cyan/35 bg-forge-cyan/[0.03] rounded-2xl h-24 flex items-center justify-center text-[10px] font-mono uppercase tracking-widest text-forge-cyan/70 animate-pulse">
              Drop Executing Action
            </div>
          )}
        </div>
      </div>

      {/* COLUMN: DONE */}
      <div
        onDragOver={(e) => handleDragOver(e, 'done')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'done')}
        className={cn(
          'space-y-4 rounded-2xl bg-white/[0.01] border p-5 min-h-[350px] transition-all duration-300',
          dragOverColumn === 'done'
            ? 'border-emerald-400/40 bg-emerald-500/[0.02] shadow-[0_0_20px_rgba(16,185,129,0.05)]'
            : 'border-white/5'
        )}
      >
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Cleared
          </span>
          <span className="text-[10px] font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full text-emerald-400">
            {doneTasks.length}
          </span>
        </div>
        <div className="space-y-3">
          {doneTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              getPriorityColor={getPriorityColor}
              onFocus={() => {}}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
          {dragOverColumn === 'done' && (
            <div className="border-2 border-dashed border-emerald-500/35 bg-emerald-500/[0.03] rounded-2xl h-24 flex items-center justify-center text-[10px] font-mono uppercase tracking-widest text-emerald-400/70 animate-pulse">
              Drop Cleared Action
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
