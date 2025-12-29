import React, { useState, useEffect } from "react";
import { X, AlertTriangle, Loader2 } from "lucide-react";
import { GlassCard } from "@/shared/ui/GlassCard";
import { Project } from "../types";

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
                onChange={(e) => setTitle(e.target.value)}
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

  useEffect(() => {
    // eslint-disable-next-line
    setFormData({
      title: project.title,
      description: project.description,
      status: project.status,
      isPinned: project.isPinned,
    });
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-fuchsia-400/50 focus:ring-1 focus:ring-fuchsia-400/50 transition-all"
              />
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "active" | "archived" | "draft" | "completed",
                    })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-fuchsia-400/50 focus:ring-1 focus:ring-fuchsia-400/50 transition-all"
                >
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex items-end mb-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                    className="w-5 h-5 rounded border border-white/20 bg-black/20 checked:bg-forge-cyan checked:border-forge-cyan transition-colors"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    Pin to Dashboard
                  </span>
                </label>
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
