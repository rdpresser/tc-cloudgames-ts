import { User } from '../../../../domain/user/user.aggregate';
import { GetUserResponse } from './query.response';

export class GetUserMapper {
    static toResponse(user: User): GetUserResponse {
      return new GetUserResponse(
        user.id,
        user.firstName,
        user.lastName,
        user.email.value,
        user.role.value
      );
  }
}
