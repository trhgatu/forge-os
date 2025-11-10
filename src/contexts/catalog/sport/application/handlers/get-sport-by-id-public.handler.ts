import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSportByIdForPublicQuery } from '../queries/get-sport-by-id-public.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { SportRepository } from '../ports/sport.repository';
import { SportPresenter } from '../../presentation/sport.presenter';
import { SportResponse } from '../../presentation/dto/sport.response';

@QueryHandler(GetSportByIdForPublicQuery)
export class GetSportByIdForPublicHandler
  implements IQueryHandler<GetSportByIdForPublicQuery, SportResponse>
{
  constructor(
    @Inject('SportRepository')
    private readonly sportRepo: SportRepository,
  ) {}

  async execute(query: GetSportByIdForPublicQuery): Promise<SportResponse> {
    const { id } = query;
    const sport = await this.sportRepo.findById(id);

    if (!sport || sport.isSportDeleted) {
      throw new NotFoundException('Sport not found');
    }

    return SportPresenter.toResponse(sport);
  }
}
