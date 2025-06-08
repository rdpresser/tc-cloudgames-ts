import { errAsync, okAsync, ResultAsync } from 'neverthrow';
import { BadRequestError } from '../../../../interfaces/custom-results/custom-result';
import { ZodError } from 'zod/v4';
import { CreateUserResponse } from './command.response';
import { CreateUserMapper } from './command.mapper';
import { CreateUserCommand } from './command.schema';

export class CreateUserCommandHandler {
  /*constructor(private readonly userRepository: UserRepository) {}*/
   handle(command: CreateUserCommand): ResultAsync<CreateUserResponse, ZodError | BadRequestError> {
    return ResultAsync.fromPromise(
      CreateUserMapper.toDomain(command),
      (e) => e as ZodError
    ).andThen((userOrError) => {
      if (userOrError.isErr()) {
        return errAsync(userOrError.error);
      }

      const userDomain = userOrError.value;
      // Here you would typically save the user to a repository

      return okAsync(CreateUserMapper.toResponse(userDomain));
    });
  }
}

/*
back using repository
import { ResultAsync, errAsync, okAsync } from 'neverthrow';
import { BadRequestError } from '../../../../interfaces/custom-results/custom-result';
import { z } from 'zod/v4';
import { CreateUserResponse } from './command-response';
import { CreateUserMapper } from './command-mapper';
import { CreateUserCommand } from './command-schema';
import { User } from '../../../../domain/aggregates/user/user';
import { UserRepository } from '../../../../infrastructure/repositories/user-repository'; // adjust path as needed

export class CreateUserCommandHandler {
  constructor(private readonly userRepository: UserRepository) {}

  handle(command: CreateUserCommand): ResultAsync<CreateUserResponse, z.ZodError | BadRequestError> {
    if (!command) {
      return errAsync(new BadRequestError('Invalid command'));
    }

    return User.create(command)
      .andThen(userDomain =>
        this.userRepository.add(userDomain) // should return ResultAsync<User, Error>
          .map(savedUser => CreateUserMapper.toResponse(savedUser))
      )
      .mapErr(error => {
        // Optionally transform or wrap the error here
        return error;
      });
  }
}
*/
