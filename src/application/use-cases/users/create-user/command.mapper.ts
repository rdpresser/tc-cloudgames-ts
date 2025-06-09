import { err, Result } from 'neverthrow';
import { User } from 'domain/user';
import { ZodError } from 'zod/v4';
import { BadRequestError } from 'application/common';
import { CreateUserCommand, CreateUserResponse } from 'application/use-cases/users/create-user';

export class CreateUserMapper {
  static async toDomain(command: CreateUserCommand): Promise<Result<User, ZodError | BadRequestError>> {
    if (!command) {
      return err(new BadRequestError('Invalid command'));
    }
    return await User.create(command);
  }

  static toResponse(user: User): CreateUserResponse {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      role: user.role.value,
    };
  }
}
