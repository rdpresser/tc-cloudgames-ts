import { GetUserQuery } from './query';
import { User } from '../../../../domain/aggregates/user/user';
import { GetUserResponse } from './response';
import { GetUserMapper } from './mapper';
import { ResultAsync, okAsync, errAsync } from 'neverthrow';
import { BadRequestError, NotFoundError } from '../../../abstractions/custom-results/custom-result';
import { isNullOrEmpty } from '../../../../infrastructure/cross-cutting/commons/extensions/string-extensions';
import { ValidationFailure } from 'fluent-ts-validator';

export class GetUserQueryHandler {
  handle(query: GetUserQuery): ResultAsync<GetUserResponse, ValidationFailure[] | BadRequestError | NotFoundError> {

    // Simulate async fetching user from a repository
    if (!query) {
      return errAsync(new BadRequestError('Invalid query'));
    }

    if (isNullOrEmpty(query.id) ) {
      return errAsync(new NotFoundError('User not found'));
    }

    // Here you would typically fetch the user from a database or repository
    //const userResult = User.create({ id: query.id, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password', role: 'user' }); // Simulated user
    const userResult = User.create({ id: query.id, firstName: '', lastName: '', email: '', password: '', role: 'asdasd' }); // Simulated user

    if (userResult.isErr()) {
      return errAsync(userResult.error);
    }

    return okAsync(GetUserMapper.toResponse(userResult.value));
  }
}
