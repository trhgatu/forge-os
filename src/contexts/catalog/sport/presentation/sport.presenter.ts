import { Sport } from '../domain/sport.entity';
import { SportResponse } from '../presentation/dto/sport.response';

export class SportPresenter {
  static toResponse(sport: Sport): SportResponse {
    const props = sport.toPrimitives();

    return {
      id: props.id,
      name: props.name,
      slug: props.slug,
      description: props.description,
      icon: props.icon,
      status: props.status,
      sortOrder: props.sortOrder,
      createdAt: props.createdAt?.toISOString() ?? '',
      updatedAt: props.updatedAt?.toISOString() ?? '',
      isDeleted: props.isDeleted,
    };
  }
}
