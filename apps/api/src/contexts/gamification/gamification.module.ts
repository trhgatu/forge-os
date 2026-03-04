import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BullModule } from '@nestjs/bullmq';
import { MongooseModule } from '@nestjs/mongoose';
import { GamificationController } from './presentation/gamification.controller';
import { AuthModule } from '../iam/auth/auth.module';
import { MongoUserStatsRepository } from './infrastructure/mongo-user-stats.repository';
import { UserStatsModel, UserStatsSchema } from './infrastructure/user-stats.schema';
import { AwardXpHandler } from './application/handlers/award-xp.handler';
import { GetUserStatsHandler } from './application/queries/get-user-stats.query';
import { GamificationGateway } from './presentation/gamification.gateway';
import { XpAwardingProcessor } from './application/processors/xp-awarding.processor';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: UserStatsModel.name, schema: UserStatsSchema }]),
    AuthModule,
    BullModule.registerQueue({
      name: 'xp_awarding',
    }),
  ],
  controllers: [GamificationController],
  providers: [
    AwardXpHandler,
    GetUserStatsHandler,
    GamificationGateway,
    XpAwardingProcessor,
    {
      provide: 'UserStatsRepository',
      useClass: MongoUserStatsRepository,
    },
  ],
})
export class GamificationModule {}
