export type ForgeTab = "dashboard" | "projects" | "foundations" | "research";

// Stats cached from GitHub or Internal metrics
export interface HybridStats {
  stars?: number;
  forks?: number;
  issues?: number;
  language?: string;
  lastCommit?: Date;
  health?: number; // 0-100
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  updatedAt: Date;
  status: "active" | "archived" | "draft";
  tags?: string[];
  // Hybrid Data
  isPinned?: boolean;
  githubStats?: HybridStats;

  // Rich Data (Internal)
  progress?: number;
  team?: Array<{ name: string; avatar?: string }>;
  lead?: { name: string; avatar?: string };
  dueDate?: Date;
  stats?: {
    tasksTotal: number;
    tasksCompleted: number;
  };
  // Management Data
  technologies?: string[];
  currentMilestone?: { title: string; progress: number; dueDate: Date };
  links?: Array<{ title: string; url: string; icon?: "github" | "figma" | "doc" | "link" }>;
  logs?: Array<{
    id: string;
    content: string;
    date: Date;
    type: "update" | "milestone" | "issue" | "alert";
  }>;
  taskBoard?: {
    todo: Array<{ id: string; title: string; priority: "low" | "medium" | "high" }>;
    inProgress: Array<{ id: string; title: string; priority: "low" | "medium" | "high" }>;
    done: Array<{ id: string; title: string; priority: "low" | "medium" | "high" }>;
  };
}

export interface Foundation {
  id: string;
  title: string;
  description?: string;
  type: string;
  updatedAt: Date;
  // Hybrid Data
  isPinned?: boolean;
  githubStats?: HybridStats;

  // Rich Data
  status?: "stable" | "beta" | "deprecated";
  version?: string;
  author?: { name: string; avatar?: string };
  contributors?: Array<{ name: string; avatar?: string }>;
  metrics?: {
    usageCount: number;
    impactScore: number;
    complexity: "low" | "medium" | "high";
  };
  connectedNodes?: Array<{ id: string; title: string; type: "project" | "concept" }>;
}

export interface ResearchTrail {
  id: string;
  title: string;
  nodes: number;
  updatedAt: Date;
}

export interface ForgeLabContextType {
  activeTab: ForgeTab;
  setActiveTab: (tab: ForgeTab) => void;
  projects: Project[];
  foundations: Foundation[];
  trails: ResearchTrail[];
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
}
