import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { SoftDeleteMemoryCommand } from './soft-delete-memory.command';
import { MemoryRepository } from '../../../domain/memory.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { MemoryModifiedEvent } from '../../events/memory-modified.event';
import { Memory } from '../../../domain/memory.entity';

@CommandHandler(SoftDeleteMemoryCommand)
export class SoftDeleteMemoryHandler implements ICommandHandler<SoftDeleteMemoryCommand, Memory> {
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SoftDeleteMemoryCommand): Promise<Memory> {
    const { id } = command;

    const memory = await this.memoryRepo.findById(id);
    if (!memory) throw new NotFoundException('Memory not found');

    memory.delete();

    await this.memoryRepo.save(memory);

    this.eventBus.publish(new MemoryModifiedEvent(id, 'soft-delete'));

    return memory;
  }
}
