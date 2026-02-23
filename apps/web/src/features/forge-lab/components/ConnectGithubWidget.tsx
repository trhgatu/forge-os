import { Github, Loader2, AlertCircle } from "lucide-react";
import React, { useState } from "react";


import { GlassCard } from "@/shared/components/ui/GlassCard";
import { SYSTEM_CONFIG } from "@/shared/config/system.config";

import { forgeApi } from "../api";

interface ConnectGithubProps {
  onConnected: (username: string) => void;
}

export const ConnectGithubWidget: React.FC<ConnectGithubProps> = ({ onConnected }) => {
  const [username, setUsername] = useState(SYSTEM_CONFIG.identity.githubUsername || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) return;
    setLoading(true);
    setError(null);
    try {
      await forgeApi.connectAccount({
        provider: "github",
        identifier: trimmedUsername,
      });
      onConnected(trimmedUsername);
    } catch (err) {
      console.error(err);
      setError("Failed to connect GitHub. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="flex flex-col items-center justify-center p-8 space-y-4 border-dashed border-2 border-white/10 bg-white/[0.02]">
      <div className="p-4 rounded-full bg-white/5 mb-2">
        <Github size={32} className="text-white" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold text-white">Connect GitHub</h3>
        <p className="text-sm text-gray-400 max-w-xs mx-auto mt-1">
          Link your GitHub to visualize contribution graph and repo stats.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-3">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub Username (e.g. thuyencode)"
          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all text-sm"
        />

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-2 rounded-lg">
            <AlertCircle size={12} />
            {error}
          </div>
        )}

        <button
          onClick={handleConnect}
          disabled={loading || !username}
          className="w-full bg-white text-black font-bold rounded-xl py-3 text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Connecting...
            </>
          ) : (
            <>Connect Account</>
          )}
        </button>
      </div>
    </GlassCard>
  );
};
