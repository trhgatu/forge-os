import {
  GithubRepoDetails,
  ProjectLink,
  ProjectLog,
  ProjectTaskBoard,
} from '../../domain/project.interfaces';

export interface ProjectResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
  isPinned: boolean;
  githubStats: Partial<GithubRepoDetails>;
  metadata: Record<string, unknown>;
  progress: number;
  taskBoard: ProjectTaskBoard;
  links: ProjectLink[];
  logs: ProjectLog[];
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  deletedAt: string | null;

  // Frontend Compatibility Fields (mapped from metadata)
  technologies?: string[];
  currentMilestone?: {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    status: 'pending' | 'in_progress' | 'completed';
    progress: number;
  };
  dueDate?: string;
  team?: { id: string; name: string; avatar?: string }[];
  lead?: { id: string; name: string; avatar?: string };
}
