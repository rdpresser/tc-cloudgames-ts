import { ResultAsync, errAsync } from 'neverthrow';
import { BadRequestError } from '../../../../interfaces/custom-results/custom-result';
import { z } from 'zod/v4';
import { CreateUserResponse } from './command-response';
import { CreateUserMapper } from './command-mapper';
import { CreateUserCommand } from './command-schema';
import { User } from '../../../../domain/aggregates/user/user';

export class CreateUserCommandHandler {
  handle(command: CreateUserCommand): ResultAsync<CreateUserResponse, z.ZodError | BadRequestError> {
    if (!command) {
      return errAsync(new BadRequestError('Invalid command'));
    }

    return User.create(command)
      .map(userDomain => CreateUserMapper.toResponse(userDomain))
      .mapErr(error => {
        // Optionally transform or wrap the error here
        return error;
      });
  }
}
