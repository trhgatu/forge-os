import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TimelinePublicController } from './presentation/controllers';
import { GetTimelineHandler } from './application/queries';
import { TimelinePresenter } from './presentation/presenters/timeline.presenter';

@Module({
  imports: [CqrsModule],
  controllers: [TimelinePublicController],
  providers: [GetTimelineHandler, TimelinePresenter],
})
export class TimelineModule {}
