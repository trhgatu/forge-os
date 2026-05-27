import { Injectable } from '@nestjs/common';
import { UserStatsRepository } from '../domain/ports/user-stats.repository';
import { UserStats } from '../domain/user-stats.entity';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@Injectable()
export class PrismaUserStatsRepository implements UserStatsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<UserStats | null> {
    const data = await this.prisma.userStats.findUnique({
      where: { userId },
    });

    if (!data) return null;

    return new UserStats(
      data.userId,
      data.xp,
      data.level,
      data.title,
      data.streak,
      data.lastActivityDate,
      data.achievements,
      data.discipline,
      data.consistency,
      data.willpower,
      data.awareness,
      data.presence,
    );
  }

  async save(stats: UserStats): Promise<void> {
    await this.prisma.userStats.upsert({
      where: { userId: stats.userId },
      update: {
        xp: stats.xp,
        level: stats.level,
        title: stats.title,
        streak: stats.streak,
        lastActivityDate: stats.lastActivityDate,
        achievements: stats.achievements,
        discipline: stats.discipline,
        consistency: stats.consistency,
        willpower: stats.willpower,
        awareness: stats.awareness,
        presence: stats.presence,
      },
      create: {
        userId: stats.userId,
        xp: stats.xp,
        level: stats.level,
        title: stats.title,
        streak: stats.streak,
        lastActivityDate: stats.lastActivityDate,
        achievements: stats.achievements,
        discipline: stats.discipline,
        consistency: stats.consistency,
        willpower: stats.willpower,
        awareness: stats.awareness,
        presence: stats.presence,
      },
    });
  }
}
