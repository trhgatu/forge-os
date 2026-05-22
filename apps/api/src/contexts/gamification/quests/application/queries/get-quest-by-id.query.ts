import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { QuestsRepository } from '../../domain/quests.repository';
import { Quest } from '../../domain/quest.entity';
import { NotFoundException } from '@nestjs/common';

export class GetQuestByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetQuestByIdQuery)
export class GetQuestByIdHandler implements IQueryHandler<GetQuestByIdQuery> {
  constructor(private readonly repository: QuestsRepository) {}

  async execute(query: GetQuestByIdQuery): Promise<Quest> {
    const quest = await this.repository.findQuestById(query.id);
    if (!quest) {
      throw new NotFoundException('Quest not found');
    }
    return quest;
  }
}
