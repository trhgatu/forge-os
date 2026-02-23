import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Project, ProjectDocument } from '../project.schema';
import { ProjectRepository } from '../../application/ports/project.repository';
import { Project as ProjectEntity } from '../../domain/project.entity';
import { ProjectMapper } from './project.mapper';
import { ProjectId } from '../../domain/value-objects/project-id.vo';
import { ProjectFilter } from '../../application/queries/project-filter';
import { PaginatedResult } from '@shared/types/paginated-result';
import { paginateDDD } from '@shared/utils/paginateDDD';

@Injectable()
export class MongoProjectRepository implements ProjectRepository {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async save(project: ProjectEntity): Promise<void> {
    const doc = ProjectMapper.toPersistence(project);
    await this.projectModel.updateOne({ _id: doc._id }, { $set: doc }, { upsert: true });
  }

  async findAll(filter: ProjectFilter): Promise<PaginatedResult<ProjectEntity>> {
    const { page = 1, limit = 10 } = filter;
    const skip = (page - 1) * limit;

    const query: FilterQuery<ProjectDocument> = {
      isDeleted: filter.isDeleted ? true : { $ne: true },
      ...(filter.status && { status: filter.status }),
      ...(filter.isPinned !== undefined && { isPinned: filter.isPinned }),
      ...(filter.tags && filter.tags.length > 0 && { tags: { $in: filter.tags } }),
      ...(filter.keyword && {
        $or: [
          {
            title: {
              $regex: filter.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
              $options: 'i',
            },
          },
          {
            description: {
              $regex: filter.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
              $options: 'i',
            },
          },
        ],
      }),
    };

    const result = await paginateDDD(
      this.projectModel.find(query).sort({ isPinned: -1, updatedAt: -1 }).skip(skip).limit(limit),
      this.projectModel.countDocuments(query),
      page,
      limit,
    );

    return {
      meta: result.meta,
      data: result.data.map((doc) => ProjectMapper.toDomain(doc)),
    };
  }

  async findById(id: ProjectId): Promise<ProjectEntity | null> {
    const doc = await this.projectModel.findById(id.toString()).exec();
    if (!doc) return null;
    return ProjectMapper.toDomain(doc);
  }

  async delete(id: ProjectId): Promise<void> {
    const result = await this.projectModel.findByIdAndDelete(id.toString()).exec();
    if (!result) throw new NotFoundException('Project not found');
  }

  async softDelete(id: ProjectId): Promise<void> {
    const result = await this.projectModel
      .findByIdAndUpdate(id.toString(), { isDeleted: true, deletedAt: new Date() }, { new: true })
      .exec();
    if (!result) throw new NotFoundException('Project not found');
  }

  async restore(id: ProjectId): Promise<void> {
    const result = await this.projectModel
      .findByIdAndUpdate(id.toString(), { isDeleted: false, deletedAt: null }, { new: true })
      .exec();
    if (!result) throw new NotFoundException('Project not found');
  }
}
