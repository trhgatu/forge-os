import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { RoutinesRepository } from '../domain/routines.repository';
import { Routine, RoutineStep } from '../domain/routine.entity';

@Injectable()
export class PrismaRoutinesRepository implements RoutinesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(routine: Routine): Promise<void> {
    await this.prisma.routine.upsert({
      where: { id: routine.id },
      update: {
        title: routine.title,
        comboXp: routine.comboXp,
        isActive: routine.isActive,
      },
      create: {
        id: routine.id,
        userId: routine.userId,
        title: routine.title,
        comboXp: routine.comboXp,
        isActive: routine.isActive,
      },
    });
  }

  async findById(id: string, userId?: string): Promise<Routine | null> {
    const where: any = { id };
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
      },
    });

    if (!doc) return null;

    const steps = doc.habits.map(
      (rh) => new RoutineStep(rh.habitId, rh.habit.title, rh.habit.xpReward, rh.order),
    );

    return Routine.create({
      id: doc.id,
      userId: doc.userId,
      title: doc.title,
      comboXp: doc.comboXp,
      isActive: doc.isActive,
      steps,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
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
      },
      orderBy: { createdAt: 'desc' },
    });

    return docs.map((doc) => {
      const steps = doc.habits.map(
        (rh) => new RoutineStep(rh.habitId, rh.habit.title, rh.habit.xpReward, rh.order),
      );

      return Routine.create({
        id: doc.id,
        userId: doc.userId,
        title: doc.title,
        comboXp: doc.comboXp,
        isActive: doc.isActive,
        steps,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      });
    });
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

  async delete(id: string, userId: string): Promise<void> {
    await this.prisma.routine.updateMany({
      where: { id, userId },
      data: { isActive: false },
    });
  }
}
