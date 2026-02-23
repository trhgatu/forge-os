import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMemoryCommand } from '../commands/delete-memory.command';
import { MemoryRepository } from '../../application/ports/memory.repository';
import { EventBus } from '@nestjs/cqrs';
import { MemoryModifiedEvent } from '../events/memory-modified.event';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteMemoryCommand)
export class DeleteMemoryHandler
  implements ICommandHandler<DeleteMemoryCommand>
{
  constructor(
    @Inject('MemoryRepository') private readonly memoryRepo: MemoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteMemoryCommand): Promise<void> {
    const { id } = command;
    const court = await this.memoryRepo.findById(id);

    if (!court) throw new NotFoundException('Court not found');

    await this.memoryRepo.delete(id);

    this.eventBus.publish(new MemoryModifiedEvent(id, 'delete'));
  }
}
