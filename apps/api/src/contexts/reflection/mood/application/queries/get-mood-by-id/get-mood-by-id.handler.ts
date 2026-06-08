import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMoodByIdQuery } from './get-mood-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { MoodRepository } from '../../../domain/mood.repository';
import { Mood } from '../../../domain/mood.entity';

@QueryHandler(GetMoodByIdQuery)
export class GetMoodByIdHandler implements IQueryHandler<GetMoodByIdQuery, Mood> {
  constructor(
    @Inject('MoodRepository')
    private readonly moodRepo: MoodRepository,
  ) {}

  async execute(query: GetMoodByIdQuery): Promise<Mood> {
    const mood = await this.moodRepo.findById(query.id);
    if (!mood) throw new NotFoundException('Mood not found');
    return mood;
  }
}
