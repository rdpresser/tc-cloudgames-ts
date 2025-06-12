import { User } from 'domain/user';
import { UserByIdResponse } from 'application/use-cases/users/get-by-id';

export class GetUserByIdMapper {
  static toResponse(user: User): UserByIdResponse {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      role: user.role.value,
    };
  }
}
