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

    // Always increment character attributes and update streak on any action trigger
    const stats = await this.userStatsRepository.findByUserId(userId);
    if (stats) {
      stats.updateStreak();

      switch (actionType) {
        case 'COMPLETE_TASK':
          stats.discipline = (stats.discipline || 0) + amount;
          break;
        case 'COMPLETE_HABIT':
          stats.consistency = (stats.consistency || 0) + amount;
          break;
        case 'COMPLETE_ROUTINE':
          stats.discipline = (stats.discipline || 0) + amount * 2;
          break;
        case 'COMPLETE_JOURNAL':
        case 'CREATE_JOURNAL':
          stats.awareness = (stats.awareness || 0) + amount * 2;
          break;
        case 'CREATE_MEMORY':
        case 'COMPLETE_MEMORY':
          stats.awareness = (stats.awareness || 0) + amount;
          break;
        case 'COMPLETE_QUEST':
          stats.willpower = (stats.willpower || 0) + amount;
          break;
        case 'COMPLETE_GOAL':
          stats.willpower = (stats.willpower || 0) + amount * 5;
          break;
        case 'WS_PRESENCE':
          stats.presence = (stats.presence || 0) + amount;
          break;
      }

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
