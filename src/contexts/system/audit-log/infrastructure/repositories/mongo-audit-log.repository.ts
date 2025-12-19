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

@Injectable()
export class MongoAuditLogRepository implements AuditLogRepository {
  constructor(
    @InjectModel(AuditLog.name)
    private readonly auditLogModel: Model<AuditLogDocument>,
  ) {}

  async create(dto: CreateAuditLogDto): Promise<AuditLog> {
    return this.auditLogModel.create(dto);
  }

  async findAll(query: AuditLogQueryDto): Promise<PaginatedResult<AuditLog>> {
    const { page = 1, limit = 10, userId } = query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const filter: FilterQuery<AuditLogDocument> = {};
    if (userId) {
      filter.user = userId;
    }

    return paginate(
      this.auditLogModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate('user', 'name email'),
      this.auditLogModel.countDocuments(filter),
      pageNum,
      limitNum,
    );
  }
}
