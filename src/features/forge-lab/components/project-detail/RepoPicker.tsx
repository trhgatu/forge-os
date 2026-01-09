import React, { useEffect, useState } from "react";
import { GithubRepo } from "../../types";
import { forgeApi } from "../../api";
import { Search, Loader2, Github, X, Star, Calendar } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

interface RepoPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (repo: GithubRepo) => void;
  username?: string;
}

export const RepoPicker: React.FC<RepoPickerProps> = ({ isOpen, onClose, onSelect, username }) => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRepos = async () => {
      if (!username) return;
      setLoading(true);
      setError(null);
      try {
        const data = await forgeApi.getGithubRepos(username);
        if (isMounted) {
          setRepos(data);
        }
      } catch (err) {
        console.error("Failed to fetch repos", err);
        if (isMounted) {
          setError("Failed to load repositories.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (isOpen && username) {
      fetchRepos();
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, username]);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl mx-4">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-forge-cyan/20 to-purple-500/20 rounded-2xl blur-xl" />

        <GlassCard className="relative bg-[#0c0c0e]/95 border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
            <h2 className="text-lg font-display font-medium text-white flex items-center gap-2">
              <Github size={20} className="text-forge-cyan" />
              Select Repository
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-forge-cyan/50 focus:ring-1 focus:ring-forge-cyan/50 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500 gap-3">
                <Loader2 size={32} className="animate-spin text-forge-cyan" />
                <span className="text-xs">Fetching repositories...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 text-red-400 gap-2">
                <span className="text-sm">{error}</span>
                <button onClick={onClose} className="text-xs underline hover:text-red-300">
                  Close & Retry
                </button>
              </div>
            ) : filteredRepos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Github size={48} className="opacity-10 mb-4" />
                <span className="text-sm">No repositories found.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {filteredRepos.map((repo) => (
                  <button
                    key={repo.id}
                    onClick={() => onSelect(repo)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group text-left"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-200 group-hover:text-forge-cyan transition-colors truncate">
                          {repo.name}
                        </span>
                        {repo.language && (
                          <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400 border border-white/5">
                            {repo.language}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-[400px]">
                        {repo.description || "No description"}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-500 text-xs shrink-0 ml-4">
                      <div className="flex items-center gap-1" title="Stars">
                        <Star size={12} />
                        {repo.stars}
                      </div>
                      <div className="flex items-center gap-1" title="Updated">
                        <Calendar size={12} />
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
