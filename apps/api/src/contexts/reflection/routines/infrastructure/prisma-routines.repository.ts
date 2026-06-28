import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { RoutinesRepository } from '../domain/routines.repository';
import { Routine } from '../domain/routine.entity';
import { RoutineMapper } from './routine.mapper';
import { RoutineId } from '../domain/value-objects/routine-id.vo';

@Injectable()
export class PrismaRoutinesRepository implements RoutinesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(routine: Routine): Promise<void> {
    const persistence = RoutineMapper.toPersistence(routine);
    await this.prisma.routine.upsert({
      where: { id: persistence.id },
      update: {
        title: persistence.title,
        comboXp: persistence.comboXp,
        isActive: persistence.isActive,
        targetTime: persistence.targetTime,
        frequency: persistence.frequency ?? undefined,
        streak: persistence.streak,
        maxStreak: persistence.maxStreak,
      },
      create: {
        id: persistence.id,
        userId: persistence.userId,
        title: persistence.title,
        comboXp: persistence.comboXp,
        isActive: persistence.isActive,
        targetTime: persistence.targetTime,
        frequency: persistence.frequency ?? undefined,
        streak: persistence.streak,
        maxStreak: persistence.maxStreak,
      },
    });
  }

  async findById(id: RoutineId, userId?: string): Promise<Routine | null> {
    const where: any = { id: id.value };
    if (userId) where.userId = userId;

    const doc = await this.prisma.routine.findFirst({
      where,
      include: {
        habits: {
          include: {
            habit: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        completions: true,
      },
    });

    return RoutineMapper.toDomain(doc);
  }

  async findAll(userId: string): Promise<Routine[]> {
    const docs = await this.prisma.routine.findMany({
      where: { userId, isActive: true },
      include: {
        habits: {
          include: {
            habit: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        completions: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return docs.map((doc) => RoutineMapper.toDomain(doc)).filter((r): r is Routine => r !== null);
  }

  async addHabitToRoutine(routineId: string, habitId: string, order: number): Promise<void> {
    await this.prisma.routineHabit.upsert({
      where: {
        routineId_habitId: {
          routineId,
          habitId,
        },
      },
      update: {
        order,
      },
      create: {
        routineId,
        habitId,
        order,
      },
    });
  }

  async removeHabitFromRoutine(routineId: string, habitId: string): Promise<void> {
    await this.prisma.routineHabit.delete({
      where: {
        routineId_habitId: {
          routineId,
          habitId,
        },
      },
    });
  }

  async delete(id: RoutineId, userId: string): Promise<void> {
    await this.prisma.routine.updateMany({
      where: { id: id.value, userId },
      data: { isActive: false },
    });
  }

  async saveRoutineCompletion(userId: string, routineId: string, completedAt: Date): Promise<void> {
    await this.prisma.routineCompletion.create({
      data: {
        userId,
        routineId,
        completedAt,
      },
    });
  }

  async hasCompletedRoutineToday(
    userId: string,
    routineId: string,
    dateStr: string,
  ): Promise<boolean> {
    const start = new Date(`${dateStr}T00:00:00.000Z`);
    const end = new Date(`${dateStr}T23:59:59.999Z`);

    const count = await this.prisma.routineCompletion.count({
      where: {
        userId,
        routineId,
        completedAt: {
          gte: start,
          lte: end,
        },
      },
    });

    return count > 0;
  }
}
