"use client";

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  Quote as QuoteIcon,
  Code,
  Eye,
  Edit3,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";

export function EditorToolbar({
  mode,
  onMode,
  onAction,
}: {
  mode: "write" | "preview";
  onMode: (m: "write" | "preview") => void;
  onAction: (action: string) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-6 pb-2 sticky top-0 z-20">
      {/* LEFT: Formatting Buttons (Floating Glass Pill) */}
      <div className="flex items-center gap-1 p-1.5 rounded-xl bg-[#0F0F12]/80 border border-white/5 backdrop-blur-xl shadow-lg ring-1 ring-white/5">
        <ToolbarButton title="Bold" onClick={() => onAction("bold")} icon={<Bold size={15} />} />
        <ToolbarButton
          title="Italic"
          onClick={() => onAction("italic")}
          icon={<Italic size={15} />}
        />

        <Divider />

        <ToolbarButton
          title="Heading 1"
          onClick={() => onAction("h1")}
          icon={<Heading1 size={15} />}
        />
        <ToolbarButton
          title="Heading 2"
          onClick={() => onAction("h2")}
          icon={<Heading2 size={15} />}
        />

        <Divider />

        <ToolbarButton title="List" onClick={() => onAction("list")} icon={<List size={15} />} />
        <ToolbarButton
          title="Quote"
          onClick={() => onAction("quote")}
          icon={<QuoteIcon size={15} />}
        />
        <ToolbarButton title="Code" onClick={() => onAction("code")} icon={<Code size={15} />} />
      </div>

      {/* RIGHT: Mode Switch (Floating Toggle) */}
      <div className="flex items-center p-1 rounded-xl bg-[#0F0F12]/80 border border-white/5 backdrop-blur-xl shadow-lg ring-1 ring-white/5">
        <ModeButton
          active={mode === "write"}
          onClick={() => onMode("write")}
          icon={<Edit3 size={13} />}
          label="Write"
        />
        <ModeButton
          active={mode === "preview"}
          onClick={() => onMode("preview")}
          icon={<Eye size={13} />}
          label="Preview"
        />
      </div>
    </div>
  );
}

/* --- SUB COMPONENTS --- */

function ToolbarButton({
  icon,
  onClick,
  title,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="
        p-2 rounded-lg
        text-gray-400
        hover:text-white hover:bg-white/10
        active:scale-95
        transition-all duration-200
        group relative
      "
    >
      {icon}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-4 bg-white/10 mx-2" />;
}

function ModeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300",
        active
          ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)] ring-1 ring-white/10 scale-100"
          : "text-gray-500 hover:text-gray-300 hover:bg-white/5 scale-95"
      )}
    >
      {icon} {label}
    </button>
  );
}
