import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { MoodSchema } from './infrastructure/mood.schema';
import { SharedModule } from '@shared/shared.module';
import { MoodHandlers } from './application/handlers';
import { MongoMoodRepository } from './infrastructure/repositories/mongo-mood.repository';
import { MoodAdminController } from './presentation/controllers/mood.admin.controller';
import { MoodPublicController } from './presentation/controllers/mood.public.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Mood', schema: MoodSchema }]),
    CqrsModule,
    SharedModule,
  ],
  controllers: [MoodAdminController, MoodPublicController],
  providers: [
    {
      provide: 'MoodRepository',
      useClass: MongoMoodRepository,
    },
    MongoMoodRepository,
    ...MoodHandlers,
  ],
})
export class MoodModule {}
