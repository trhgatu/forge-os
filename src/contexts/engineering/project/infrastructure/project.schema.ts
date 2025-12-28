import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProjectTask } from '../domain/project.interfaces';

export type ProjectDocument = Project & Document;

class HybridStats {
  @Prop()
  stars?: number;

  @Prop()
  forks?: number;

  @Prop()
  issues?: number;

  @Prop()
  language?: string;

  @Prop({ type: Object })
  languages?: Record<string, number>;

  @Prop({ type: [Object] })
  commitActivity?: { date: string; count: number }[];

  @Prop({ type: [Object] })
  recentCommits?: {
    date: Date;
    message: string;
    author: string;
    url: string;
  }[];

  @Prop({ type: [Object] })
  contributors?: {
    login: string;
    avatar_url: string;
    contributions: number;
    html_url: string;
  }[];

  @Prop()
  lastCommit?: Date;

  @Prop()
  health?: number;

  @Prop()
  readme?: string;

  @Prop()
  updatedAt?: Date;

  @Prop({ type: [Object] })
  issuesList?: {
    id: number;
    number: number;
    title: string;
    state: string;
    html_url: string;
    labels: { name: string; color: string }[];
    assignee: { login: string; avatar_url: string } | null;
    created_at: string;
  }[];

  @Prop({ type: [Object] })
  pullRequests?: {
    id: number;
    number: number;
    title: string;
    state: string;
    html_url: string;
    user: { login: string; avatar_url: string };
    created_at: string;
  }[];
}

@Schema()
export class ProjectLink {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  url!: string;

  @Prop({ enum: ['github', 'figma', 'doc', 'link'] })
  icon?: string;
}
export const ProjectLinkSchema = SchemaFactory.createForClass(ProjectLink);

@Schema()
export class ProjectLog {
  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true, enum: ['update', 'alert', 'info'] })
  type!: string;

  @Prop({ required: true })
  content!: string;
}
export const ProjectLogSchema = SchemaFactory.createForClass(ProjectLog);

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description!: string;

  @Prop({ default: 'active', enum: ['active', 'archived', 'draft'] })
  status!: string;

  @Prop([String])
  tags!: string[];

  // --- HYBRID DATA ---

  @Prop({ default: false })
  isPinned!: boolean;

  @Prop({ type: HybridStats })
  githubStats!: HybridStats;

  // Store raw GitHub response or other metadata
  @Prop({ type: Object })
  metadata!: Record<string, any>;

  // --- INTERNAL MANAGEMENT ---

  @Prop()
  progress!: number;

  @Prop({ type: Object })
  taskBoard!: {
    todo: ProjectTask[];
    inProgress: ProjectTask[];
    done: ProjectTask[];
  };

  @Prop({ type: [ProjectLinkSchema], default: [] })
  links!: ProjectLink[];

  @Prop({ type: [ProjectLogSchema], default: [] })
  logs!: ProjectLog[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
