import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { RestoreMemoryCommand } from './restore-memory.command';
import { MemoryRepository } from '../../../domain/memory.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { MemoryModifiedEvent } from '../../events/memory-modified.event';
import { Memory } from '../../../domain/memory.entity';

@CommandHandler(RestoreMemoryCommand)
export class RestoreMemoryHandler implements ICommandHandler<RestoreMemoryCommand, Memory> {
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RestoreMemoryCommand): Promise<Memory> {
    const { id } = command;

    const memory = await this.memoryRepo.findById(id);
    if (!memory) throw new NotFoundException('Memory not found');

    memory.restore();

    await this.memoryRepo.save(memory);

    this.eventBus.publish(new MemoryModifiedEvent(id, 'restore'));

    return memory;
  }
}
