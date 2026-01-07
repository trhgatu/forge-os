export interface ProjectSummaryResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
  isPinned: boolean;
  progress: number;
  links: Array<{
    title: string;
    url: string;
    icon: "github" | "link";
  }>;
  stats: {
    stars: number;
    forks: number;
    issues: number;
    language: string;
  };
  createdAt: string;
  updatedAt: string;
  _links: {
    githubStats: string;
    readme: string;
    taskboard: string;
    logs: string;
  };
}

export interface GithubStatsResponse {
  languages: Record<string, number>;
  commitActivity: { week: string; commits: number }[];
  recentCommits: { date: string; message: string; author: string; url: string }[];
  contributors: { login: string; avatar_url: string; contributions: number }[];
  issuesList: Array<{
    id: number;
    number: number;
    title: string;
    state: string;
    html_url: string;
    labels: Array<{ name: string; color: string }>;
    assignee: { login: string; avatar_url: string } | null;
    created_at: string;
  }>;
  pullRequests: Array<{
    id: number;
    number: number;
    title: string;
    state: string;
    html_url: string;
    user: { login: string; avatar_url: string };
    created_at: string;
  }>;
}

export interface ReadmeResponse {
  content: string;
}

export interface TaskBoardResponse {
  todo: Array<{ id: string; title: string; priority: "low" | "medium" | "high" }>;
  inProgress: Array<{ id: string; title: string; priority: "low" | "medium" | "high" }>;
  done: Array<{ id: string; title: string; priority: "low" | "medium" | "high" }>;
}

export interface LogEntry {
  id: string;
  content: string;
  date: Date;
  type: string;
}

export interface PaginatedLogsResponse {
  data: LogEntry[];
  total: number;
  page: number;
  limit: number;
}
