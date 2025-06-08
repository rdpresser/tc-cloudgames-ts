import { errAsync, ResultAsync  } from 'neverthrow';
import { User } from '../../../../domain/user/user.aggregate';
import { CreateUserResponse } from './command.response';
import { ZodError } from 'zod/v4';
import { CreateUserCommand } from './command.schema';
import { BadRequestError } from '../../../../interfaces/custom-results/custom-result';

export class CreateUserMapper {

  static toDomain(command: CreateUserCommand): ResultAsync<User, ZodError | BadRequestError> {
    if (!command) {
      return errAsync(new BadRequestError('Invalid command'));
    }

    return User.create(command);
  }

  static toResponse(user: User): CreateUserResponse {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      role: user.role.value
    };
  }
}
