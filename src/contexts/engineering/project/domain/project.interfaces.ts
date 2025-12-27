export interface GithubContributor {
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
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
