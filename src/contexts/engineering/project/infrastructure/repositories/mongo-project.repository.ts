import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../project.schema';
import { ProjectRepository } from '../../application/ports/project.repository';
import { Project as ProjectEntity } from '../../domain/project.entity';
import { ProjectMapper } from './project.mapper';

@Injectable()
export class MongoProjectRepository implements ProjectRepository {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async create(project: ProjectEntity): Promise<ProjectEntity> {
    const pestenceModel = ProjectMapper.toPersistence(project);
    const newProject = new this.projectModel(pestenceModel);
    await newProject.save();
    return ProjectMapper.toDomain(newProject);
  }

  async findAll(): Promise<ProjectEntity[]> {
    const docs = await this.projectModel.find().exec();
    return docs.map((doc) => ProjectMapper.toDomain(doc));
  }

  async findById(id: string): Promise<ProjectEntity | null> {
    const doc = await this.projectModel.findById(id).exec();
    if (!doc) return null;
    return ProjectMapper.toDomain(doc);
  }

  async update(project: ProjectEntity): Promise<ProjectEntity> {
    const persistenceModel = ProjectMapper.toPersistence(project);
    const updatedDoc = await this.projectModel
      .findByIdAndUpdate(project.id, persistenceModel, { new: true })
      .exec();
    if (!updatedDoc) throw new Error('Project not found');
    return ProjectMapper.toDomain(updatedDoc);
  }

  async delete(id: string): Promise<void> {
    await this.projectModel.findByIdAndDelete(id).exec();
  }
}
