import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { RestoreMemoryCommand } from '../commands/restore-memory.command';
import { MemoryRepository } from '../../application/ports/memory.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { MemoryModifiedEvent } from '../events/memory-modified.event';
import { MemoryPresenter } from '../../presentation/memory.presenter';
import { MemoryResponse } from '../../presentation/dto/memory.response';

@CommandHandler(RestoreMemoryCommand)
export class RestoreMemoryHandler
  implements ICommandHandler<RestoreMemoryCommand, MemoryResponse>
{
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RestoreMemoryCommand): Promise<MemoryResponse> {
    const { id, lang } = command;

    const memory = await this.memoryRepo.findById(id);
    if (!memory) throw new NotFoundException('memory not found');

    memory.restore();

    await this.memoryRepo.save(memory);

    this.eventBus.publish(new MemoryModifiedEvent(id, 'restore'));

    return MemoryPresenter.toResponse(memory, lang);
  }
}
