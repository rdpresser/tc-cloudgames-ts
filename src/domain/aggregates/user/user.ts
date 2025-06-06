import { errAsync, ResultAsync, okAsync } from 'neverthrow';
import { v4 as uuidv4 } from 'uuid';
import { ZodError } from 'zod/v4';
import { CreateUserDomainSchema, CreateUserDomainSchemaType } from './create-schema-validator';

export interface UserProps  {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export class User {
  public static create(props: UserProps): ResultAsync<CreateUserDomainSchemaType, ZodError> {
    return ResultAsync.fromPromise(
      CreateUserDomainSchema.safeParseAsync({
        id: uuidv4(),
        firstName: props.firstName,
        lastName: props.lastName,
        email: props.email,
        password: props.password,
        role: props.role
      }),
      (e) => e as ZodError
    ).andThen(user =>
      user.success
        ? okAsync(user.data)
        : errAsync(user.error)
    );
  }
}
