import type { Memory } from "@/shared/types/memory";

export type MemoryAnalysis = NonNullable<Memory["analysis"]>;

export async function analyzeMemory(content: string): Promise<MemoryAnalysis> {
  await new Promise((resolve) => {
    setTimeout(resolve, 600);
  });

  const normalized = content.trim();
  const lengthScoreBase =
    normalized.length > 0 ? Math.min(10, Math.max(1, Math.floor(normalized.length / 50))) : 5;

  const sentimentScore = lengthScoreBase;

  return {
    coreMeaning: "This moment carries a quiet but important internal shift in you.",
    emotionalPattern: "You tend to reflect deeply when you step out of your usual flow.",
    timelineConnection:
      "Connect this with other moments of stillness or transition in your Forge Timeline.",
    sentimentScore,
  };
}
