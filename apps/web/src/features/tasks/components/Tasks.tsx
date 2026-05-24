'use client';

import { ListTodo, Plus, Target, Flame, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';

import { useSound } from '@/contexts';
import { cn } from '@/shared/lib/utils';

import { useTasks, useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import type { Task } from '../types';

import { CreateTaskModal } from './CreateTaskModal';
import { FocusChamber } from './FocusChamber';
import { TaskBoard } from './TaskBoard';
import { TaskList } from './TaskList';

export const Tasks: React.FC = () => {
  const { playSound } = useSound();
  const { data: tasks = [], isLoading } = useTasks();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
  const [focusTask, setFocusTask] = useState<Task | null>(null);

  const handleStatusChange = async (id: string, status: 'todo' | 'in_progress' | 'done') => {
    playSound(status === 'done' ? 'success' : 'click');
    try {
      await updateTaskMutation.mutateAsync({
        id,
        data: { status },
      });
      if (status === 'done' && focusTask?.id === id) {
        setFocusTask(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    playSound('off');
    try {
      await deleteTaskMutation.mutateAsync(id);
      if (focusTask?.id === id) {
        setFocusTask(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getPriorityColor = (prio: string) => {
    switch (prio.toLowerCase()) {
      case 'low':
        return 'text-emerald-400/80 bg-emerald-500/5 border-emerald-500/10';
      case 'medium':
        return 'text-amber-400/80 bg-amber-500/5 border-amber-500/10';
      case 'high':
        return 'text-rose-400/80 bg-rose-500/5 border-rose-500/10';
      default:
        return 'text-gray-400 bg-white/5 border-white/10';
    }
  };

  const activeCount = tasks.filter((t) => t.status !== 'done').length;
  const completedCount = tasks.filter((t) => t.status === 'done').length;
  const totalXpEarned = tasks
    .filter((t) => t.status === 'done')
    .reduce((sum, t) => sum + t.xpReward, 0);

  return (
    <div className="h-full flex bg-transparent overflow-hidden text-white font-sans">
      <div className="flex-1 h-full overflow-y-auto scrollbar-hide p-8 pb-32">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 opacity-80 mb-3">
              <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-forge-cyan/80">
                Action Vector
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Action Chamber
            </h1>
            <p className="text-xs text-gray-500 mt-2 font-light max-w-xl leading-relaxed italic">
              "He who is brave and disciplined is free to act." — Seneca
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* View Mode toggles */}
            <div className="flex items-center bg-white/5 rounded-xl border border-white/5 p-1">
              <button
                onClick={() => {
                  playSound('click');
                  setViewMode('board');
                }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all',
                  viewMode === 'board'
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-gray-500 hover:text-gray-300'
                )}
              >
                Board
              </button>
              <button
                onClick={() => {
                  playSound('click');
                  setViewMode('list');
                }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all',
                  viewMode === 'list'
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-gray-500 hover:text-gray-300'
                )}
              >
                List
              </button>
            </div>

            <button
              onClick={() => {
                playSound('click');
                setShowCreateModal(true);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.1)] group text-xs uppercase tracking-wider font-mono cursor-pointer"
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
              Forge Action
            </button>
          </div>
        </header>

        {/* Focus Mode Chamber */}
        {focusTask && (
          <FocusChamber
            task={focusTask}
            getPriorityColor={getPriorityColor}
            onClear={() => handleStatusChange(focusTask.id, 'done')}
            onLeave={() => {
              playSound('click');
              setFocusTask(null);
            }}
          />
        )}

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 relative z-10">
          {[
            { label: 'Active Tasks', value: activeCount, icon: Target, desc: 'Remaining action vectors' },
            { label: 'Actions Cleared', value: completedCount, icon: Flame, desc: 'Total successful executions' },
            { label: 'Experience Accrued', value: `+${totalXpEarned} XP`, icon: TrendingUp, desc: 'XP gained from clearing tasks' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">
                  {stat.label}
                </span>
                <span className="text-2xl font-bold text-white block">
                  {isLoading ? '...' : stat.value}
                </span>
                <span className="text-[10px] text-gray-600 block italic">
                  {stat.desc}
                </span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <stat.icon size={20} className="text-forge-cyan/70" />
              </div>
            </div>
          ))}
        </div>

        {/* Core Content */}
        <div className="relative z-10">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : tasks.length > 0 ? (
            viewMode === 'board' ? (
              <TaskBoard
                tasks={tasks}
                getPriorityColor={getPriorityColor}
                onFocus={(task) => {
                  playSound('on');
                  setFocusTask(task);
                }}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                onOpenCreate={() => {
                  playSound('click');
                  setShowCreateModal(true);
                }}
              />
            ) : (
              <TaskList
                tasks={tasks}
                getPriorityColor={getPriorityColor}
                onFocus={(task) => {
                  playSound('on');
                  setFocusTask(task);
                }}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                playSound={playSound}
              />
            )
          ) : (
            // Empty state
            <div className="flex flex-col items-center justify-center py-28 border border-dashed border-white/5 rounded-3xl bg-white/[0.01] backdrop-blur-md">
              <ListTodo size={48} className="text-white/20 mb-4 animate-pulse" />
              <h3 className="text-lg font-display font-semibold text-white mb-2">Chamber of Actions is Silent</h3>
              <p className="text-xs text-gray-500 max-w-sm text-center leading-relaxed mb-6 font-light">
                Discipline is built on issuing and completing quiet, purposeful actions. Establish your first standalone action item above.
              </p>
              <button
                onClick={() => {
                  playSound('click');
                  setShowCreateModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-forge-cyan/20 bg-forge-cyan/5 text-forge-cyan hover:bg-forge-cyan/10 transition-all text-xs font-mono font-semibold tracking-wider uppercase"
              >
                Forge Action
              </button>
            </div>
          )}
        </div>
      </div>

      <CreateTaskModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
};
