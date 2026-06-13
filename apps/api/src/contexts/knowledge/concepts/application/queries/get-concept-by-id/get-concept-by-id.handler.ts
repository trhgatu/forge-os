import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetConceptByIdQuery } from './get-concept-by-id.query';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetConceptByIdQuery)
export class GetConceptByIdHandler implements IQueryHandler<GetConceptByIdQuery, any> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetConceptByIdQuery): Promise<any> {
    const { id, userId } = query;

    const concept = await this.prisma.knowledgeConcept.findFirst({
      where: { id, userId },
      include: {
        flashcards: {
          include: {
            vocabulary: true,
          },
        },
      },
    });

    if (!concept) {
      throw new NotFoundException(
        'Tri thức này không tồn tại hoặc không thuộc quyền sở hữu của bạn.',
      );
    }

    return concept;
  }
}
