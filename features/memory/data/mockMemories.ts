import type { Memory } from "@/shared/types/memory";

export const MOCK_MEMORIES: Memory[] = [
  {
    id: "1",
    title: "The Summit at Dawn",
    description:
      "Reached the peak just as the sun broke the horizon. The physical exhaustion vanished instantly, replaced by a profound sense of smallness and connection. The world below looked like a circuit board.",
    date: new Date("2023-11-15"),
    type: "milestone",
    mood: "inspired",
    tags: ["Nature", "Achievement", "Perspective"],
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    reflectionDepth: 9,
    analysis: {
      coreMeaning: "Physical struggle often precedes spiritual clarity.",
      emotionalPattern: "Seeking elevation to find peace.",
      timelineConnection: "Connects to 'The Marathon' (2021).",
      sentimentScore: 9,
    },
  },
  {
    id: "2",
    title: "Deep Code Flow",
    description:
      "3 AM. The bug is fixed. The music is perfect. Flow state achieved. It felt like I was speaking directly to the machine. Silence in the room, loud in the mind.",
    date: new Date("2023-10-22"),
    type: "moment",
    mood: "focused",
    tags: ["Code", "Flow", "Night"],
    reflectionDepth: 7,
    analysis: {
      coreMeaning: "Creation is the ultimate form of communication.",
      emotionalPattern: "Solitude fuels your competence.",
      timelineConnection: "Echoes early coding days.",
      sentimentScore: 8,
    },
  },
  {
    id: "3",
    title: "Rainy Cafe Reflection",
    description:
      "Watching the rain hit the window. Realized I have been running too fast. Need to slow down. The coffee was warm, but my hands were cold.",
    date: new Date("2023-09-10"),
    type: "insight",
    mood: "calm",
    tags: ["Rest", "City", "Rain"],
    imageUrl:
      "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&q=80&w=800",
    reflectionDepth: 8,
  },
  {
    id: "4",
    title: "Startup Pitch",
    description:
      "The lights were too bright. My heart was racing. But when I started speaking, the fire took over.",
    date: new Date("2023-08-05"),
    type: "challenge",
    mood: "energetic",
    tags: ["Growth", "Fear", "Work"],
    reflectionDepth: 8,
  },
];
