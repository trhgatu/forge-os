import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { QuestsRepository } from '../domain/quests.repository';
import { Quest, QuestObjective, UserObjectiveProgress } from '../domain/quest.entity';

@Injectable()
export class PrismaQuestsRepository implements QuestsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveQuest(quest: Quest): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.quest.upsert({
        where: { id: quest.id },
        update: {
          title: quest.title,
          description: quest.description,
          type: quest.type,
          xpReward: quest.xpReward,
          isActive: quest.isActive,
          userId: quest.userId,
        },
        create: {
          id: quest.id,
          title: quest.title,
          description: quest.description,
          type: quest.type,
          xpReward: quest.xpReward,
          isActive: quest.isActive,
          userId: quest.userId,
        },
      });

      // Get all current objective IDs
      const objectiveIds = quest.objectives.map((o) => o.id);

      // Delete any objectives in the database that are NOT in the current list
      await tx.questObjective.deleteMany({
        where: {
          questId: quest.id,
          id: { notIn: objectiveIds },
        },
      });

      for (const obj of quest.objectives) {
        await tx.questObjective.upsert({
          where: { id: obj.id },
          update: {
            type: obj.type,
            targetCount: obj.targetCount,
            referenceType: obj.referenceType,
            referenceId: obj.referenceId,
          },
          create: {
            id: obj.id,
            questId: quest.id,
            type: obj.type,
            targetCount: obj.targetCount,
            referenceType: obj.referenceType,
            referenceId: obj.referenceId,
          },
        });
      }
    });
  }

  async findQuestById(id: string): Promise<Quest | null> {
    const doc = await this.prisma.quest.findUnique({
      where: { id },
      include: { objectives: true },
    });

    if (!doc) return null;

    const objectives = doc.objectives.map(
      (o) =>
        new QuestObjective(o.id, o.questId, o.type, o.targetCount, o.referenceType, o.referenceId),
    );

    return Quest.create({
      id: doc.id,
      userId: doc.userId,
      title: doc.title,
      description: doc.description,
      type: doc.type,
      xpReward: doc.xpReward,
      isActive: doc.isActive,
      objectives,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  async findAllActiveQuests(userId: string): Promise<Quest[]> {
    const docs = await this.prisma.quest.findMany({
      where: {
        isActive: true,
        OR: [{ userId: null }, { userId }],
      },
      include: { objectives: true },
    });

    return docs.map((doc) => {
      const objectives = doc.objectives.map(
        (o) =>
          new QuestObjective(
            o.id,
            o.questId,
            o.type,
            o.targetCount,
            o.referenceType,
            o.referenceId,
          ),
      );

      return Quest.create({
        id: doc.id,
        userId: doc.userId,
        title: doc.title,
        description: doc.description,
        type: doc.type,
        xpReward: doc.xpReward,
        isActive: doc.isActive,
        objectives,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      });
    });
  }

  async findObjectiveProgress(
    userId: string,
    objectiveId: string,
    date: string | null,
  ): Promise<UserObjectiveProgress | null> {
    const doc = await this.prisma.userObjectiveProgress.findFirst({
      where: {
        userId,
        objectiveId,
        date,
      },
      include: {
        objective: true,
      },
    });

    if (!doc) return null;

    const obj = doc.objective;
    const objective = new QuestObjective(
      obj.id,
      obj.questId,
      obj.type,
      obj.targetCount,
      obj.referenceType,
      obj.referenceId,
    );

    return new UserObjectiveProgress(
      doc.id,
      doc.userId,
      doc.objectiveId,
      doc.currentCount,
      doc.isCompleted,
      doc.date,
      objective,
    );
  }

  async findActiveObjectiveProgresses(
    userId: string,
    actionType: string,
  ): Promise<UserObjectiveProgress[]> {
    const today = new Date().toISOString().split('T')[0];

    const docs = await this.prisma.userObjectiveProgress.findMany({
      where: {
        userId,
        isCompleted: false,
        objective: {
          type: actionType,
          quest: {
            isActive: true,
          },
        },
        OR: [{ date: null }, { date: today }],
      },
      include: {
        objective: true,
      },
    });

    return docs.map((doc) => {
      const obj = doc.objective;
      const objective = new QuestObjective(
        obj.id,
        obj.questId,
        obj.type,
        obj.targetCount,
        obj.referenceType,
        obj.referenceId,
      );

      return new UserObjectiveProgress(
        doc.id,
        doc.userId,
        doc.objectiveId,
        doc.currentCount,
        doc.isCompleted,
        doc.date,
        objective,
      );
    });
  }

  async saveObjectiveProgress(progress: UserObjectiveProgress): Promise<void> {
    await this.prisma.userObjectiveProgress.upsert({
      where: {
        id: progress.id,
      },
      update: {
        currentCount: progress.currentCount,
        isCompleted: progress.isCompleted,
      },
      create: {
        id: progress.id,
        userId: progress.userId,
        objectiveId: progress.objectiveId,
        currentCount: progress.currentCount,
        isCompleted: progress.isCompleted,
        date: progress.date,
      },
    });
  }

  async completeQuest(userId: string, questId: string): Promise<void> {
    await this.prisma.userQuestStatus.upsert({
      where: {
        userId_questId: {
          userId,
          questId,
        },
      },
      update: {
        status: 'completed',
        completedAt: new Date(),
      },
      create: {
        userId,
        questId,
        status: 'completed',
        completedAt: new Date(),
      },
    });
  }

  async isQuestCompleted(userId: string, questId: string): Promise<boolean> {
    const doc = await this.prisma.userQuestStatus.findUnique({
      where: {
        userId_questId: {
          userId,
          questId,
        },
      },
      include: {
        quest: true,
      },
    });

    if (!doc || doc.status !== 'completed') {
      return false;
    }

    if (!doc.completedAt) {
      return true;
    }

    if (doc.quest.type === 'daily') {
      const todayStr = new Date().toISOString().split('T')[0];
      const completedStr = doc.completedAt.toISOString().split('T')[0];
      return todayStr === completedStr;
    }

    if (doc.quest.type === 'weekly') {
      const getWeekNumber = (date: Date) => {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
      };
      const today = new Date();
      const currentWeek = `${today.getFullYear()}-W${getWeekNumber(today)}`;
      const completedWeek = `${doc.completedAt.getFullYear()}-W${getWeekNumber(doc.completedAt)}`;
      return currentWeek === completedWeek;
    }

    return true;
  }
}
