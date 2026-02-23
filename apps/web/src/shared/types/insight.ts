import type { MoodType } from "./journal";

export interface InsightData {
  quote: string;
  author: string;
  theme: string;
}
export interface TopicCluster {
  id: string;
  name: string;
  size: number;
  relatedTopics: string[];
  x: number;
  y: number;
}

export interface Pattern {
  id: string;
  type: "behavior" | "emotional" | "cognitive";
  title: string;
  description: string;
  confidence: number;
  impact: "positive" | "negative" | "neutral";
}

export interface LifeArc {
  currentPhase: string;
  description: string;
  progress: number;
  nextPhasePrediction: string;
}

export interface GlobalAnalysis {
  weeklySummary: string;
  emotionalCycle: {
    date: string;
    mood: MoodType;
    value: number;
    event?: string;
  }[];
  topics: TopicCluster[];
  patterns: Pattern[];
  lifeArc: LifeArc;
  predictions: {
    mood: string;
    energy: string;
    suggestion: string;
  };
}
