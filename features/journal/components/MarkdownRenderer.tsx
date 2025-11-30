"use client";

export function MarkdownRenderer({ content }: { content: string }) {
  const parseInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
      if (part.startsWith("`"))
        return (
          <code key={i} className="bg-white/10 px-1 rounded text-forge-cyan">
            {part.slice(1, -1)}
          </code>
        );
      return part;
    });
  };

  return (
    <div className="space-y-3 text-gray-300 leading-relaxed">
      {content.split("\n").map((line, idx) => {
        const t = line.trim();

        if (t.startsWith("# ")) return <h1 key={idx}>{parseInline(t.slice(2))}</h1>;
        if (t.startsWith("## ")) return <h2 key={idx}>{parseInline(t.slice(3))}</h2>;
        if (t.startsWith("### ")) return <h3 key={idx}>{parseInline(t.slice(4))}</h3>;

        if (t.startsWith("> "))
          return (
            <blockquote key={idx} className="border-l-4 pl-4 italic">
              {parseInline(t.slice(2))}
            </blockquote>
          );

        if (t.startsWith("- "))
          return (
            <ul key={idx} className="ml-5 list-disc">
              <li>{parseInline(t.slice(2))}</li>
            </ul>
          );

        return <p key={idx}>{parseInline(line)}</p>;
      })}
    </div>
  );
}
