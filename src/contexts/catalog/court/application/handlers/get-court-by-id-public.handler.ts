import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCourtByIdForPublicQuery } from '../queries/get-court-by-id-public.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { CourtRepository } from '../../application/ports/court.repository';
import { CourtResponse } from '../../presentation/dto/court.response';
import { CourtPresenter } from '../../presentation/court.presenter';

@QueryHandler(GetCourtByIdForPublicQuery)
export class GetCourtByIdForPublicHandler
  implements IQueryHandler<GetCourtByIdForPublicQuery, CourtResponse>
{
  constructor(
    @Inject('CourtRepository')
    private readonly courtRepo: CourtRepository,
  ) {}

  async execute(query: GetCourtByIdForPublicQuery): Promise<CourtResponse> {
    const { id } = query;
    const court = await this.courtRepo.findById(id);

    if (!court || court.isCourtDeleted) {
      throw new NotFoundException('Court not found');
    }

    return CourtPresenter.toResponse(court);
  }
}
