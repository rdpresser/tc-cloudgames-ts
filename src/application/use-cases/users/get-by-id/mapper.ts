import { User } from '../../../../domain/aggregates/user/user';
import { GetUserResponse } from './response';

export class GetUserMapper {
    static toResponse(user: User): GetUserResponse {
      return new GetUserResponse(
        user.id,
        user.firstName,
        user.lastName,
        user.email.value,
        user.role
      );
  }
}
