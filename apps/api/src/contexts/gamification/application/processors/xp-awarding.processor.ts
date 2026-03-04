import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AwardXpCommand } from '../commands/award-xp.command';

@Processor('xp_awarding')
export class XpAwardingProcessor extends WorkerHost {
  private readonly logger = new Logger(XpAwardingProcessor.name);

  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    const data = job.data as {
      pattern: string;
      userId: { value: string };
      payload: { title: string };
    };

    const { pattern, userId, payload } = data;
    const targetUserId: string = String(userId?.value || '');

    if (!targetUserId) {
      this.logger.warn(`[XP-Worker] Skip processing: Missing UserID in job ${job.id}`);
      return;
    }

    this.logger.log(`[XP-Worker] Processing reward for: ${pattern}`);

    if (pattern === 'engineering.project.created') {
      await this.commandBus.execute(
        new AwardXpCommand(targetUserId, 100, `Created project: ${payload?.title || 'Unknown'}`),
      );

      this.logger.log(`[Success] 100 XP awarded to ${targetUserId}`);
    }
  }
}
