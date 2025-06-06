import { ok, Result, err } from 'neverthrow';
import { v4 as uuidv4 } from 'uuid';
import { ZodError } from 'zod/v4';
import { CreateUserDomainSchema, CreateUserDomainSchemaType } from './create-schema-validator';

export const ValidRoles: ReadonlySet<string> = new Set(["Admin", "User"]);

export interface UserProps  {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export class User {
  public static create(props: UserProps): Result<CreateUserDomainSchemaType, ZodError<CreateUserDomainSchemaType>> {
    const userDomain: CreateUserDomainSchemaType = {
      id: uuidv4(),
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      password: props.password,
      role: props.role
    };

    const user = CreateUserDomainSchema.safeParse(userDomain);

    if (!user.success) {
      return err(user.error);
    }

    return ok(user.data);
  }
}
