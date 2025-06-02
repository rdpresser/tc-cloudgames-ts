import { User } from '../../../../domain/aggregates/user/user';
import { GetUserResponse } from './response';

export class GetUserMapper {
  static toResponse(user: User): GetUserResponse {
    return new GetUserResponse(user.id, user.name);
  }

  static toDomain(response: GetUserResponse): User {
    return new User(response.id, response.name);
  }
}
