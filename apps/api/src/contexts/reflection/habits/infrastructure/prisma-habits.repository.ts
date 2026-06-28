import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { HabitsRepository } from '../domain/habits.repository';
import { Habit } from '../domain/habit.entity';
import { HabitMapper } from './habit.mapper';
import { HabitId } from '../domain/value-objects/habit-id.vo';

@Injectable()
export class PrismaHabitsRepository implements HabitsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveHabit(habit: Habit): Promise<void> {
    const persistence = HabitMapper.toPersistence(habit);
    await this.prisma.habit.upsert({
      where: { id: persistence.id },
      update: {
        title: persistence.title,
        description: persistence.description,
        xpReward: persistence.xpReward,
        difficulty: persistence.difficulty,
        frequency: persistence.frequency,
        streak: persistence.streak,
        maxStreak: persistence.maxStreak,
        habitStrength: persistence.habitStrength,
        isActive: persistence.isActive,
        actionType: persistence.actionType,
      },
      create: {
        id: persistence.id,
        userId: persistence.userId,
        title: persistence.title,
        description: persistence.description,
        xpReward: persistence.xpReward,
        difficulty: persistence.difficulty,
        frequency: persistence.frequency,
        streak: persistence.streak,
        maxStreak: persistence.maxStreak,
        habitStrength: persistence.habitStrength,
        isActive: persistence.isActive,
        actionType: persistence.actionType,
      },
    });
  }

  async findHabitById(id: HabitId, userId?: string): Promise<Habit | null> {
    const where: any = { id: id.value };
    if (userId) where.userId = userId;

    const doc = await this.prisma.habit.findFirst({ where });
    return HabitMapper.toDomain(doc);
  }

  async findAllHabits(userId: string): Promise<Habit[]> {
    const docs = await this.prisma.habit.findMany({
      where: { userId, isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    return docs.map((doc) => HabitMapper.toDomain(doc)).filter((h): h is Habit => h !== null);
  }

  async saveHabitCompletion(userId: string, habitId: string, completedAt: Date): Promise<void> {
    await this.prisma.habitCompletion.create({
      data: {
        userId,
        habitId,
        completedAt,
      },
    });
  }

  async hasCompletedHabitToday(userId: string, habitId: string, dateStr: string): Promise<boolean> {
    const start = new Date(`${dateStr}T00:00:00.000Z`);
    const end = new Date(`${dateStr}T23:59:59.999Z`);

    const count = await this.prisma.habitCompletion.count({
      where: {
        userId,
        habitId,
        completedAt: {
          gte: start,
          lte: end,
        },
      },
    });

    return count > 0;
  }

  async findByActionType(userId: string, actionType: string): Promise<Habit[]> {
    const docs = await this.prisma.habit.findMany({
      where: { userId, actionType, isActive: true },
    });

    return docs.map((doc) => HabitMapper.toDomain(doc)).filter((h): h is Habit => h !== null);
  }

  async deleteHabit(id: HabitId, userId: string): Promise<void> {
    await this.prisma.habit.updateMany({
      where: { id: id.value, userId },
      data: { isActive: false },
    });
  }
}
