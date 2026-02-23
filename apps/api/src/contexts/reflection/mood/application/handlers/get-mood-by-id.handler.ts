import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMoodByIdQuery } from '../queries';
import { Inject, NotFoundException } from '@nestjs/common';
import { MoodRepository } from '../ports/mood.repository';
import { MoodPresenter } from '../../presentation/mood.presenter';
import { MoodResponse } from '../../presentation/dto/mood.response';

@QueryHandler(GetMoodByIdQuery)
export class GetMoodByIdHandler implements IQueryHandler<GetMoodByIdQuery, MoodResponse> {
  constructor(
    @Inject('MoodRepository')
    private readonly moodRepo: MoodRepository,
  ) {}

  async execute(query: GetMoodByIdQuery): Promise<MoodResponse> {
    const mood = await this.moodRepo.findById(query.id);
    if (!mood) throw new NotFoundException('Mood not found');
    return MoodPresenter.toResponse(mood);
  }
}
