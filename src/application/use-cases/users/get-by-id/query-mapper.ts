import { CreateUserDomainSchemaType } from 'domain/aggregates/user/create-schema-validator';
import { GetUserResponse } from './query-response';

export class GetUserMapper {
    static toResponse(user: CreateUserDomainSchemaType): GetUserResponse {
      return new GetUserResponse(
        user.id,
        user.firstName,
        user.lastName,
        user.email,
        user.role
      );
  }
}
