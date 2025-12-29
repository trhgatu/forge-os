import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectCreatedEvent } from '../../../engineering/project/domain/events/project-created.event';
import { AwardXpCommand } from '../commands/award-xp.command';

@Injectable()
export class GamificationSagas {
  @Saga()
  projectCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProjectCreatedEvent),
      map((event) => {
        // Ensure userId is string (handle Value Object from Domain)
        const userId: string =
          typeof event.userId === 'object' && 'value' in (event.userId as any)
            ? (event.userId as any).value
            : String(event.userId);

        // Award 50 XP for creating a project
        return new AwardXpCommand(
          userId,
          50,
          'project-creation',
          `Created project: ${event.title}`,
        );
      }),
    );
  };
}
