import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { SoftDeleteCourtCommand } from '../commands/soft-delete-court.command';
import { CourtRepository } from '../../application/ports/court.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { CourtModifiedEvent } from '../events/court-modified.event';
import { CourtPresenter } from '../../presentation/court.presenter';
import { CourtResponse } from '../../presentation/dto/court.response';

@CommandHandler(SoftDeleteCourtCommand)
export class SoftDeleteCourtHandler
  implements ICommandHandler<SoftDeleteCourtCommand, CourtResponse>
{
  constructor(
    @Inject('CourtRepository')
    private readonly courtRepo: CourtRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SoftDeleteCourtCommand): Promise<CourtResponse> {
    const { id } = command;

    const court = await this.courtRepo.findById(id);
    if (!court) throw new NotFoundException('Court not found');

    court.delete();

    await this.courtRepo.save(court);

    this.eventBus.publish(new CourtModifiedEvent(id, 'soft-delete'));

    return CourtPresenter.toResponse(court);
  }
}
