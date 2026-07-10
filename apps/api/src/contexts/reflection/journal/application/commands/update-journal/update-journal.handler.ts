import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { NotFoundException, Inject } from '@nestjs/common';
import { UpdateJournalCommand } from './update-journal.command';
import { JournalRepository } from '../../../domain/journal.repository';
import { Journal } from '../../../domain/journal.entity';
import { JournalStatus } from '../../../domain/enums';
import { CacheService } from '@shared/services';
import { JournalCreatedEvent } from '../../events/journal-created.event';

@CommandHandler(UpdateJournalCommand)
export class UpdateJournalHandler implements ICommandHandler<UpdateJournalCommand, Journal> {
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,
    private readonly cacheService: CacheService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateJournalCommand): Promise<Journal> {
    const { id, payload } = command;

    const journal = await this.journalRepo.findById(id, payload.userId);

    if (!journal) {
      throw new NotFoundException(`Journal with ID ${id} not found`);
    }

    const previousStatus = journal.status;

    if (payload.content !== undefined || payload.title !== undefined) {
      journal.updateContent(payload.content ?? journal.content, payload.title);
    }

    if (payload.mood) {
      journal.changeMood(payload.mood);
    }

    if (payload.status) {
      const status = payload.status as JournalStatus;
      if (status === JournalStatus.PUBLISHED) journal.publish();
      if (status === JournalStatus.ARCHIVED) journal.archive();
    }

    if (payload.tags) {
      journal.addTags(payload.tags);
    }

    if (payload.analysis) {
      journal.updateAnalysis(payload.analysis);
    }

    journal.setUpdatedBy(payload.userId);

    await this.journalRepo.save(journal);

    await this.cacheService.deleteByPattern('journals:*');

    // Trigger completion only when transitioned to published (sealed)
    if (previousStatus !== JournalStatus.PUBLISHED && journal.status === JournalStatus.PUBLISHED) {
      await this.eventBus.publish(
        new JournalCreatedEvent(journal.id, journal.userId, journal.title ?? ''),
      );
    }

    return journal;
  }
}
