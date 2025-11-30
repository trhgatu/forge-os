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

export function JournalToolbar({
  mode,
  onMode,
  onAction,
}: {
  mode: "write" | "preview";
  onMode: (m: "write" | "preview") => void;
  onAction: (action: string) => void;
}) {
  return (
    <div
      className="
      flex items-center justify-between
      mb-4 pb-4
      border-b border-white/5
      sticky top-0
      bg-forge-bg/95 backdrop-blur-md
      z-20 transition-all
    "
    >
      {/* LEFT: Formatting Buttons */}
      <div className="flex items-center gap-1">
        <ToolbarButton title="Bold" onClick={() => onAction("bold")} icon={<Bold size={14} />} />
        <ToolbarButton
          title="Italic"
          onClick={() => onAction("italic")}
          icon={<Italic size={14} />}
        />

        <Divider />

        <ToolbarButton
          title="Heading 1"
          onClick={() => onAction("h1")}
          icon={<Heading1 size={14} />}
        />
        <ToolbarButton
          title="Heading 2"
          onClick={() => onAction("h2")}
          icon={<Heading2 size={14} />}
        />

        <Divider />

        <ToolbarButton title="List" onClick={() => onAction("list")} icon={<List size={14} />} />
        <ToolbarButton
          title="Quote"
          onClick={() => onAction("quote")}
          icon={<QuoteIcon size={14} />}
        />
        <ToolbarButton title="Code" onClick={() => onAction("code")} icon={<Code size={14} />} />
      </div>

      {/* RIGHT: Mode Switch */}
      <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/5">
        <ModeButton
          active={mode === "write"}
          onClick={() => onMode("write")}
          icon={<Edit3 size={12} />}
          label="Write"
        />
        <ModeButton
          active={mode === "preview"}
          onClick={() => onMode("preview")}
          icon={<Eye size={12} />}
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
        p-2 rounded
        hover:bg-white/10
        text-gray-400 hover:text-white
        transition-colors
      "
    >
      {icon}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-4 bg-white/10 mx-1" />;
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
        "px-3 py-1 rounded text-xs font-medium flex items-center gap-2 transition-all",
        active ? "bg-white/10 text-white shadow-sm" : "text-gray-500 hover:text-gray-300"
      )}
    >
      {icon} {label}
    </button>
  );
}
