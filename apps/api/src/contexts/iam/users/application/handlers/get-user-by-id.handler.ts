import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../queries';
import { UserRepository } from '../ports/user.repository';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByIdQuery) {
    const { id } = query;
    const user = await this.userRepository.findByIdWithRoleAndPermissions(id);
    // Use findByIdWithRoleAndPermissions to return full detail for single user view
    // Or just findById if that's preferred. The legacy query handler used findById.
    // However, usually detailed view wants roles.
    // Let's stick to findById first to match strict legacy behavior, or upgrade?
    // Let's upgrade to findByIdWithRoleAndPermissions as it's more useful.
    if (!user) throw new UserNotFoundException({ id });
    return user;
  }
}
