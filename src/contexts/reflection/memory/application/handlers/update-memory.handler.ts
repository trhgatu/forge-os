import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateMemoryCommand } from '../commands/update-memory.command';
import { MemoryRepository } from '../../application/ports/memory.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { MemoryModifiedEvent } from '../events/memory-modified.event';
import { MemoryPresenter } from '../../presentation/memory.presenter';
import { MemoryResponse } from '../../presentation/dto/memory.response';

@CommandHandler(UpdateMemoryCommand)
export class UpdateMemoryHandler
  implements ICommandHandler<UpdateMemoryCommand, MemoryResponse>
{
  constructor(
    @Inject('MemoryRepository')
    private readonly memoryRepo: MemoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateMemoryCommand): Promise<MemoryResponse> {
    const { id, payload, lang } = command;

    const memory = await this.memoryRepo.findById(id);
    if (!memory) throw new NotFoundException('Memory not found');

    const mappedPayload = {
      ...payload,
      title: payload.title ? new Map(Object.entries(payload.title)) : undefined,
      content: payload.content
        ? new Map(Object.entries(payload.content))
        : undefined,
    };

    memory.updateInfo(mappedPayload);

    await this.memoryRepo.save(memory);

    this.eventBus.publish(new MemoryModifiedEvent(id, 'update'));

    return MemoryPresenter.toResponse(memory, lang);
  }
}
