import { User } from 'domain/user';
import { GetUserResponse } from 'application/use-cases/users/get-by-id';

export class GetUserMapper {
  static toResponse(user: User): GetUserResponse {
    return new GetUserResponse(user.id, user.firstName, user.lastName, user.email.value, user.role.value);
  }
}
