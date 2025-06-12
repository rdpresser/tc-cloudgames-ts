import { GetUserByIdMapper, GetUserByIdQuery, UserByIdResponse } from 'application/use-cases/users/get-by-id';
import { IUserRepository } from 'domain/user';
import { Result, ok, err } from 'neverthrow';
import { BadRequestError, NotFoundError } from 'application/common';
import { isNullOrEmptyOrInvalidUuid } from 'shared/extensions';
import { ZodError } from 'zod/v4';
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { inject, injectable } from 'tsyringe';
import { TYPES } from 'shared/ioc';

@requestHandler(GetUserByIdQuery)
@injectable()
export class GetUserByIdQueryHandler
  implements RequestHandler<GetUserByIdQuery, Result<UserByIdResponse, ZodError | BadRequestError | NotFoundError>>
{
  constructor(@inject(TYPES.IUserRepository) private readonly userRepository: IUserRepository) {}

  async handle(query: GetUserByIdQuery): Promise<Result<UserByIdResponse, ZodError | BadRequestError | NotFoundError>> {
    if (!query) {
      return err(new BadRequestError('Invalid query object provided.'));
    }

    if (isNullOrEmptyOrInvalidUuid(query.id)) {
      return err(new NotFoundError(`User with id '${query.id}' not found.`));
    }

    const userResult = await this.userRepository.findById(query.id);
    if (userResult) {
      return ok(GetUserByIdMapper.toResponse(userResult));
    }

    return err(new NotFoundError(`User with id '${query.id}' not found.`));
  }
}
