import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { AuditLogRepository } from '../../application/ports/audit-log.repository';
import {
  AuditLog,
  AuditLogDocument,
} from '../../infrastructure/schemas/sys-audit-log.schema';
import { CreateAuditLogDto } from '../../dto/create-audit-log.dto';
import { paginate } from '@shared/utils';
import { AuditLogQueryDto } from '../../dto/audit-log-query.dto';
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';
import { AuditLog as AuditLogEntity } from '../../domain/audit-log.entity';
import { AuditLogMapper } from '../mappers/audit-log.mapper';

@Injectable()
export class MongoAuditLogRepository implements AuditLogRepository {
  constructor(
    @InjectModel(AuditLog.name)
    private readonly auditLogModel: Model<AuditLogDocument>,
  ) {}

  async create(dto: CreateAuditLogDto): Promise<AuditLogEntity> {
    const createdLog = await this.auditLogModel.create(dto);
    return AuditLogMapper.toDomain(createdLog);
  }

  async findAll(
    query: AuditLogQueryDto,
  ): Promise<PaginatedResult<AuditLogEntity>> {
    const { page = 1, limit = 10, userId } = query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const filter: FilterQuery<AuditLogDocument> = {};
    if (userId) {
      filter.user = userId;
    }

    const result = await paginate(
      this.auditLogModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      this.auditLogModel.countDocuments(filter),
      pageNum,
      limitNum,
    );

    return {
      ...result,
      data: result.data.map((doc) =>
        AuditLogMapper.toDomain(doc as AuditLogDocument),
      ),
    };
  }
}
