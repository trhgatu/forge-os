// 📁 File: contexts/reflection/memory/application/handlers/create-memory.handler.ts

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMemoryCommand } from '../commands/create-memory.command';
import { Inject } from '@nestjs/common';
import { MemoryRepository } from '../ports/memory.repository';
import { Memory } from '../../domain/memory.entity';
import { MemoryId } from '../../domain/value-objects/memory-id.vo';
import { MemoryPresenter } from '../../presentation/memory.presenter';
import { MemoryResponse } from '../../presentation/dto/memory.response';
import { ObjectId } from 'mongodb';
import { MemoryModifiedEvent } from '../events/memory-modified.event';
import { EventBus } from '@nestjs/cqrs';
import { MemoryStatus, MoodType } from '@shared/enums';

@CommandHandler(CreateMemoryCommand)
export class CreateMemoryHandler
  implements ICommandHandler<CreateMemoryCommand, MemoryResponse>
{
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateMemoryCommand): Promise<MemoryResponse> {
    const { payload, lang } = command;

    const now = new Date();
    const id = MemoryId.create(new ObjectId());

    const memory = Memory.create(
      {
        ...payload,
        title: new Map(Object.entries(payload.title)),
        content: new Map(Object.entries(payload.content)),
        tags: payload.tags ?? [],
        mood: payload.mood ?? MoodType.HAPPY,
        status: payload.status ?? MemoryStatus.INTERNAL,
      },
      id,
      now,
    );

    await this.memoryRepo.save(memory);
    this.eventBus.publish(new MemoryModifiedEvent(id, 'create'));

    return MemoryPresenter.toResponse(memory, lang);
  }
}
