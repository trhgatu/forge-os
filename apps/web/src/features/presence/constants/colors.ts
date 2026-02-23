import type { ConnectionRole, EchoTypeVisitor } from "../types";

export const ECHO_COLORS: Record<EchoTypeVisitor, string> = {
  anonymous: "bg-blue-400/50 shadow-[0_0_10px_#60A5FA]",
  known: "bg-amber-400/50 shadow-[0_0_10px_#FBBF24]",
  connection: "bg-fuchsia-500/50 shadow-[0_0_15px_#D946EF]", // Base color, overridden by role
};

export const ROLE_COLORS: Record<ConnectionRole, string> = {
  Catalyst: "bg-orange-500 shadow-[0_0_15px_#F97316]",
  Ghost: "bg-slate-400 shadow-[0_0_15px_#94A3B8]",
  Mirror: "bg-cyan-400 shadow-[0_0_15px_#22D3EE]",
  Anchor: "bg-indigo-500 shadow-[0_0_15px_#6366F1]",
  Teacher: "bg-yellow-400 shadow-[0_0_15px_#FACC15]",
  "Past Love": "bg-rose-400 shadow-[0_0_15px_#FB7185]",
  Shadow: "bg-violet-600 shadow-[0_0_15px_#7C3AED]",
  Companion: "bg-emerald-400 shadow-[0_0_15px_#34D399]",
  Healer: "bg-teal-300 shadow-[0_0_15px_#5EEAD4]",
  Mystery: "bg-fuchsia-400 shadow-[0_0_15px_#E879F9]",
};
