export type EchoTypeVisitor = "anonymous" | "known" | "connection";

export type ConnectionRole =
  | "Catalyst"
  | "Ghost"
  | "Mirror"
  | "Anchor"
  | "Teacher"
  | "Past Love"
  | "Shadow"
  | "Companion"
  | "Healer"
  | "Mystery";

export interface VisitorEcho {
  id: string;
  timestamp: Date;
  type: EchoTypeVisitor;
  connectionName?: string;
  connectionRole?: ConnectionRole;
  distance: number;
  angle: number;
  seasonContext: string;
  duration: number;
  pageVisited: string;
}
