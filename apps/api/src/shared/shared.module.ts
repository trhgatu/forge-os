// src/shared/shared.module.ts
import { Module, Global } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { RedisProvider } from '@config/redis.provider';
import { PrismaService } from './insfrastructure/prisma/prisma.service';
import { IdGenerator } from './application/ports/id-generator.port';
import { MongoIdGeneratorAdapter } from './insfrastructure/generators/uuid-generator.adapter';
@Global()
@Module({
  providers: [
    RedisProvider,
    CacheService,
    PrismaService,
    {
      provide: IdGenerator,
      useClass: MongoIdGeneratorAdapter,
    },
  ],
  exports: [CacheService, PrismaService, IdGenerator],
})
export class SharedModule {}
