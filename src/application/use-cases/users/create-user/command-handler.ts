import { ResultAsync, okAsync, errAsync } from 'neverthrow';
import { BadRequestError } from '../../../../interfaces/custom-results/custom-result';
import { z } from 'zod/v4';
import { CreateUserResponse } from './response';
import { CreateUserMapper } from './mapper';
import { CreateUserCommand } from './command-schema-validator';

export class CreateUserCommandHandler {
  handle(command: CreateUserCommand): ResultAsync<CreateUserResponse, z.ZodError | BadRequestError> {

    if (!command) {
      return errAsync(new BadRequestError('Invalid command'));
    }

    const entity = CreateUserMapper.toDomain(command);
    if (entity.isErr()) {
      return errAsync(entity.error);
    }

    // Here you would typically save the user to a database or repository

    return okAsync(CreateUserMapper.toResponse(entity.value));
  }
}
