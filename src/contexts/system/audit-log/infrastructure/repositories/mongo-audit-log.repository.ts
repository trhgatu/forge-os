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

@Injectable()
export class MongoAuditLogRepository implements AuditLogRepository {
  constructor(
    @InjectModel(AuditLog.name)
    private readonly auditLogModel: Model<AuditLogDocument>,
  ) { }

  async create(dto: CreateAuditLogDto): Promise<AuditLog> {
    return this.auditLogModel.create(dto);
  }

  async findAll(query: any): Promise<any> {
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
      Number(page),
      Number(limit),
    );
  }
}
