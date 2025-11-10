import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateSportCommand } from '../commands/update-sport.command';
import { SportRepository } from '../../application/ports/sport.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { SportModifiedEvent } from '../events/sport-modified.event';
import { SportPresenter } from '../../presentation/sport.presenter';
import { SportResponse } from '../../presentation/dto/sport.response';

@CommandHandler(UpdateSportCommand)
export class UpdateSportHandler
  implements ICommandHandler<UpdateSportCommand, SportResponse>
{
  constructor(
    @Inject('SportRepository')
    private readonly sportRepo: SportRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateSportCommand): Promise<SportResponse> {
    const { id, payload } = command;

    const sport = await this.sportRepo.findById(id);
    if (!sport) throw new NotFoundException('Sport not found');

    sport.updateInfo(payload);

    await this.sportRepo.save(sport);

    this.eventBus.publish(new SportModifiedEvent(id, 'update'));

    return SportPresenter.toResponse(sport);
  }
}
