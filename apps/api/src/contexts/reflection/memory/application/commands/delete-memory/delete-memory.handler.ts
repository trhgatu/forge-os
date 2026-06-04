import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMemoryCommand } from './delete-memory.command';
import { MemoryRepository } from '../../../domain/memory.repository';
import { EventBus } from '@nestjs/cqrs';
import { MemoryModifiedEvent } from '../../events/memory-modified.event';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteMemoryCommand)
export class DeleteMemoryHandler implements ICommandHandler<DeleteMemoryCommand> {
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteMemoryCommand): Promise<void> {
    const { id } = command;
    const memory = await this.memoryRepo.findById(id);

    if (!memory) throw new NotFoundException('Memory not found');

    await this.memoryRepo.delete(id);

    this.eventBus.publish(new MemoryModifiedEvent(id, 'delete'));
  }
}
