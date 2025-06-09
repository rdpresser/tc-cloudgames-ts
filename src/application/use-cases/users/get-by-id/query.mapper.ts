import { User } from 'domain/user';
import { GetUserResponse } from './';

export class GetUserMapper {
  static toResponse(user: User): GetUserResponse {
    return new GetUserResponse(user.id, user.firstName, user.lastName, user.email.value, user.role.value);
  }
}
