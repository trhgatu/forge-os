import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateMemoryCommand } from './create-memory.command';
import { Inject } from '@nestjs/common';
import { MemoryRepository } from '../../../domain/memory.repository';
import { Memory } from '../../../domain/memory.entity';
import { MemoryId } from '../../../domain/value-objects/memory-id.vo';
import { MemoryModifiedEvent } from '../../events/memory-modified.event';
import { MemoryCreatedEvent } from '../../events/memory-created.event';
import { MemoryStatus, MoodType } from '@shared/enums';

@CommandHandler(CreateMemoryCommand)
export class CreateMemoryHandler implements ICommandHandler<CreateMemoryCommand, Memory> {
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateMemoryCommand): Promise<Memory> {
    const { payload } = command;

    const now = new Date();
    const id = MemoryId.random();

    const memory = Memory.create(
      {
        ...payload,
        title: new Map(Object.entries(payload.title)),
        content: new Map(Object.entries(payload.content)),
        tags: payload.tags ?? [],
        mood: payload.mood ?? MoodType.HAPPY,
        status: payload.status ?? MemoryStatus.INTERNAL,
        userId: payload.userId,
      },
      id,
      now,
    );

    await this.memoryRepo.save(memory);
    this.eventBus.publish(new MemoryModifiedEvent(id, 'create'));
    if (payload.userId) {
      this.eventBus.publish(new MemoryCreatedEvent(id, payload.userId));
    }

    return memory;
  }
}
