import { Memory } from '../domain/memory.entity';
import { MemoryResponse } from '../presentation/dto/memory.response';

export class MemoryPresenter {
  static toResponse(memory: Memory, lang: string): MemoryResponse {
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
    };
  }
}
