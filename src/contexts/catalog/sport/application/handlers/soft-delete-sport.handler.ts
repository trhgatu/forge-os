import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { SoftDeleteSportCommand } from '../commands/soft-delete-sport.command';
import { SportRepository } from '../../application/ports/sport.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { SportModifiedEvent } from '../events/sport-modified.event';
import { SportPresenter } from '../../presentation/sport.presenter';
import { SportResponse } from '../../presentation/dto/sport.response';

@CommandHandler(SoftDeleteSportCommand)
export class SoftDeleteSportHandler
  implements ICommandHandler<SoftDeleteSportCommand, SportResponse>
{
  constructor(
    @Inject('SportRepository')
    private readonly sportRepo: SportRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SoftDeleteSportCommand): Promise<SportResponse> {
    const { id } = command;

    const sport = await this.sportRepo.findById(id);
    if (!sport) throw new NotFoundException('Sport not found');

    sport.delete();

    await this.sportRepo.save(sport);

    this.eventBus.publish(new SportModifiedEvent(id, 'soft-delete'));

    return SportPresenter.toResponse(sport);
  }
}
