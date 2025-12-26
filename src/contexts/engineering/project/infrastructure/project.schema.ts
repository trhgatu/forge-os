import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProjectTask, ProjectLink } from '../domain/project.interfaces';

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

  @Prop()
  lastCommit?: Date;

  @Prop()
  health?: number;
}

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
  @Prop()
  links!: ProjectLink[]; // Array of links
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
