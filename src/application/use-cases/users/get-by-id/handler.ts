import { GetUserQuery } from './query';
import { User } from '../../../../domain/aggregates/user/user';
import { GetUserResponse } from './response';
import { GetUserMapper } from './mapper';

export class GetUserQueryHandler {
  async handle(query: GetUserQuery): Promise<GetUserResponse> {
    // Simulate fetching user from a repository
    const user = new User(query.id, 'John Doe');

    return GetUserMapper.toResponse(user);
  }
}
