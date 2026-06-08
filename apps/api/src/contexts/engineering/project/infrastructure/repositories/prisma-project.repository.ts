import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../../domain/project.repository';
import { Project as ProjectEntity } from '../../domain/entities/project.entity';
import { ProjectId } from '../../domain/value-objects/project-id.vo';
import { ProjectFilter } from '../../application/queries/project-filter';
import { PaginatedResult } from '@shared/types/paginated-result';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { ProjectMapper } from './project.mapper';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(project: ProjectEntity): Promise<void> {
    const data = ProjectMapper.toPersistence(project);
    const id = project.id.toString();

    await this.prisma.project.upsert({
      where: { id },
      update: {
        title: data.title,
        description: data.description,
        status: data.status,
        tags: data.tags,
        isPinned: data.isPinned,
        githubStats: data.githubStats || {},
        metadata: data.metadata || {},
        progress: data.progress,
        taskBoard: data.taskBoard || {},
        links: data.links || [],
        logs: data.logs || [],
        userId: data.userId || null,
        isDeleted: data.isDeleted,
        deletedAt: data.deletedAt,
      },
      create: {
        id,
        title: data.title,
        description: data.description,
        status: data.status,
        tags: data.tags,
        isPinned: data.isPinned,
        githubStats: data.githubStats || {},
        metadata: data.metadata || {},
        progress: data.progress,
        taskBoard: data.taskBoard || {},
        links: data.links || [],
        logs: data.logs || [],
        userId: data.userId || null,
        isDeleted: data.isDeleted,
        deletedAt: data.deletedAt,
      },
    });
  }

  async findAll(filter: ProjectFilter): Promise<PaginatedResult<ProjectEntity>> {
    const { page = 1, limit = 10, keyword, status, isPinned, tags, isDeleted } = filter;
    const skip = (page - 1) * limit;

    const where: any = {
      isDeleted: isDeleted ? true : false,
    };

    if (status) where.status = status;
    if (isPinned !== undefined) where.isPinned = isPinned;
    if (tags && tags.length > 0) {
      where.tags = { hasSome: tags };
    }

    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    const [total, data] = await Promise.all([
      this.prisma.project.count({ where }),
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ isPinned: 'desc' }, { updatedAt: 'desc' }],
      }),
    ]);

    return {
      data: data.map((doc) => ProjectMapper.toDomain(doc)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: ProjectId): Promise<ProjectEntity | null> {
    const doc = await this.prisma.project.findUnique({
      where: { id: id.toString() },
    });
    return doc ? ProjectMapper.toDomain(doc) : null;
  }

  async delete(id: ProjectId): Promise<void> {
    try {
      await this.prisma.project.delete({ where: { id: id.toString() } });
    } catch {
      throw new NotFoundException('Project not found');
    }
  }

  async softDelete(id: ProjectId): Promise<void> {
    try {
      await this.prisma.project.update({
        where: { id: id.toString() },
        data: { isDeleted: true, deletedAt: new Date() },
      });
    } catch {
      throw new NotFoundException('Project not found');
    }
  }

  async restore(id: ProjectId): Promise<void> {
    try {
      await this.prisma.project.update({
        where: { id: id.toString() },
        data: { isDeleted: false, deletedAt: null },
      });
    } catch {
      throw new NotFoundException('Project not found');
    }
  }
}
