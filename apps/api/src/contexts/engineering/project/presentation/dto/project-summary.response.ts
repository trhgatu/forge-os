export interface ProjectSummaryResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
  isPinned: boolean;
  progress: number;
  metadata: Record<string, unknown>;
  links: Array<{
    title: string;
    url: string;
    icon: 'github' | 'link';
  }>;
  githubStats: {
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
