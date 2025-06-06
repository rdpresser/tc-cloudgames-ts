import { GetUserQuery } from './query-params';
import { User } from '../../../../domain/aggregates/user/user';
import { GetUserResponse } from './query-response';
import { GetUserMapper } from './query-mapper';
import { ResultAsync, errAsync } from 'neverthrow';
import { BadRequestError, NotFoundError } from '../../../../interfaces/custom-results/custom-result';
import { isNullOrEmpty } from '../../../../infrastructure/cross-cutting/commons/extensions/string-extensions';
import { z } from 'zod/v4';

export class GetUserQueryHandler {
  handle(query: GetUserQuery): ResultAsync<GetUserResponse, z.ZodError | BadRequestError | NotFoundError> {
    if (!query) {
      return errAsync(new BadRequestError('Invalid query'));
    }

    if (isNullOrEmpty(query.id)) {
      return errAsync(new NotFoundError('User not found'));
    }

    // Chain the ResultAsync from User.create
    return User.create({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'asdasd'
    })
    .map(userDomain => GetUserMapper.toResponse(userDomain))
    .mapErr(error => {
      // You can transform or wrap the error here if needed
      return error;
    });
  }
}
