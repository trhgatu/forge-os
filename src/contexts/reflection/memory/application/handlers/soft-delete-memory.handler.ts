import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { SoftDeleteMemoryCommand } from '../commands/soft-delete-memory.command';
import { MemoryRepository } from '../../application/ports/memory.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { MemoryModifiedEvent } from '../events/memory-modified.event';
import { MemoryPresenter } from '../../presentation/memory.presenter';
import { MemoryResponse } from '../../presentation/dto/memory.response';

@CommandHandler(SoftDeleteMemoryCommand)
export class SoftDeleteMemoryHandler
  implements ICommandHandler<SoftDeleteMemoryCommand, MemoryResponse>
{
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SoftDeleteMemoryCommand): Promise<MemoryResponse> {
    const { id, lang } = command;

    const memory = await this.memoryRepo.findById(id);
    if (!memory) throw new NotFoundException('Memory not found');

    memory.delete();

    await this.memoryRepo.save(memory);

    this.eventBus.publish(new MemoryModifiedEvent(id, 'soft-delete'));

    return MemoryPresenter.toResponse(memory, lang);
  }
}
