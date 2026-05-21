import { X, AlertTriangle, Loader2, Github } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { GlassCard } from '@/shared/components/ui/GlassCard';
import { Switch } from '@/shared/components/ui/Switch';
import { cn } from '@/shared/lib/utils';

import { forgeApi } from '../../api';
import type { Project, GithubRepo } from '../../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

interface CreateProjectModalProps extends ModalProps {
  onCreate: (data: {
    title: string;
    description: string;
    linkedRepo?: GithubRepo | null;
    liveUrl?: string;
  }) => void;
  githubUsername?: string;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  isLoading,
  githubUsername,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [error, setError] = useState('');

  // GitHub integration states
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [repoDropdownOpen, setRepoDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setError('');
      setSelectedRepo(null);
      setRepoDropdownOpen(false);

      if (githubUsername) {
        setReposLoading(true);
        forgeApi
          .getGithubRepos(githubUsername)
          .then((data) => setRepos(data))
          .catch((err) => console.error('Failed to fetch user repos', err))
          .finally(() => setReposLoading(false));
      }
    }
  }, [isOpen, githubUsername]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    onCreate({ title, description, linkedRepo: selectedRepo, liveUrl });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg mx-4 my-8">
        <GlassCard className="bg-[#0c0c0e]/95 border-white/10 shadow-2xl relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">New Project</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* GitHub Repo Selector Dropdown */}
            {githubUsername && (
              <div className="relative">
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                  <span>Link GitHub Repository</span>
                  <span className="text-[10px] text-forge-cyan font-mono lowercase">@{githubUsername}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setRepoDropdownOpen(!repoDropdownOpen)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white flex items-center justify-between hover:border-white/20 transition-all text-left"
                >
                  {selectedRepo ? (
                    <span className="flex items-center gap-2 text-forge-cyan font-medium">
                      <Github size={14} />
                      {selectedRepo.name}
                    </span>
                  ) : (
                    <span className="text-gray-500 flex items-center gap-2">
                      <Github size={14} />
                      Select a repository... (Optional)
                    </span>
                  )}
                  <svg
                    className={cn('w-4 h-4 text-gray-500 transition-transform', repoDropdownOpen && 'rotate-180')}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {repoDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setRepoDropdownOpen(false)} />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#09090b] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 animate-in fade-in slide-in-from-top-1 duration-150">
                      {reposLoading ? (
                        <div className="p-3 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                          <Loader2 size={12} className="animate-spin text-forge-cyan" />
                          Loading repositories...
                        </div>
                      ) : repos.length === 0 ? (
                        <div className="p-3 text-center text-xs text-gray-500">
                          No repositories found.
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedRepo(null);
                              setRepoDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left border-b border-white/5"
                          >
                            Don't link a repository
                          </button>
                          {repos.map((repo) => (
                            <button
                              key={repo.id}
                              type="button"
                              onClick={() => {
                                setSelectedRepo(repo);
                                setRepoDropdownOpen(false);
                                if (!title) {
                                  // Capitalize repository name nicely as the proposed project title
                                  const formatted = repo.name
                                    .split(/[-_]/)
                                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                                    .join(' ');
                                  setTitle(formatted);
                                }
                                if (!description && repo.description) {
                                  setDescription(repo.description);
                                }
                              }}
                              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-b-0"
                            >
                              <div className="truncate pr-4">
                                <div className="font-medium text-gray-200 text-sm truncate">{repo.name}</div>
                                <div className="text-[10px] text-gray-500 truncate">{repo.description || 'No description'}</div>
                              </div>
                              <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400 font-mono shrink-0">
                                {repo.stars} ★
                              </span>
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError('');
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

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 512 512">
                  <path d="M256 48L496 464H16L256 48Z" />
                </svg>
                <span>Vercel / Live Deployment URL</span>
              </label>
              <input
                type="text"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-forge-cyan/50 focus:ring-1 focus:ring-forge-cyan/50 transition-all"
                placeholder="e.g. https://my-app.vercel.app"
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
  onUpdate: (
    id: string,
    data: Partial<Project> & { linkedRepo?: GithubRepo | null; liveUrl?: string },
  ) => void;
  githubUsername?: string;
}

const StatusSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: 'active' | 'archived' | 'draft' | 'completed') => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: 'active', label: 'Active', color: 'bg-green-500' },
    { value: 'archived', label: 'Archived', color: 'bg-gray-500' },
    { value: 'draft', label: 'Draft', color: 'bg-yellow-500' },
    { value: 'completed', label: 'Completed', color: 'bg-blue-500' },
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
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
                  onChange(opt.value as 'active' | 'archived' | 'draft' | 'completed');
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
  githubUsername,
}) => {
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    status: project.status,
    isPinned: project.isPinned,
  });
  const [liveUrl, setLiveUrl] = useState(project.metadata?.liveUrl || '');

  const [error, setError] = useState('');

  // GitHub integration states
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const [repoDropdownOpen, setRepoDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: project.title,
        description: project.description,
        status: project.status,
        isPinned: project.isPinned,
      });
      setLiveUrl(project.metadata?.liveUrl || '');
      setError('');
      setSelectedRepo(null);
      setRepoDropdownOpen(false);

      if (githubUsername) {
        setReposLoading(true);
        forgeApi
          .getGithubRepos(githubUsername)
          .then((data) => {
            setRepos(data);
            // Match existing github link
            const existingGithubLink = project.links?.find((l) => l.url.includes('github.com'));
            if (existingGithubLink) {
              const matched = data.find(
                (r) =>
                  r.html_url.toLowerCase().replace(/\.git$/, '') ===
                  existingGithubLink.url.toLowerCase().replace(/\.git$/, '')
              );
              if (matched) setSelectedRepo(matched);
            }
          })
          .catch((err) => console.error('Failed to fetch user repos', err))
          .finally(() => setReposLoading(false));
      }
    }
  }, [isOpen, project, githubUsername]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    onUpdate(project.id, { ...formData, linkedRepo: selectedRepo, liveUrl });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg mx-4 my-8">
        <GlassCard className="bg-[#0c0c0e]/95 border-white/10 shadow-2xl relative">
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
                  if (error) setError('');
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

            {/* GitHub Repo Selector Dropdown */}
            {githubUsername && (
              <div className="relative">
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider flex items-center justify-between">
                  <span>Linked GitHub Repository</span>
                  <span className="text-[10px] text-fuchsia-400 font-mono lowercase">@{githubUsername}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setRepoDropdownOpen(!repoDropdownOpen)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white flex items-center justify-between hover:border-white/20 transition-all text-left"
                >
                  {selectedRepo ? (
                    <span className="flex items-center gap-2 text-fuchsia-400 font-medium">
                      <Github size={14} />
                      {selectedRepo.name}
                    </span>
                  ) : (
                    <span className="text-gray-500 flex items-center gap-2">
                      <Github size={14} />
                      Select a repository to link...
                    </span>
                  )}
                  <svg
                    className={cn('w-4 h-4 text-gray-500 transition-transform', repoDropdownOpen && 'rotate-180')}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {repoDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setRepoDropdownOpen(false)} />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#09090b] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 animate-in fade-in slide-in-from-top-1 duration-150">
                      {reposLoading ? (
                        <div className="p-3 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                          <Loader2 size={12} className="animate-spin text-fuchsia-400" />
                          Loading repositories...
                        </div>
                      ) : repos.length === 0 ? (
                        <div className="p-3 text-center text-xs text-gray-500">
                          No repositories found.
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedRepo(null);
                              setRepoDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left border-b border-white/5"
                          >
                            Unlink Repository
                          </button>
                          {repos.map((repo) => (
                            <button
                              key={repo.id}
                              type="button"
                              onClick={() => {
                                setSelectedRepo(repo);
                                setRepoDropdownOpen(false);
                              }}
                              className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-b-0"
                            >
                              <div className="truncate pr-4">
                                <div className="font-medium text-gray-200 text-sm truncate">{repo.name}</div>
                                <div className="text-[10px] text-gray-500 truncate">{repo.description || 'No description'}</div>
                              </div>
                              <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400 font-mono shrink-0">
                                {repo.stars} ★
                              </span>
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="relative">
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

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 512 512">
                  <path d="M256 48L496 464H16L256 48Z" />
                </svg>
                <span>Vercel / Live Deployment URL</span>
              </label>
              <input
                type="text"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-fuchsia-400/50 focus:ring-1 focus:ring-fuchsia-400/50 transition-all"
                placeholder="e.g. https://my-app.vercel.app"
              />
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
              Are you sure you want to delete{' '}
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


