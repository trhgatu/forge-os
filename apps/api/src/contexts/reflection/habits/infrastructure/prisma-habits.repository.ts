import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { HabitsRepository } from '../domain/habits.repository';
import { Habit } from '../domain/habit.entity';

@Injectable()
export class PrismaHabitsRepository implements HabitsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveHabit(habit: Habit): Promise<void> {
    await this.prisma.habit.upsert({
      where: { id: habit.id },
      update: {
        title: habit.title,
        description: habit.description,
        xpReward: habit.xpReward,
        difficulty: habit.difficulty,
        frequency: habit.frequency || {},
        streak: habit.streak,
        maxStreak: habit.maxStreak,
        habitStrength: habit.habitStrength,
        isActive: habit.isActive,
        actionType: habit.actionType,
      },
      create: {
        id: habit.id,
        userId: habit.userId,
        title: habit.title,
        description: habit.description,
        xpReward: habit.xpReward,
        difficulty: habit.difficulty,
        frequency: habit.frequency || {},
        streak: habit.streak,
        maxStreak: habit.maxStreak,
        habitStrength: habit.habitStrength,
        isActive: habit.isActive,
        actionType: habit.actionType,
      },
    });
  }

  async findHabitById(id: string, userId?: string): Promise<Habit | null> {
    const where: any = { id };
    if (userId) where.userId = userId;

    const doc = await this.prisma.habit.findFirst({ where });
    if (!doc) return null;

    return Habit.create({
      id: doc.id,
      userId: doc.userId,
      title: doc.title,
      description: doc.description,
      xpReward: doc.xpReward,
      difficulty: doc.difficulty,
      frequency: doc.frequency,
      streak: doc.streak,
      maxStreak: doc.maxStreak,
      habitStrength: doc.habitStrength,
      isActive: doc.isActive,
      actionType: doc.actionType,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  async findAllHabits(userId: string): Promise<Habit[]> {
    const docs = await this.prisma.habit.findMany({
      where: { userId, isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    return docs.map((doc) =>
      Habit.create({
        id: doc.id,
        userId: doc.userId,
        title: doc.title,
        description: doc.description,
        xpReward: doc.xpReward,
        difficulty: doc.difficulty,
        frequency: doc.frequency,
        streak: doc.streak,
        maxStreak: doc.maxStreak,
        habitStrength: doc.habitStrength,
        isActive: doc.isActive,
        actionType: doc.actionType,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      }),
    );
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

    return docs.map((doc) =>
      Habit.create({
        id: doc.id,
        userId: doc.userId,
        title: doc.title,
        description: doc.description,
        xpReward: doc.xpReward,
        difficulty: doc.difficulty,
        frequency: doc.frequency,
        streak: doc.streak,
        maxStreak: doc.maxStreak,
        habitStrength: doc.habitStrength,
        isActive: doc.isActive,
        actionType: doc.actionType,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      }),
    );
  }

  async deleteHabit(id: string, userId: string): Promise<void> {
    await this.prisma.habit.updateMany({
      where: { id, userId },
      data: { isActive: false },
    });
  }
}
