import { Injectable, OnModuleInit, OnModuleDestroy, Inject, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class StreamBridgeService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(StreamBridgeService.name);
  private readonly STREAM_KEY = 'forge:activities';
  private readonly GROUP_NAME = 'bridge_group';
  private readonly CONSUMER_NAME = `bridge_worker_${process.pid}`;

  private subscriber!: Redis;
  private isDestroyed = false;

  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    @InjectQueue('xp_awarding') private readonly xpQueue: Queue,
  ) {}

  async onModuleInit() {
    this.subscriber = this.redis.duplicate();
    await this.setupGroup();
    void this.pollStream();

    //logger must delete when finish coding
    this.logger.log('Stream Bridge is active and polling...');
  }

  onModuleDestroy() {
    this.isDestroyed = true;
    if (this.subscriber) {
      void this.subscriber.quit();
    }
  }

  private async setupGroup() {
    try {
      await this.redis.xgroup('CREATE', this.STREAM_KEY, this.GROUP_NAME, '$', 'MKSTREAM');
    } catch (e: any) {
      if (!e.message.includes('BUSYGROUP')) {
        this.logger.error('Failed to setup Redis Group', e.stack);
      }
    }
  }

  private async pollStream(): Promise<void> {
    while (!this.isDestroyed) {
      try {
        const result = (await this.subscriber.xreadgroup(
          'GROUP',
          this.GROUP_NAME,
          this.CONSUMER_NAME,
          'COUNT',
          '10',
          'BLOCK',
          '5000',
          'STREAMS',
          this.STREAM_KEY,
          '>',
        )) as [string, [string, string[]][]][] | null;

        if (!result || !Array.isArray(result)) continue;

        for (const streamData of result) {
          const [, messages] = streamData;

          for (const message of messages) {
            const [id, fields] = message;
            const rawEvent = fields[1];

            if (typeof rawEvent === 'string') {
              const event = JSON.parse(rawEvent) as Record<string, any>;
              await this.handleEvent(event);
              await this.redis.xack(this.STREAM_KEY, this.GROUP_NAME, id);
            }
          }
        }
      } catch (error: unknown) {
        const errorStack = error instanceof Error ? error.stack : String(error);
        this.logger.error('Stream Bridge Polling Error', errorStack);
        await new Promise((res) => setTimeout(res, 5000));
      }
    }
  }

  private async handleEvent(event: Record<string, any>): Promise<void> {
    const pattern = String(event.pattern || '');
    //logger must delete when finish coding
    this.logger.debug(`Dispatching event to BullMQ: ${pattern}`);

    if (pattern.startsWith('engineering.')) {
      await this.xpQueue.add(pattern, event);
      this.logger.debug(`[BullMQ] Job added to xp_awarding: ${pattern}`);
    }
  }
}
