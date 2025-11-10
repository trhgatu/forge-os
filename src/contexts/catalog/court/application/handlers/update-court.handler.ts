import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateCourtCommand } from '../commands/update-court.command';
import { CourtRepository } from '../../application/ports/court.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { CourtModifiedEvent } from '../events/court-modified.event';
import { CourtPresenter } from '../../presentation/court.presenter';
import { CourtResponse } from '../../presentation/dto/court.response';

@CommandHandler(UpdateCourtCommand)
export class UpdateCourtHandler
  implements ICommandHandler<UpdateCourtCommand, CourtResponse>
{
  constructor(
    @Inject('CourtRepository')
    private readonly courtRepo: CourtRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateCourtCommand): Promise<CourtResponse> {
    const { id, payload } = command;

    const court = await this.courtRepo.findById(id);
    if (!court) throw new NotFoundException('Court not found');

    court.updateInfo(payload);

    await this.courtRepo.save(court);

    this.eventBus.publish(new CourtModifiedEvent(id, 'update'));

    return CourtPresenter.toResponse(court);
  }
}
