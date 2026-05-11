import { Injectable } from '@nestjs/common';
import { AuditLogRepository } from '../../application/ports/audit-log.repository';
import { AuditLog as AuditLogEntity } from '../../domain/audit-log.entity';
import { CreateAuditLogDto } from '../../presentation/dto/create-audit-log.dto';
import { AuditLogQueryDto } from '../../presentation/dto/audit-log-query.dto';
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { AuditLogMapper } from '../mappers/audit-log.mapper';

@Injectable()
export class PrismaAuditLogRepository implements AuditLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAuditLogDto): Promise<AuditLogEntity> {
    const log = await this.prisma.auditLog.create({
      data: {
        userId: dto.user,
        action: dto.action,
        method: dto.method,
        statusCode: dto.statusCode,
        path: dto.path,
        params: dto.params || {},
        query: dto.query || {},
        body: dto.body || {},
      },
    });

    const domain = AuditLogMapper.toDomain(log);
    if (!domain) throw new Error('Failed to map AuditLog to domain');
    return domain;
  }

  async findAll(query: AuditLogQueryDto): Promise<PaginatedResult<AuditLogEntity>> {
    const { page = 1, limit = 10, userId, action } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (userId) where.userId = userId;
    if (action) where.action = action;

    const [total, data] = await Promise.all([
      this.prisma.auditLog.count({ where }),
      this.prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data: data
        .map((log) => AuditLogMapper.toDomain(log))
        .filter((l): l is AuditLogEntity => l !== null),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
