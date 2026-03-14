import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ACTIVITY_STREAM_PORT, IActivityStreamPort } from '@shared/ports/activity-stream.port';
import { ProjectModifiedEvent } from '../../events/project-modified.event';
import { ProjectRepository } from '../../../application/ports/project.repository';
import { LoggerService } from '@shared/logging';

@EventsHandler(ProjectModifiedEvent)
export class ProjectActivityHandler implements IEventHandler<ProjectModifiedEvent> {
  constructor(
    @Inject(ACTIVITY_STREAM_PORT)
    private readonly activityStream: IActivityStreamPort,
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    private readonly logger: LoggerService,
  ) {}

  async handle(event: ProjectModifiedEvent) {
    const { projectId, action, userId } = event;

    const patternMap: Record<string, string> = {
      create: 'engineering.project.created',
      update: 'engineering.project.updated',
      delete: 'engineering.project.deleted',
    };

    const pattern = patternMap[action];

    if (!pattern || !userId) return;

    const project = await this.projectRepository.findById(projectId);
    if (!project) return;

    this.logger.log(`[3] Worker received event: ${event.action} for project ${event.projectId}`);

    const result = await this.activityStream.emit(pattern, String(userId), {
      projectId: projectId.toString(),
      title: project.title,
      action: action,
      timestamp: new Date(),
    });

    this.logger.log(`[4] Stream emitted. Redis ID: ${result}`);
  }
}
