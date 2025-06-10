import { User } from 'domain/user';
import { GetUserResponse } from 'application/use-cases/users/get-by-id';

export class GetUserMapper {
  static toResponse(user: User): GetUserResponse {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      role: user.role.value,
    };
  }
}
