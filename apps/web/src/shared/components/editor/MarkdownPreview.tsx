"use client";

export function MarkdownPreview({ content }: { content: string }) {
  const parseInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**"))
        return (
          <strong key={i} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      if (part.startsWith("*"))
        return (
          <em key={i} className="text-gray-300">
            {part.slice(1, -1)}
          </em>
        );
      if (part.startsWith("`"))
        return (
          <code
            key={i}
            className="bg-white/10 px-1.5 py-0.5 rounded text-forge-cyan font-mono text-sm border border-white/5"
          >
            {part.slice(1, -1)}
          </code>
        );
      return part;
    });
  };

  return (
    <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-lg selection:bg-forge-accent/30 selection:text-white">
      {content.split("\n").map((line, idx) => {
        const t = line.trim();

        if (t.startsWith("# "))
          return (
            <h1
              key={idx}
              className="mt-8 mb-6 text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 drop-shadow-sm"
            >
              {parseInline(t.slice(2))}
            </h1>
          );

        if (t.startsWith("## "))
          return (
            <h2
              key={idx}
              className="mt-8 mb-4 text-2xl font-display font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-forge-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              {parseInline(t.slice(3))}
            </h2>
          );

        if (t.startsWith("### "))
          return (
            <h3
              key={idx}
              className="mt-6 mb-3 text-xl font-display font-semibold text-forge-cyan/90 uppercase tracking-wide opacity-90"
            >
              {parseInline(t.slice(4))}
            </h3>
          );

        if (t.startsWith("> "))
          return (
            <div
              key={idx}
              className="my-6 relative pl-6 py-4 pr-6 rounded-r-xl bg-gradient-to-r from-white/5 to-transparent border-l-4 border-forge-accent/50 backdrop-blur-sm group hover:bg-white/[0.07] transition-colors"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-forge-accent/5 blur-xl -z-10" />
              <p className="italic text-gray-300 font-serif text-xl leading-relaxed">
                &quot;{parseInline(t.slice(2))}&quot;
              </p>
            </div>
          );

        if (t.startsWith("- "))
          return (
            <div
              key={idx}
              className="flex gap-4 ml-1 my-2 group hover:translate-x-1 transition-transform duration-300"
            >
              <span className="text-forge-cyan mt-2 shrink-0 opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.6)] rounded-full transition-all">
                ●
              </span>
              <p className="flex-1 text-gray-300 group-hover:text-gray-200 transition-colors">
                {parseInline(t.slice(2))}
              </p>
            </div>
          );

        // Horizontal Rule (---)
        if (t === "---")
          return (
            <div
              key={idx}
              className="my-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          );

        if (t === "") return <div key={idx} className="h-2" />;

        return (
          <p key={idx} className="mb-2 text-gray-300/90 leading-relaxed font-light">
            {parseInline(line)}
          </p>
        );
      })}
    </div>
  );
}
