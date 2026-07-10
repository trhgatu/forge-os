import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceptPresenter {
  toResponse(concept: any) {
    const data = typeof concept.toPersistence === 'function' ? concept.toPersistence() : concept;
    return {
      id: data.id,
      userId: data.userId,
      title: data.title,
      sourceType: data.sourceType,
      sourceUrl: data.sourceUrl,
      content: data.content,
      summary: data.summary,
      insights: data.insights,
      reflection: data.reflection,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      _count: data._count,
      flashcards: data.flashcards,
    };
  }

  toResponseArray(concepts: any[]) {
    return concepts.map((c) => this.toResponse(c));
  }
}
