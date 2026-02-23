import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { GamificationController } from './presentation/gamification.controller';
import { AuthModule } from '../iam/auth/auth.module';
import { MongoUserStatsRepository } from './infrastructure/mongo-user-stats.repository';
import {
  UserStatsModel,
  UserStatsSchema,
} from './infrastructure/user-stats.schema';
import { AwardXpHandler } from './application/handlers/award-xp.handler';
import { GamificationSagas } from './application/sagas/gamification.sagas';
import { GetUserStatsHandler } from './application/queries/get-user-stats.query';
import { GamificationGateway } from './presentation/gamification.gateway';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: UserStatsModel.name, schema: UserStatsSchema },
    ]),
    AuthModule,
  ],
  controllers: [GamificationController],
  providers: [
    AwardXpHandler,
    GetUserStatsHandler,
    GamificationSagas,
    GamificationGateway,
    {
      provide: 'UserStatsRepository',
      useClass: MongoUserStatsRepository,
    },
  ],
})
export class GamificationModule {}
