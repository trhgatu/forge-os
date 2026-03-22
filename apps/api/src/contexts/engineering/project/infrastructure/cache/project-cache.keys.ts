import { ProjectFilter } from '../../application/queries/project-filter';
import { ProjectId } from '../../domain/value-objects/project-id.vo';

export class ProjectCacheKeys {
  static GET_ALL_PUBLIC(
    version: string,
    page: number,
    limit: number,
    payload?: ProjectFilter,
  ): string {
    return `projects:v${version}:public:p${page}:l${limit}:${JSON.stringify(payload)}`;
  }

  static GET_ALL_ADMIN(
    version: string,
    page: number,
    limit: number,
    payload?: ProjectFilter,
  ): string {
    return `projects:v${version}:admin:p${page}:l${limit}:${JSON.stringify(payload)}`;
  }

  static GET_BY_ID(id: ProjectId | string) {
    return `projects:id:${id.toString()}`;
  }
}
