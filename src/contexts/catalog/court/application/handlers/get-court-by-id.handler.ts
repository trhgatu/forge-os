import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCourtByIdQuery } from '../queries/get-court-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { CourtRepository } from '../../application/ports/court.repository';
import { CourtResponse } from '../../presentation/dto/court.response';
import { CourtPresenter } from '../../presentation/court.presenter';

@QueryHandler(GetCourtByIdQuery)
export class GetCourtByIdHandler implements IQueryHandler<GetCourtByIdQuery> {
  constructor(
    @Inject('CourtRepository')
    private readonly courtRepo: CourtRepository,
  ) {}

  async execute(query: GetCourtByIdQuery): Promise<CourtResponse> {
    const { id } = query;

    const court = await this.courtRepo.findById(id);
    if (!court) throw new NotFoundException('Court not found');

    return CourtPresenter.toResponse(court);
  }
}
