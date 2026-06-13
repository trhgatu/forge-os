import { Injectable } from '@nestjs/common';
import { Memory } from '../../domain/memory.entity';
import { MemoryResponse } from '../dto/memory.response';

@Injectable()
export class MemoryPresenter {
  toResponse(memory: Memory, lang: string): MemoryResponse {
    const props = memory.toPrimitives(lang);

    return {
      id: props.id,
      title: props.title,
      content: props.content,
      mood: props.mood,
      tags: props.tags ?? [],
      status: props.status,
      createdAt: props.createdAt?.toISOString() ?? '',
      updatedAt: props.updatedAt?.toISOString() ?? '',
      isDeleted: props.isDeleted,
      userId: props.userId,
      imageUrl: props.imageUrl,
      type: props.type,
    };
  }

  toResponseArray(memories: Memory[], lang: string): MemoryResponse[] {
    return memories.map((m) => this.toResponse(m, lang));
  }
}
