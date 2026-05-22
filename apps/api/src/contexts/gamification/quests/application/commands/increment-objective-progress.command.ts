import { CommandHandler, ICommandHandler, CommandBus, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { QuestsRepository } from '../../domain/quests.repository';
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
    @Inject(ACTIVITY_STREAM_PORT)
    private readonly activityStream: IActivityStreamPort,
  ) {}

  async execute(command: IncrementObjectiveProgressCommand): Promise<void> {
    const { userId, actionType, amount, referenceId } = command;
    const todayStr = new Date().toISOString().split('T')[0];

    const progresses = await this.repository.findActiveObjectiveProgresses(userId, actionType);

    for (const progress of progresses) {
      const objective = progress.objective;
      if (!objective) continue;

      const isMatch = objective.referenceId === null || objective.referenceId === referenceId;

      if (isMatch) {
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
          await this.repository.completeQuest(userId, quest.id);

          // Emit async event via Redis Stream to let BullMQ award the XP
          await this.activityStream.emit('gamification.quest.completed', userId, {
            title: quest.title,
            questId: quest.id,
            xpReward: quest.xpReward,
          });

          this.eventBus.publish({
            type: 'quest.completed',
            userId,
            questId: quest.id,
            title: quest.title,
            xpReward: quest.xpReward,
          });
        }
      }
    }
  }
}
