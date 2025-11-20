export interface Project {
  id: string;
  title: string;
  status: "Draft" | "In Progress" | "Completed" | "Archived";
  progress: number;
  lastModified: string;
  tags: string[];
}
