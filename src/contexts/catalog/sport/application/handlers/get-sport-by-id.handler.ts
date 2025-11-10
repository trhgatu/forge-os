import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSportByIdQuery } from '../queries/get-sport-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { SportRepository } from '../../application/ports/sport.repository';
import { SportResponse } from '../../presentation/dto/sport.response';
import { SportPresenter } from '../../presentation/sport.presenter';

@QueryHandler(GetSportByIdQuery)
export class GetSportByIdHandler implements IQueryHandler<GetSportByIdQuery> {
  constructor(
    @Inject('SportRepository')
    private readonly sportRepo: SportRepository,
  ) {}

  async execute(query: GetSportByIdQuery): Promise<SportResponse> {
    const { id } = query;

    const sport = await this.sportRepo.findById(id);
    if (!sport) throw new NotFoundException('Sport not found');

    return SportPresenter.toResponse(sport);
  }
}
