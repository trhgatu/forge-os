import React, { useEffect } from "react";
import { X, Trophy, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface LevelUpModalProps {
  isOpen: boolean;
  newLevel: number;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ isOpen, newLevel, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger confetti
      const duration = 3000;
      const end = Date.now() + duration;

      let animationFrameId: number;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#22d3ee", "#a855f7", "#ffffff"],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#22d3ee", "#a855f7", "#ffffff"],
        });

        if (Date.now() < end) {
          animationFrameId = requestAnimationFrame(frame);
        }
      };

      frame();

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#09090b]/90 border border-forge-cyan/30 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.2)] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-forge-cyan/20 blur-3xl pointer-events-none" />

        <div className="relative p-8 text-center flex flex-col items-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-forge-cyan/30 blur-2xl rounded-full" />
            <Trophy size={64} className="text-forge-cyan relative z-10 animate-bounce" />
          </div>

          <h2 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">
            Level Up!
          </h2>

          <div className="text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-forge-cyan to-fuchsia-500 mb-4 font-mono">
            {newLevel}
          </div>

          <p className="text-gray-400 mb-8 max-w-xs mx-auto">
            Congratulations! You&apos;ve reached a new level of mastery in the Forge.
          </p>

          <button
            onClick={onClose}
            className="group relative px-8 py-3 bg-forge-cyan/10 hover:bg-forge-cyan/20 text-forge-cyan border border-forge-cyan/30 rounded-xl font-medium transition-all w-full flex items-center justify-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Sparkles size={18} />
            <span>Claim Rewards</span>
          </button>
        </div>
      </div>
    </div>
  );
};
