import { Result } from 'neverthrow';
import { User } from '../../../../domain/aggregates/user/user';
import { CreateUserResponse } from './response';
import { ZodError } from 'zod/v4';
import { CreateUserDomainSchemaType } from '../../../../domain/aggregates/user/create-schema-validator';
import { CreateUserCommand } from './command-schema-validator';

export class CreateUserMapper {

  static toDomain(r: CreateUserCommand): Result<CreateUserDomainSchemaType, ZodError> {
    return User.create(r);
  }

  static toResponse(user: CreateUserDomainSchemaType): CreateUserResponse {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };
  }
}
