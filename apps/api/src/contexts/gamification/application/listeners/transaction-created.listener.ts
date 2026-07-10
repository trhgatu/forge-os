import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Injectable, Inject } from '@nestjs/common';
import { TransactionCreatedEvent } from '../../../wealth/application/events/transaction-created.event';
import { UserStatsRepository } from '../../domain/ports/user-stats.repository';
import { UserStats } from '../../domain/user-stats.entity';

interface AttributeReward {
  discipline?: number;
  willpower?: number;
  awareness?: number;
}

const TRANSACTION_REWARDS: Record<
  string,
  Record<string, AttributeReward | ((event: TransactionCreatedEvent) => AttributeReward)>
> = {
  INCOME: {
    DEFAULT: { discipline: 1 },
  },
  EXPENSE: {
    ESSENTIAL: { discipline: 2 },
    COMFORT: { discipline: 1 },
    INDULGENCE: (event: TransactionCreatedEvent) => {
      let willpower = 0;
      let awareness = 0;
      if (event.isApprovedByWill) {
        willpower += 2;
      }
      if (event.hasReflection) {
        awareness += 4;
        willpower += 2;
      }
      return { willpower, awareness };
    },
  },
};

@EventsHandler(TransactionCreatedEvent)
@Injectable()
export class TransactionCreatedListener implements IEventHandler<TransactionCreatedEvent> {
  constructor(
    @Inject('UserStatsRepository')
    private readonly userStatsRepository: UserStatsRepository,
  ) {}

  async handle(event: TransactionCreatedEvent) {
    const { userId, type, categoryType } = event;

    const typeConfig = TRANSACTION_REWARDS[type];
    if (!typeConfig) return;

    const rewardConfig = typeConfig[categoryType] || typeConfig['DEFAULT'];
    if (!rewardConfig) return;

    const rewards = typeof rewardConfig === 'function' ? rewardConfig(event) : rewardConfig;

    const disciplineAdded = rewards.discipline ?? 0;
    const willpowerAdded = rewards.willpower ?? 0;
    const awarenessAdded = rewards.awareness ?? 0;

    if (disciplineAdded > 0 || willpowerAdded > 0 || awarenessAdded > 0) {
      let stats = await this.userStatsRepository.findByUserId(userId);
      if (!stats) {
        stats = new UserStats(userId, 0, 1, 'Novice', 0, new Date(), []);
      }

      stats.addAttributes({
        discipline: disciplineAdded,
        willpower: willpowerAdded,
        awareness: awarenessAdded,
      });

      await this.userStatsRepository.save(stats);
    }
  }
}
