import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TimelinePublicController } from './presentation/controllers';
import { GetTimelineHandler } from './application/queries';

@Module({
  imports: [CqrsModule],
  controllers: [TimelinePublicController],
  providers: [GetTimelineHandler],
})
export class TimelineModule {}
