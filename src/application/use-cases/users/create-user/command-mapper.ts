import { Result } from 'neverthrow';
import { User } from '../../../../domain/aggregates/user/user';
import { CreateUserResponse } from './command-response';
import { ZodError } from 'zod/v4';
import { CreateUserDomainSchemaType } from '../../../../domain/aggregates/user/create-schema-validator';
import { CreateUserCommand } from './command-schema';

export class CreateUserMapper {

  static async toDomain(r: CreateUserCommand): Promise<Result<CreateUserDomainSchemaType, ZodError>> {
    return await User.create(r);
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
