import {
  ProjectLink,
  ProjectTaskBoard,
  GithubRepoDetails,
  ProjectLog,
  ProjectMetadata,
} from './project.interfaces';
import { ProjectId } from './value-objects/project-id.vo';

interface ProjectProps {
  title: string;
  description: string;
  status: string;
  tags: string[];
  isPinned: boolean;
  githubStats: Partial<GithubRepoDetails>;
  metadata: ProjectMetadata;
  progress: number;
  taskBoard: ProjectTaskBoard;
  links: ProjectLink[];
  logs: ProjectLog[];
  createdAt: Date;
  updatedAt: Date;
}

export class Project {
  private constructor(
    public readonly id: ProjectId,
    private props: ProjectProps,
    private isDeleted = false,
    private deletedAt?: Date,
  ) {}

  static create(
    props: Omit<
      ProjectProps,
      | 'createdAt'
      | 'updatedAt'
      | 'progress'
      | 'taskBoard'
      | 'links'
      | 'logs'
      | 'githubStats'
      | 'metadata'
      | 'status'
      | 'tags'
      | 'isPinned'
    > & {
      githubStats?: Partial<GithubRepoDetails>;
      metadata?: ProjectMetadata;
      status?: string;
      tags?: string[];
      isPinned?: boolean;
    },
    id: ProjectId,
  ): Project {
    const now = new Date();
    const project = new Project(id, {
      ...props,
      status: props.status ?? 'active',
      tags: props.tags ?? [],
      isPinned: props.isPinned ?? false,
      progress: 0,
      taskBoard: { todo: [], inProgress: [], done: [] },
      links: [],
      logs: [],
      githubStats: props.githubStats ?? {},
      metadata: props.metadata ?? {},
      createdAt: now,
      updatedAt: now,
    });

    return project;
  }

  static createFromPersistence(
    data: ProjectProps & {
      id: string;
      isDeleted?: boolean;
      deletedAt?: Date;
    },
  ): Project {
    return new Project(
      ProjectId.create(data.id),
      { ...data },
      data.isDeleted ?? false,
      data.deletedAt,
    );
  }

  updateInfo(
    props: Partial<Omit<ProjectProps, 'createdAt' | 'updatedAt' | 'logs'>>,
  ): void {
    if (props.title !== undefined) this.props.title = props.title;
    if (props.description !== undefined)
      this.props.description = props.description;
    if (props.status !== undefined) this.props.status = props.status;
    if (props.tags !== undefined) this.props.tags = props.tags;
    if (props.isPinned !== undefined) this.props.isPinned = props.isPinned;
    if (props.progress !== undefined) this.props.progress = props.progress;
    if (props.taskBoard !== undefined) this.props.taskBoard = props.taskBoard;
    if (props.links !== undefined) this.props.links = props.links;
    if (props.githubStats !== undefined)
      this.props.githubStats = props.githubStats;
    if (props.metadata !== undefined) this.props.metadata = props.metadata;

    this.props.updatedAt = new Date();
  }

  addLog(log: ProjectLog): void {
    this.props.logs.push(log);
    this.props.updatedAt = new Date();
  }

  delete(): void {
    if (this.isDeleted) return;
    this.isDeleted = true;
    this.deletedAt = new Date();
    this.props.updatedAt = new Date();
  }

  restore(): void {
    if (!this.isDeleted) return;
    this.isDeleted = false;
    this.deletedAt = undefined;
    this.props.updatedAt = new Date();
  }

  // ============
  //   GETTERS
  // ============

  get title() {
    return this.props.title;
  }
  get description() {
    return this.props.description;
  }
  get status() {
    return this.props.status;
  }
  get tags() {
    return this.props.tags;
  }
  get isPinned() {
    return this.props.isPinned;
  }
  get githubStats() {
    return this.props.githubStats;
  }
  get metadata() {
    return this.props.metadata;
  }
  get progress() {
    return this.props.progress;
  }
  get taskBoard() {
    return this.props.taskBoard;
  }
  get links() {
    return this.props.links;
  }
  get logs() {
    return this.props.logs;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  get isProjectDeleted() {
    return this.isDeleted;
  }
  get deletedDate() {
    return this.deletedAt;
  }

  // ============
  //   SERIALIZATION
  // ============

  toPersistence() {
    return {
      id: this.id.toString(),
      title: this.props.title,
      description: this.props.description,
      status: this.props.status,
      tags: this.props.tags,
      isPinned: this.props.isPinned,
      githubStats: this.props.githubStats,
      metadata: this.props.metadata,
      progress: this.props.progress,
      taskBoard: this.props.taskBoard,
      links: this.props.links,
      logs: this.props.logs,
      createdAt: new Date(this.props.createdAt),
      updatedAt: new Date(this.props.updatedAt),
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      title: this.props.title,
      description: this.props.description,
      status: this.props.status,
      tags: this.props.tags,
      isPinned: this.props.isPinned,
      githubStats: this.props.githubStats,
      metadata: this.props.metadata,
      progress: this.props.progress,
      taskBoard: this.props.taskBoard,
      links: this.props.links,
      logs: this.props.logs,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      isDeleted: this.isDeleted,
      deletedAt: this.deletedAt,
    };
  }
}
