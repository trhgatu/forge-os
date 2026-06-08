import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateMemoryCommand } from './update-memory.command';
import { MemoryRepository } from '../../../domain/memory.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { MemoryModifiedEvent } from '../../events/memory-modified.event';
import { Memory } from '../../../domain/memory.entity';

@CommandHandler(UpdateMemoryCommand)
export class UpdateMemoryHandler implements ICommandHandler<UpdateMemoryCommand, Memory> {
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateMemoryCommand): Promise<Memory> {
    const { id, payload } = command;

    const memory = await this.memoryRepo.findById(id);
    if (!memory) throw new NotFoundException('Memory not found');

    const mappedPayload = {
      ...payload,
      title: payload.title ? new Map(Object.entries(payload.title)) : undefined,
      content: payload.content ? new Map(Object.entries(payload.content)) : undefined,
    };

    memory.updateInfo(mappedPayload);

    await this.memoryRepo.save(memory);

    this.eventBus.publish(new MemoryModifiedEvent(id, 'update'));

    return memory;
  }
}
