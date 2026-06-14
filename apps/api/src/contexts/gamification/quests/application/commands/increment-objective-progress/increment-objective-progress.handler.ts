import { CommandHandler, ICommandHandler, CommandBus, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IncrementObjectiveProgressCommand } from './increment-objective-progress.command';
import { QuestsRepository } from '../../../domain/quests.repository';
import { GoalsService } from '../../../../goals/application/goals.service';
import { UserStatsRepository } from '../../../../domain/ports/user-stats.repository';
import { ACTIVITY_STREAM_PORT, IActivityStreamPort } from '@shared/ports/activity-stream.port';
import { GamificationGateway } from '../../../../presentation/gamification.gateway';
import { QuestCompletedEvent } from '../../../domain/events/quest-completed.event';

@CommandHandler(IncrementObjectiveProgressCommand)
export class IncrementObjectiveProgressHandler implements ICommandHandler<IncrementObjectiveProgressCommand> {
  constructor(
    private readonly repository: QuestsRepository,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
    private readonly goalsService: GoalsService,
    @Inject('UserStatsRepository')
    private readonly userStatsRepository: UserStatsRepository,
    @Inject(ACTIVITY_STREAM_PORT)
    private readonly activityStream: IActivityStreamPort,
    private readonly gamificationGateway: GamificationGateway,
  ) {}

  async execute(command: IncrementObjectiveProgressCommand): Promise<void> {
    const { userId, actionType, amount, referenceId } = command;
    const todayStr = new Date().toISOString().split('T')[0];

    const stats = await this.userStatsRepository.findByUserId(userId);
    if (stats) {
      stats.updateStreak();
      await this.userStatsRepository.save(stats);
    }

    const progresses = await this.repository.findActiveObjectiveProgresses(userId, actionType);

    for (const progress of progresses) {
      const objective = progress.objective;
      if (!objective) continue;

      const isMatch = objective.referenceId === null || objective.referenceId === referenceId;

      if (isMatch) {
        const isQuestCompletedAlready = await this.repository.isQuestCompleted(
          userId,
          objective.questId,
        );
        if (isQuestCompletedAlready) {
          continue;
        }

        progress.currentCount += amount;

        if (progress.currentCount >= objective.targetCount) {
          progress.currentCount = objective.targetCount;
          progress.isCompleted = true;
        }

        await this.repository.saveObjectiveProgress(progress);

        const quest = await this.repository.findQuestById(objective.questId);
        if (!quest) continue;

        let allCompleted = true;
        for (const obj of quest.objectives) {
          const dateLimit = quest.type === 'daily' ? todayStr : null;
          const objProgress = await this.repository.findObjectiveProgress(
            userId,
            obj.id,
            dateLimit,
          );

          if (!objProgress || !objProgress.isCompleted) {
            allCompleted = false;
            break;
          }
        }

        if (allCompleted) {
          const finalCheckCompleted = await this.repository.isQuestCompleted(userId, quest.id);
          if (finalCheckCompleted) {
            continue;
          }

          await this.repository.completeQuest(userId, quest.id);

          const statsToUpgrade = await this.userStatsRepository.findByUserId(userId);
          if (statsToUpgrade) {
            statsToUpgrade.willpower = (statsToUpgrade.willpower || 0) + 1;
            for (const obj of quest.objectives) {
              switch (obj.type) {
                case 'COMPLETE_TASK':
                case 'COMPLETE_ROUTINE':
                case 'LOG_TRANSACTION':
                case 'SYNC_PROJECT':
                  statsToUpgrade.discipline = (statsToUpgrade.discipline || 0) + 2;
                  break;
                case 'COMPLETE_HABIT':
                case 'CHECK_HABIT':
                  statsToUpgrade.consistency = (statsToUpgrade.consistency || 0) + 2;
                  break;
                case 'CREATE_JOURNAL':
                case 'COMPLETE_JOURNAL':
                case 'CREATE_MEMORY':
                case 'COMPLETE_MEMORY':
                case 'LOG_MOOD':
                  statsToUpgrade.awareness = (statsToUpgrade.awareness || 0) + 2;
                  break;
                case 'CREATE_REFLECTION':
                  statsToUpgrade.awareness = (statsToUpgrade.awareness || 0) + 2;
                  statsToUpgrade.willpower = (statsToUpgrade.willpower || 0) + 2;
                  break;
                case 'WS_PRESENCE':
                  statsToUpgrade.presence = (statsToUpgrade.presence || 0) + 2;
                  break;
              }
            }

            await this.userStatsRepository.save(statsToUpgrade);
          }

          // Emit real-time Quest completed WS notification
          this.gamificationGateway.server.to(`user:${userId}`).emit('quest_completed', {
            userId,
            questId: quest.id,
            title: quest.title,
            xpReward: quest.xpReward,
            stats: statsToUpgrade
              ? {
                  level: statsToUpgrade.level,
                  xp: statsToUpgrade.xp,
                  discipline: statsToUpgrade.discipline,
                  consistency: statsToUpgrade.consistency,
                  willpower: statsToUpgrade.willpower,
                  awareness: statsToUpgrade.awareness,
                  presence: statsToUpgrade.presence,
                }
              : null,
          });

          await this.activityStream.emit('gamification.quest.completed', userId, {
            title: quest.title,
            questId: quest.id,
            xpReward: quest.xpReward,
            isCustom: quest.userId !== null,
          });

          this.eventBus.publish(
            new QuestCompletedEvent(userId, quest.id, quest.title, quest.xpReward),
          );

          await this.commandBus.execute(
            new IncrementObjectiveProgressCommand(userId, 'COMPLETE_QUEST', 1, quest.id),
          );
          await this.goalsService.incrementGoalProgress(userId, 'COMPLETE_QUEST', 1, quest.id);
        }
      }
    }
  }
}
