import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserStatsRepository } from '../domain/ports/user-stats.repository';
import { UserStats } from '../domain/user-stats.entity';
import { UserStatsDocument, UserStatsModel } from './user-stats.schema';

@Injectable()
export class MongoUserStatsRepository implements UserStatsRepository {
  constructor(
    @InjectModel(UserStatsModel.name)
    private readonly userStatsModel: Model<UserStatsDocument>,
  ) {}

  async findByUserId(userId: string): Promise<UserStats | null> {
    const doc = await this.userStatsModel.findOne({ userId }).exec();
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async save(stats: UserStats): Promise<void> {
    await this.userStatsModel.findOneAndUpdate(
      { userId: stats.userId },
      {
        userId: stats.userId,
        xp: stats.xp,
        level: stats.level,
        title: stats.title,
        streak: stats.streak,
        lastActivityDate: stats.lastActivityDate,
        achievements: stats.achievements,
      },
      { upsert: true, new: true },
    );
  }

  private toDomain(doc: UserStatsDocument): UserStats {
    return new UserStats(
      doc.userId,
      doc.xp,
      doc.level,
      doc.title,
      doc.streak,
      doc.lastActivityDate,
      doc.achievements,
    );
  }
}
