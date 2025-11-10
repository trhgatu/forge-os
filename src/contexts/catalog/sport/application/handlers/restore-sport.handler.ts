import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { RestoreSportCommand } from '../commands/restore-sport.command';
import { SportRepository } from '../../application/ports/sport.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { SportModifiedEvent } from '../events/sport-modified.event';
import { SportPresenter } from '../../presentation/sport.presenter';
import { SportResponse } from '../../presentation/dto/sport.response';

@CommandHandler(RestoreSportCommand)
export class RestoreSportHandler
  implements ICommandHandler<RestoreSportCommand, SportResponse>
{
  constructor(
    @Inject('SportRepository')
    private readonly sportRepo: SportRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RestoreSportCommand): Promise<SportResponse> {
    const { id } = command;

    const sport = await this.sportRepo.findById(id);
    if (!sport) throw new NotFoundException('Sport not found');

    sport.restore();

    await this.sportRepo.save(sport);

    this.eventBus.publish(new SportModifiedEvent(id, 'restore'));

    return SportPresenter.toResponse(sport);
  }
}
