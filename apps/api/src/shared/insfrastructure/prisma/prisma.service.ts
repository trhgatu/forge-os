import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@forgeos/database';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Forge OS: Database connected with MongoDB');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(`💥 MongoDB connection failed: ${message}`);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('🔌 Database disconnected');
  }
}
