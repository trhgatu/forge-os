import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';

import { UpdateJournalCommand } from '../commands/update-journal.command';
import { JournalRepository } from '../../application/ports/journal.repository';
import { JournalModifiedEvent } from '../events/journal-modified.event';

import { JournalPresenter } from '../../presentation/journal.presenter';
import { JournalResponse } from '../../presentation/dto/journal.response';
import { CacheService } from '@shared/services';
import { LoggerService } from '@shared/logging/logger.service';

@CommandHandler(UpdateJournalCommand)
export class UpdateJournalHandler
  implements ICommandHandler<UpdateJournalCommand, JournalResponse>
{
  constructor(
    @Inject('JournalRepository')
    private readonly journalRepo: JournalRepository,

    private readonly eventBus: EventBus,
    private readonly cacheService: CacheService,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: UpdateJournalCommand): Promise<JournalResponse> {
    const { id, payload } = command;

    const journal = await this.journalRepo.findById(id);
    if (!journal) {
      throw new NotFoundException('Journal not found');
    }

    journal.updateInfo(payload);

    await this.journalRepo.save(journal);

    // Invalidate all journal public cache
    await this.cacheService.deleteByPattern('journals:public:*');

    this.eventBus.publish(new JournalModifiedEvent(id, 'update'));
    this.logger.log(
      `Updated Journal ${id.toString()}`,
      UpdateJournalHandler.name,
    );

    return JournalPresenter.toResponse(journal);
  }
}
