import { err, ok, Result } from 'neverthrow';
import { ZodError } from 'zod/v4';
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { BadRequestError, throwIfUniqueViolation, toResultError } from 'application/common';
import { CreateUserCommand, CreateUserResponse, CreateUserMapper } from 'application/use-cases/users/create-user';
import { inject, injectable } from 'tsyringe';
import { TYPES } from 'shared/ioc';
import { IUserRepository } from 'domain/user';

@requestHandler(CreateUserCommand)
@injectable()
export class CreateUserCommandHandler
  implements RequestHandler<CreateUserCommand, Result<CreateUserResponse, ZodError | BadRequestError>>
{
  constructor(@inject(TYPES.IUserRepository) private readonly userRepository: IUserRepository) {}

  async handle(command: CreateUserCommand): Promise<Result<CreateUserResponse, ZodError | BadRequestError>> {
    if (!command) {
      return err(new BadRequestError('Invalid command object provided.'));
    }

    const userOrError = await CreateUserMapper.toDomain(command);
    if (userOrError.isErr()) {
      return err(userOrError.error);
    }

    try {
      const createdUser = await this.userRepository.create(userOrError.value);
      return ok(CreateUserMapper.toResponse(createdUser));
    } catch (error) {
      throwIfUniqueViolation(error, 'Email already exists.');
      return toResultError<CreateUserResponse>(error);
    }
  }
}
