import { GetUserMapper, GetUserQuery, GetUserResponse } from 'application/use-cases/users/get-by-id';
import { User } from 'domain/user';
import { ResultAsync, errAsync } from 'neverthrow';
import { BadRequestError, NotFoundError } from 'application/common';
import { isNullOrEmpty } from 'shared/extensions';
import { ZodError } from 'zod/v4';

export class GetUserQueryHandler {
  handle(query: GetUserQuery): ResultAsync<GetUserResponse, ZodError | BadRequestError | NotFoundError> {
    if (!query) {
      return errAsync(new BadRequestError('Invalid query'));
    }

    if (isNullOrEmpty(query.id)) {
      return errAsync(new NotFoundError('User not found'));
    }

    return ResultAsync.fromPromise(
      Promise.resolve(
        User.create({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: '',
        }),
      ),
      (e) => e as ZodError | BadRequestError | NotFoundError,
    ).map((userResult) => {
      // If User.create returns a Result, extract the value
      if (userResult.isOk()) {
        return GetUserMapper.toResponse(userResult.value);
      } else {
        throw userResult.error;
      }
    });
  }
}
