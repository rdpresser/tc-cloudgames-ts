import { err, ok, Result } from 'neverthrow';
import { ZodError } from 'zod/v4';
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { BadRequestError } from 'application/common';
import { CreateUserCommand, CreateUserResponse, CreateUserMapper } from 'application/use-cases/users/create-user';

@requestHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements RequestHandler<CreateUserCommand, Result<CreateUserResponse, ZodError | BadRequestError>>
{
  /*constructor(private readonly userRepository: UserRepository) {}*/
  async handle(command: CreateUserCommand): Promise<Result<CreateUserResponse, ZodError | BadRequestError>> {
    const userOrError = await Promise.resolve(CreateUserMapper.toDomain(command));
    if (userOrError.isErr()) {
      return err(userOrError.error);
    }
    const userDomain = userOrError.value;
    return ok(CreateUserMapper.toResponse(userDomain));
  }
}
