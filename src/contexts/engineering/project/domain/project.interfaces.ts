export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stars: number;
  language: string | null;
  updated_at: string;
}

export interface GithubContributor {
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
}

export interface GithubContributionStats {
  totalContributions: number;
  weeks: {
    contributionDays: {
      contributionCount: number;
      date: string;
      color: string;
    }[];
  }[];
}

export interface GithubRepoDetails {
  stars: number;
  forks: number;
  issues: number;
  language: string | null;
  languages: Record<string, number>;
  commitActivity: { date: string; count: number }[]; // For Heatmap
  recentCommits: GithubCommitActivity[]; // For Activity Feed
  contributors: GithubContributor[];
  updatedAt: Date;
  description: string | null;
  readme: string | null;
  issuesList: GithubIssue[];
  pullRequests: GithubPullRequest[];
}

export interface GithubIssue {
  id: number;
  number: number;
  title: string;
  state: string;
  html_url: string;
  labels: { name: string; color: string }[];
  assignee: { login: string; avatar_url: string } | null;
  created_at: string;
}

export interface GithubPullRequest {
  id: number;
  number: number;
  title: string;
  state: string;
  html_url: string;
  user: { login: string; avatar_url: string };
  created_at: string;
}

export interface GithubCommitActivity {
  date?: string;
  message: string;
  author?: string;
  url: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
}

export interface ProjectTaskBoard {
  todo: ProjectTask[];
  inProgress: ProjectTask[];
  done: ProjectTask[];
}

export interface ProjectLink {
  title: string;
  url: string;
  icon?: 'github' | 'figma' | 'doc' | 'link';
}

export interface ProjectLog {
  id?: string;
  date: Date;
  type: 'update' | 'alert' | 'info';
  content: string;
}

export interface ProjectMetadata {
  technologies?: string[];
  currentMilestone?: {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    status: 'pending' | 'in_progress' | 'completed';
    progress: number; // Restored for frontend compatibility
  };
  dueDate?: string;
  team?: {
    id: string;
    name: string;
    avatar?: string; // Renamed from avatarUrl to match frontend
  }[];
  lead?: {
    id: string;
    name: string;
    avatar?: string; // Renamed from avatarUrl to match frontend
  };
  [key: string]: unknown; // Allow extension while strictly typing known fields
}
