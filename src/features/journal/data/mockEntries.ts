import { JournalEntry } from "@/shared/types/journal";

export const MOCK_ENTRIES: JournalEntry[] = [
  {
    id: "1",
    title: "The Architecture of Silence",
    content:
      "Today I realized that noise isn't just sound. It's visual clutter, it's unread notifications, it's the constant hum of expectation.\n\n> True insight often requires the removal of external stimuli.\n\nI spent an hour just staring at the wall, letting the mental sediment settle. In that silence, I found the solution to the navigation problem I've been stuck on for days. \n\n**Key Realizations:**\n- It wasn't about adding more\n- It was about removing the friction\n- Silence is an active state, not a passive one",
    date: new Date(),
    mood: "calm",
    tags: ["Design", "Philosophy", "Silence"],
    analysis: {
      sentimentScore: 8,
      keywords: ["Minimalism", "Clarity", "Focus"],
      summary: "True insight often requires the removal of external stimuli.",
      suggestedAction: "Schedule a 30-minute deep focus block tomorrow.",
    },
  },
  {
    id: "2",
    title: "System Entropy",
    content:
      "Everything tends towards disorder. My desk, my code, my schedule. Keeping order requires energy injection. I'm feeling tired today, like my personal entropy is winning. Need to re-calibrate my habits.",
    date: new Date(Date.now() - 86400000),
    mood: "tired",
    tags: ["Systems", "Habits"],
    analysis: {
      sentimentScore: 3,
      keywords: ["Entropy", "Fatigue", "Disorder"],
      summary: "Disorder is natural; resilience is the act of constant realignment.",
      suggestedAction: "Rest tonight. Do not force organization when energy is low.",
    },
  },
  {
    id: "3",
    title: "Project Nebula Ideas",
    content:
      "What if the interface itself was alive? Not just responding to clicks, but anticipating intent.\n\nWe could use the cursor velocity to predict the next action...",
    date: new Date(Date.now() - 172800000),
    mood: "inspired",
    tags: ["Work", "Ideas"],
  },
];
