"use client";

import { useRef, useState } from "react";

import { cn } from "@/shared/lib/utils";

import { EditorToolbar } from "./EditorToolbar";
import { MarkdownPreview } from "./MarkdownPreview";

interface ForgeEditorProps {
  content: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string; // Additional classes for the container
}

export function ForgeEditor({
  content,
  onChange,
  placeholder = "Start forging your thoughts...",
  className,
}: ForgeEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Insert markdown format
  const insert = (prefix: string, suffix = "") => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;

    const start = el.selectionStart;
    const end = el.selectionEnd;

    const before = content.slice(0, start);
    const selected = content.slice(start, end);
    const after = content.slice(end);

    const newValue = before + prefix + selected + suffix + after;
    onChange(newValue);

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, end + prefix.length);
    });
  };

  const onToolbar = (action: string) => {
    switch (action) {
      case "bold":
        insert("**", "**");
        break;
      case "italic":
        insert("*", "*");
        break;
      case "h1":
        insert("# ");
        break;
      case "h2":
        insert("## ");
        break;
      case "list":
        insert("- ");
        break;
      case "quote":
        insert("> ");
        break;
      case "code":
        insert("`", "`");
        break;
    }
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Toolbar */}
      <EditorToolbar mode={mode} onMode={setMode} onAction={onToolbar} />

      {/* Content */}
      <div className="flex-1 overflow-visible relative min-h-0 flex flex-col">
        {/* min-h-0 is crucial for flex children scrolling */}
        {mode === "write" ? (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            spellCheck={false}
            className="flex-1 w-full bg-transparent border-none text-lg leading-relaxed text-gray-300 placeholder-white/10 focus:ring-0 px-0 resize-none font-sans scrollbar-thin outline-none"
          />
        ) : (
          <div className="flex-1 overflow-y-auto scrollbar-thin animate-in fade-in duration-300">
            <MarkdownPreview content={content} />
          </div>
        )}
      </div>
    </div>
  );
}
