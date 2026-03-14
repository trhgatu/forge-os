import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { ProjectDocument } from '../project.schema';
import { ProjectRepository } from '../../application/ports/project.repository';
import { Project } from '../../domain/entities/project.entity';
import { ProjectMapper } from './project.mapper';
import { ProjectId } from '../../domain/value-objects/project-id.vo';
import { ProjectFilter } from '../../application/queries/project-filter';
import { PaginatedResult } from '@shared/types/paginated-result';
import { paginateDDD } from '@shared/utils/paginateDDD';

@Injectable()
export class MongoProjectRepository implements ProjectRepository {
  constructor(
    @InjectModel('Project')
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async save(project: Project): Promise<void> {
    const doc = ProjectMapper.toPersistence(project);
    await this.projectModel.updateOne({ _id: doc._id }, { $set: doc }, { upsert: true });
  }

  async findAll(query: ProjectFilter): Promise<PaginatedResult<Project>> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<ProjectDocument> = {
      isDeleted: query.isDeleted ? true : { $ne: true },
      ...(query.status && { status: query.status }),
      ...(query.isPinned !== undefined && { isPinned: query.isPinned }),
      ...(query.tags && query.tags.length > 0 && { tags: { $in: query.tags } }),
      ...(query.keyword && {
        $or: [
          {
            title: {
              $regex: query.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
              $options: 'i',
            },
          },
          {
            description: {
              $regex: query.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
              $options: 'i',
            },
          },
        ],
      }),
    };

    const result = await paginateDDD(
      this.projectModel.find(filter).sort({ isPinned: -1, updatedAt: -1 }).skip(skip).limit(limit),
      this.projectModel.countDocuments(filter),
      page,
      limit,
    );

    return {
      meta: result.meta,
      data: result.data.map((doc) => ProjectMapper.toDomain(doc)),
    };
  }

  async findById(id: ProjectId): Promise<Project | null> {
    const doc = await this.projectModel.findById(id.toString()).exec();
    if (!doc) return null;
    return ProjectMapper.toDomain(doc);
  }

  async delete(id: ProjectId): Promise<void> {
    await this.projectModel.findByIdAndDelete(id.toString()).exec();
  }
}
