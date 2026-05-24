import { Injectable, OnApplicationBootstrap, Inject } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { CommandBus } from '@nestjs/cqrs';
import { AwardXpCommand } from '../../application/commands/award-xp.command';
import { UserStatsRepository } from '../../domain/ports/user-stats.repository';
import { GamificationGateway } from '../../presentation/gamification.gateway';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GoalsService implements OnApplicationBootstrap {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commandBus: CommandBus,
    @Inject('UserStatsRepository')
    private readonly userStatsRepository: UserStatsRepository,
    private readonly gamificationGateway: GamificationGateway,
  ) { }

  async onApplicationBootstrap() {
    try {
      const count = await this.prisma.goal.count();
      if (count > 0) {
        return;
      }

      const goalId = 'epic-goal-master-of-reality';
      const metaQuestId = 'quest-daily-meta-alignment';

      await this.prisma.goal.create({
        data: {
          id: goalId,
          title: 'Master of Reality',
          description: 'Chinh phục thực tại Stoic bằng cách hoàn thiện 10 ngày rèn luyện tối hảo (Meta-Quests)',
          xpReward: 1000,
          badgeIcon: 'achievement_master_of_reality',
          isActive: true,
          objectives: {
            create: {
              id: 'obj-goal-meta-alignment',
              type: 'COMPLETE_QUEST',
              targetCount: 10,
              referenceId: metaQuestId,
            },
          },
        },
      });

      console.log('✅ Epic Stoic Goals successfully seeded!');
    } catch (err) {
      console.error('❌ Error seeding Epic Stoic Goals:', err);
    }
  }

  /**
   * Fetch all active goals for a user with their progress & status
   */
  async getUserGoals(userId: string) {
    const goals = await this.prisma.goal.findMany({
      where: { isActive: true },
      include: {
        objectives: true,
      },
    });

    const result: any[] = [];

    for (const goal of goals) {
      const statusDoc = await this.prisma.userGoalStatus.findUnique({
        where: {
          userId_goalId: {
            userId,
            goalId: goal.id,
          },
        },
      });

      const isCompleted = statusDoc?.status === 'completed';

      const objectivesProgress: any[] = [];
      for (const obj of goal.objectives) {
        let progress = await this.prisma.userGoalProgress.findUnique({
          where: {
            userId_objectiveId: {
              userId,
              objectiveId: obj.id,
            },
          },
        });

        if (!progress) {
          progress = await this.prisma.userGoalProgress.create({
            data: {
              id: uuidv4(),
              userId,
              objectiveId: obj.id,
              currentCount: 0,
              isCompleted: false,
            },
          });
        }

        objectivesProgress.push({
          id: obj.id,
          type: obj.type,
          targetCount: obj.targetCount,
          referenceId: obj.referenceId,
          currentCount: progress.currentCount,
          isCompleted: progress.isCompleted,
        });
      }

      result.push({
        id: goal.id,
        title: goal.title,
        description: goal.description,
        xpReward: goal.xpReward,
        badgeIcon: goal.badgeIcon,
        isCompleted,
        completedAt: statusDoc?.completedAt || null,
        objectives: objectivesProgress,
      });
    }

    return result;
  }

  /**
   * Core engine method: Propagate quest completions upwards to Goal progress.
   * Awards large XP and unlocks achievements.
   */
  async incrementGoalProgress(
    userId: string,
    actionType: string,
    amount: number,
    referenceId: string | null,
  ) {
    // Find all active goal objectives matching the trigger event
    const objectives = await this.prisma.goalObjective.findMany({
      where: {
        type: actionType,
        OR: [{ referenceId: null }, { referenceId }],
        goal: { isActive: true },
      },
      include: {
        goal: true,
      },
    });

    for (const obj of objectives) {
      // Check if this goal is already completed by the user
      const statusDoc = await this.prisma.userGoalStatus.findUnique({
        where: {
          userId_goalId: {
            userId,
            goalId: obj.goalId,
          },
        },
      });

      if (statusDoc?.status === 'completed') {
        continue; // Goal is already locked and completed!
      }

      let progress = await this.prisma.userGoalProgress.findUnique({
        where: {
          userId_objectiveId: {
            userId,
            objectiveId: obj.id,
          },
        },
      });

      if (!progress) {
        progress = await this.prisma.userGoalProgress.create({
          data: {
            id: uuidv4(),
            userId,
            objectiveId: obj.id,
            currentCount: 0,
            isCompleted: false,
          },
        });
      }

      if (progress.isCompleted) {
        continue;
      }

      // Safe increment
      const nextCount = Math.min(obj.targetCount, progress.currentCount + amount);
      const isCompletedNow = nextCount >= obj.targetCount;

      await this.prisma.userGoalProgress.update({
        where: { id: progress.id },
        data: {
          currentCount: nextCount,
          isCompleted: isCompletedNow,
        },
      });

      // Check if all objectives of this Goal are completed
      const allGoalObjectives = await this.prisma.goalObjective.findMany({
        where: { goalId: obj.goalId },
      });

      let allCompleted = true;
      for (const goalObj of allGoalObjectives) {
        if (goalObj.id === obj.id) {
          if (!isCompletedNow) allCompleted = false;
        } else {
          const siblingProgress = await this.prisma.userGoalProgress.findUnique({
            where: {
              userId_objectiveId: {
                userId,
                objectiveId: goalObj.id,
              },
            },
          });
          if (!siblingProgress || !siblingProgress.isCompleted) {
            allCompleted = false;
            break;
          }
        }
      }

      if (allCompleted) {
        // Complete the goal vĩnh viễn!
        await this.prisma.userGoalStatus.upsert({
          where: {
            userId_goalId: {
              userId,
              goalId: obj.goalId,
            },
          },
          update: {
            status: 'completed',
            completedAt: new Date(),
          },
          create: {
            userId,
            goalId: obj.goalId,
            status: 'completed',
            completedAt: new Date(),
          },
        });

        // 🏆 Award the massive Goal XP!
        await this.commandBus.execute(
          new AwardXpCommand(userId, obj.goal.xpReward, `Goal Achieved: ${obj.goal.title}`),
        );

        // 🥇 Append to UserStats.achievements
        const stats = await this.userStatsRepository.findByUserId(userId);
        if (stats && obj.goal.badgeIcon) {
          if (!stats.achievements.includes(obj.goal.badgeIcon)) {
            stats.achievements.push(obj.goal.badgeIcon);
            await this.userStatsRepository.save(stats);
          }
        }

        // 📣 Broadcast Achievement Unlock Socket event
        this.gamificationGateway.server.to(`user:${userId}`).emit('achievement_unlocked', {
          userId,
          goalId: obj.goalId,
          title: obj.goal.title,
          badgeIcon: obj.goal.badgeIcon,
          xpReward: obj.goal.xpReward,
        });
      }
    }
  }
}
