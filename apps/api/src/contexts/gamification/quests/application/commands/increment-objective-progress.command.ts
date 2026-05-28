import { CommandHandler, ICommandHandler, CommandBus, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { QuestsRepository } from '../../domain/quests.repository';
import { GoalsService } from '../../../goals/application/goals.service';
import { UserStatsRepository } from '../../../domain/ports/user-stats.repository';
import { ACTIVITY_STREAM_PORT, IActivityStreamPort } from '@shared/ports/activity-stream.port';

export class IncrementObjectiveProgressCommand {
  constructor(
    public readonly userId: string,
    public readonly actionType: string,
    public readonly amount: number,
    public readonly referenceId: string | null,
  ) {}
}

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
  ) {}

  async execute(command: IncrementObjectiveProgressCommand): Promise<void> {
    const { userId, actionType, amount, referenceId } = command;
    const todayStr = new Date().toISOString().split('T')[0];

    // Update streak on action trigger (no direct stat increments here to prevent exploits)
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

          // QUEST-GATED AUTO-INCREMENT: Award character stats dynamically based on Quest Objectives
          const statsToUpgrade = await this.userStatsRepository.findByUserId(userId);
          if (statsToUpgrade) {
            // Award +1 Willpower as a base reward for completing any Quest
            statsToUpgrade.willpower = (statsToUpgrade.willpower || 0) + 1;

            // Automatically increment attributes corresponding to quest activities
            for (const obj of quest.objectives) {
              switch (obj.type) {
                case 'COMPLETE_TASK':
                case 'COMPLETE_ROUTINE':
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
                  statsToUpgrade.awareness = (statsToUpgrade.awareness || 0) + 2;
                  break;
                case 'WS_PRESENCE':
                  statsToUpgrade.presence = (statsToUpgrade.presence || 0) + 2;
                  break;
              }
            }

            await this.userStatsRepository.save(statsToUpgrade);
          }

          await this.activityStream.emit('gamification.quest.completed', userId, {
            title: quest.title,
            questId: quest.id,
            xpReward: quest.xpReward,
            isCustom: quest.userId !== null,
          });

          this.eventBus.publish({
            type: 'quest.completed',
            userId,
            questId: quest.id,
            title: quest.title,
            xpReward: quest.xpReward,
          });

          await this.commandBus.execute(
            new IncrementObjectiveProgressCommand(userId, 'COMPLETE_QUEST', 1, quest.id),
          );
          await this.goalsService.incrementGoalProgress(userId, 'COMPLETE_QUEST', 1, quest.id);
        }
      }
    }
  }
}
