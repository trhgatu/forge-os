import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCourtCommand } from '../commands/create-court.command';
import { CourtRepository } from '../../application/ports/court.repository';
import { Court } from '../../domain/court.entity';
import { ObjectId } from 'mongodb';
import { Inject } from '@nestjs/common';
import { generateUniqueSlug } from '@shared/utils';
import { CourtPresenter } from '../../presentation/court.presenter';
import { CourtResponse } from '../../presentation/dto/court.response';

@CommandHandler(CreateCourtCommand)
export class CreateCourtHandler
  implements ICommandHandler<CreateCourtCommand, CourtResponse>
{
  constructor(
    @Inject('CourtRepository')
    private readonly courtRepo: CourtRepository,
  ) {}

  async execute(command: CreateCourtCommand): Promise<CourtResponse> {
    const { payload } = command;

    const court = await Court.create(
      payload,
      payload.venueId,
      () => new ObjectId().toString(),
      (name) =>
        generateUniqueSlug(name, (slug) => this.courtRepo.existsBySlug(slug)),
    );

    await this.courtRepo.save(court);
    return CourtPresenter.toResponse(court);
  }
}
