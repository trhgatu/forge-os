import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSportCommand } from '../commands/create-sport.command';
import { SportRepository } from '../ports/sport.repository';
import { Inject } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { generateUniqueSlug } from '@shared/utils';
import { Sport } from '../../domain/sport.entity';
import { SportPresenter } from '../../presentation/sport.presenter';
import { SportResponse } from '../../presentation/dto/sport.response';

@CommandHandler(CreateSportCommand)
export class CreateSportHandler
  implements ICommandHandler<CreateSportCommand, SportResponse>
{
  constructor(
    @Inject('SportRepository')
    private readonly sportRepo: SportRepository,
  ) {}

  async execute(command: CreateSportCommand): Promise<SportResponse> {
    const { payload } = command;

    const sport = await Sport.create(
      payload,
      () => new ObjectId().toString(),
      (name) =>
        generateUniqueSlug(name, (slug) => this.sportRepo.existsBySlug(slug)),
    );

    await this.sportRepo.save(sport);
    return SportPresenter.toResponse(sport);
  }
}
