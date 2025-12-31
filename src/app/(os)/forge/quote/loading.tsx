export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#050505] text-white">
      <div className="relative flex items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute inset-0 h-32 w-32 animate-pulse rounded-full bg-forge-cyan/20 blur-3xl" />

        {/* Spinning Rings */}
        <div className="h-16 w-16 animate-spin rounded-full border-2 border-white/10 border-t-white/80" />
        <div className="absolute h-24 w-24 animate-[spin_3s_linear_infinite_reverse] rounded-full border border-white/5 border-b-white/20" />

        {/* Core */}
        <div className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_10px_white]" />
      </div>

      <p className="mt-8 animate-pulse font-mono text-xs uppercase tracking-[0.3em] text-white/40">
        Accessing Athenaeum...
      </p>
    </div>
  );
}
