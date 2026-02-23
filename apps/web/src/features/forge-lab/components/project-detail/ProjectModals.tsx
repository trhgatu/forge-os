import { X, AlertTriangle, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";

import { GlassCard } from "@/shared/components/ui/GlassCard";
import { Switch } from "@/shared/components/ui/Switch";

import type { Project } from "../../types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

interface CreateProjectModalProps extends ModalProps {
  onCreate: (data: { title: string; description: string }) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  isLoading,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setTitle("");
        setDescription("");
        setError("");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    onCreate({ title, description });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg mx-4">
        <GlassCard className="bg-[#0c0c0e]/95 border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">New Project</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError("");
                }}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-forge-cyan/50 focus:ring-1 focus:ring-forge-cyan/50 transition-all"
                placeholder="e.g. Neural Core Engine"
                autoFocus
              />
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-forge-cyan/50 focus:ring-1 focus:ring-forge-cyan/50 transition-all resize-none"
                placeholder="What is this project about?"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 rounded-xl bg-forge-cyan/20 border border-forge-cyan/50 text-forge-cyan text-sm font-bold hover:bg-forge-cyan/30 transition-all flex items-center gap-2"
              >
                {isLoading && <Loader2 size={14} className="animate-spin" />}
                Create Project
              </button>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

interface EditProjectModalProps extends ModalProps {
  project: Project;
  onUpdate: (id: string, data: Partial<Project>) => void;
}

const StatusSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: "active" | "archived" | "draft" | "completed") => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: "active", label: "Active", color: "bg-green-500" },
    { value: "archived", label: "Archived", color: "bg-gray-500" },
    { value: "draft", label: "Draft", color: "bg-yellow-500" },
    { value: "completed", label: "Completed", color: "bg-blue-500" },
  ];

  const current = options.find((o) => o.value === value) || options[0];

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white flex items-center justify-between hover:border-white/20 transition-all"
      >
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${current.color}`} />
          {current.label}
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#18181b] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value as "active" | "archived" | "draft" | "completed");
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left"
              >
                <span className={`w-2 h-2 rounded-full ${opt.color}`} />
                {opt.label}
                {value === opt.value && <span className="ml-auto text-forge-cyan text-xs">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  isLoading,
  project,
}) => {
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    status: project.status,
    isPinned: project.isPinned,
  });

  const [error, setError] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormData({
        title: project.title,
        description: project.description,
        status: project.status,
        isPinned: project.isPinned,
      });
      setError("");
    }, 0);
    return () => clearTimeout(timer);
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    onUpdate(project.id, formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg mx-4">
        <GlassCard className="bg-[#0c0c0e]/95 border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Edit Project</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (error) setError("");
                }}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-fuchsia-400/50 focus:ring-1 focus:ring-fuchsia-400/50 transition-all"
              />
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-fuchsia-400/50 focus:ring-1 focus:ring-fuchsia-400/50 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="relative z-50">
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                  Status
                </label>
                <div className="relative">
                  <StatusSelect
                    value={formData.status}
                    onChange={(val) => setFormData({ ...formData, status: val })}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-end pb-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-sm text-gray-300 font-medium">Pin to Dashboard</span>
                  <Switch
                    checked={formData.isPinned || false}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPinned: checked })}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/50 text-fuchsia-400 text-sm font-bold hover:bg-fuchsia-500/30 transition-all flex items-center gap-2"
              >
                {isLoading && <Loader2 size={14} className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

interface DeleteConfirmModalProps extends ModalProps {
  projectTitle: string;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  projectTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-32 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm mx-4">
        <GlassCard className="bg-[#0c0c0e] border-red-500/30 shadow-2xl shadow-red-900/20">
          <div className="flex flex-col items-center text-center p-2">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Project?</h3>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold text-white">&quot;{projectTitle}&quot;</span>? This action
              cannot be undone.
            </p>

            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-medium text-gray-300 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-500/50 hover:bg-red-500/30 text-red-400 text-sm font-bold transition-all flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 size={14} className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
