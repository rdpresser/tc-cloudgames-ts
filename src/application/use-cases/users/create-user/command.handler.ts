import { err, ok, Result } from 'neverthrow';
import { ZodError } from 'zod/v4';
import { RequestHandler, requestHandler } from 'mediatr-ts';
import { BadRequestError } from 'application/common';
import { CreateUserCommand, CreateUserResponse, CreateUserMapper } from 'application/use-cases/users/create-user';
//import { inject, injectable } from 'tsyringe';
//import { IUserRepository } from 'domain/user';
//import { USER_REPOSITORY_TOKEN } from 'shared/ioc';

//@injectable()
@requestHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements RequestHandler<CreateUserCommand, Result<CreateUserResponse, ZodError | BadRequestError>>
{
  //constructor(@inject(USER_REPOSITORY_TOKEN) private userRepository: IUserRepository) {}

  async handle(command: CreateUserCommand): Promise<Result<CreateUserResponse, ZodError | BadRequestError>> {
    if (!command) {
      return err(new BadRequestError('Invalid command object provided.'));
    }

    //TODO: alterar o todomain para gerar exceção em vez de retornar erro com try catch
    const userOrError = await CreateUserMapper.toDomain(command);
    if (userOrError.isErr()) {
      return err(userOrError.error);
    }

    return ok(CreateUserMapper.toResponse(userOrError.value));
  }
}
