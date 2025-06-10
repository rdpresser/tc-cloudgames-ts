import { GetUserMapper, GetUserQuery, GetUserResponse } from 'application/use-cases/users/get-by-id';
import { User } from 'domain/user';
import { Result, ok, err } from 'neverthrow';
import { BadRequestError, NotFoundError } from 'application/common';
import { isNullOrEmpty } from 'shared/extensions';
import { ZodError } from 'zod/v4';
import { RequestHandler, requestHandler } from 'mediatr-ts';

@requestHandler(GetUserQuery)
export class GetUserQueryHandler
  implements RequestHandler<GetUserQuery, Result<GetUserResponse, ZodError | BadRequestError | NotFoundError>>
{
  async handle(query: GetUserQuery): Promise<Result<GetUserResponse, ZodError | BadRequestError | NotFoundError>> {
    if (!query) {
      return err(new BadRequestError('Invalid query'));
    }

    if (isNullOrEmpty(query.id)) {
      return err(new NotFoundError('User not found'));
    }

    const userResult = await User.create({
      firstName: 'User',
      lastName: 'LastName',
      email: '',
      password: '',
      role: '',
    });

    if (userResult.isOk()) {
      return ok(GetUserMapper.toResponse(userResult.value));
    } else {
      return err(userResult.error);
    }
  }
}
