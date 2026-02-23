import type { JournalAnalysis } from "@/shared/types/journal";

export async function analyzeJournalEntry(content: string): Promise<JournalAnalysis> {
  void content;

  await new Promise((r) => setTimeout(r, 600));

  return {
    sentimentScore: Math.floor(Math.random() * 10),
    keywords: ["Focus", "Clarity"],
    summary: "A moment of clarity emerges from reflection.",
    suggestedAction: "Write a follow-up tomorrow.",
  };
}
