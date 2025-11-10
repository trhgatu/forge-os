import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuditLog, AuditLogDocument } from './audit-log.schema';
import { Model, FilterQuery } from 'mongoose';
import { QueryAuditLogDto } from './dtos/query-audit-log.dto';
import { paginate } from '@shared/utils';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectModel(AuditLog.name)
    private readonly auditLogModel: Model<AuditLogDocument>,
  ) {}

  async create(payload: Partial<AuditLog>) {
    return await this.auditLogModel.create(payload);
  }

  async findAll(query: QueryAuditLogDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<AuditLogDocument> = {};
    if (query.userId) {
      filter.user = query.userId;
    }

    return paginate(
      this.auditLogModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('user', 'name email'),
      this.auditLogModel.countDocuments(filter),
      page,
      limit,
    );
  }
}
