import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetQuestByIdQuery } from './get-quest-by-id.query';
import { QuestsRepository } from '../../../domain/quests.repository';
import { Quest } from '../../../domain/quest.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetQuestByIdQuery)
export class GetQuestByIdHandler implements IQueryHandler<GetQuestByIdQuery, Quest> {
  constructor(private readonly repository: QuestsRepository) {}

  async execute(query: GetQuestByIdQuery): Promise<Quest> {
    const quest = await this.repository.findQuestById(query.id);
    if (!quest) {
      throw new NotFoundException('Quest not found');
    }
    return quest;
  }
}
