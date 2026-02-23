export type IdeaMode = "CANVAS" | "LIST" | "GRAPH";

export interface IdeaConnection {
  id: string;
  fromId: string;
  toId: string;
  type: "related" | "parent" | "child" | "conflict";
  strength: number;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  color: string;
  tags: string[];
  energy: number;
  connections: string[];
  aiAnalysis?: {
    expansion: string;
    gaps: string[];
    nextSteps: string[];
  };
  dateCreated: Date;
}
