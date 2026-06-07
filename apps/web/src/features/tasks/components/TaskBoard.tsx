'use client';

import { Plus } from 'lucide-react';
import React, { useState } from 'react';

import { cn } from '@/shared/lib/utils';

import type { Task } from '../types';

import { TaskCard } from './TaskCard';

import {
  DndContext,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';

interface TaskBoardProps {
  tasks: Task[];
  getPriorityColor: (prio: string) => string;
  onFocus: (task: Task) => void;
  onStatusChange: (id: string, status: 'todo' | 'in_progress' | 'done') => void;
  onDelete: (id: string) => void;
  onOpenCreate: () => void;
}

interface TaskColumnProps {
  id: 'todo' | 'in_progress' | 'done';
  title: string;
  tasks: Task[];
  getPriorityColor: (prio: string) => string;
  onFocus: (task: Task) => void;
  onStatusChange: (id: string, status: 'todo' | 'in_progress' | 'done') => void;
  onDelete: (id: string) => void;
  onOpenCreate?: () => void;
  isOverGlobal: boolean;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  id,
  title,
  tasks,
  getPriorityColor,
  onFocus,
  onStatusChange,
  onDelete,
  onOpenCreate,
  isOverGlobal,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const columnOver = isOver || isOverGlobal;

  const getColStyles = () => {
    if (id === 'todo') {
      return columnOver
        ? 'border-forge-cyan/40 bg-forge-cyan/[0.02] shadow-[0_0_20px_rgba(6,182,212,0.05)]'
        : 'border-white/5';
    }
    if (id === 'in_progress') {
      return columnOver
        ? 'border-forge-cyan/40 bg-forge-cyan/[0.02] shadow-[0_0_20px_rgba(6,182,212,0.05)]'
        : 'border-white/5';
    }
    return columnOver
      ? 'border-emerald-400/40 bg-emerald-500/[0.02] shadow-[0_0_20px_rgba(16,185,129,0.05)]'
      : 'border-white/5';
  };

  const getHeaderInfo = () => {
    if (id === 'todo') {
      return (
        <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse" /> Pending
        </span>
      );
    }
    if (id === 'in_progress') {
      return (
        <span className="text-xs font-mono font-bold text-forge-cyan uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-forge-cyan animate-pulse" /> Executing
        </span>
      );
    }
    return (
      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Cleared
      </span>
    );
  };

  const getCounterStyles = () => {
    if (id === 'todo') return 'bg-white/5 text-gray-400';
    if (id === 'in_progress') return 'bg-forge-cyan/10 text-forge-cyan';
    return 'bg-emerald-500/10 text-emerald-400';
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'space-y-4 rounded-2xl bg-white/[0.01] border p-5 min-h-[350px] transition-all duration-300',
        getColStyles()
      )}
    >
      <div className="flex items-center justify-between px-1">
        {getHeaderInfo()}
        <span className={cn('text-[10px] font-mono px-2 py-0.5 rounded-full', getCounterStyles())}>
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            getPriorityColor={getPriorityColor}
            onFocus={() => onFocus(task)}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
        {columnOver && (
          <div
            className={cn(
              'border-2 border-dashed rounded-2xl h-24 flex items-center justify-center text-[10px] font-mono uppercase tracking-widest animate-pulse',
              id === 'done'
                ? 'border-emerald-500/35 bg-emerald-500/[0.03] text-emerald-400/70'
                : 'border-forge-cyan/35 bg-forge-cyan/[0.03] text-forge-cyan/70'
            )}
          >
            Drop {title} Action
          </div>
        )}
        {id === 'todo' && onOpenCreate && (
          <button
            onClick={onOpenCreate}
            className="w-full py-4 rounded-xl border border-dashed border-white/10 text-gray-500 hover:text-white hover:border-white/20 hover:bg-white/[0.01] transition-all text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus size={12} /> Forge Action
          </button>
        )}
      </div>
    </div>
  );
};

export const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  getPriorityColor,
  onFocus,
  onStatusChange,
  onDelete,
  onOpenCreate,
}) => {
  const [activeOverId, setActiveOverId] = useState<string | null>(null);

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragOverEvent = (event: any) => {
    const { over } = event;
    if (over) {
      setActiveOverId(over.id as string);
    } else {
      setActiveOverId(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveOverId(null);
    const { active, over } = event;
    if (!over) return;

    const targetStatus = over.id as 'todo' | 'in_progress' | 'done';
    const taskId = active.id as string;

    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== targetStatus) {
      onStatusChange(taskId, targetStatus);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragOver={handleDragOverEvent}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <TaskColumn
          id="todo"
          title="Pending"
          tasks={todoTasks}
          getPriorityColor={getPriorityColor}
          onFocus={onFocus}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onOpenCreate={onOpenCreate}
          isOverGlobal={activeOverId === 'todo'}
        />
        <TaskColumn
          id="in_progress"
          title="Executing"
          tasks={inProgressTasks}
          getPriorityColor={getPriorityColor}
          onFocus={onFocus}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          isOverGlobal={activeOverId === 'in_progress'}
        />
        <TaskColumn
          id="done"
          title="Cleared"
          tasks={doneTasks}
          getPriorityColor={getPriorityColor}
          onFocus={onFocus}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          isOverGlobal={activeOverId === 'done'}
        />
      </div>
    </DndContext>
  );
};

