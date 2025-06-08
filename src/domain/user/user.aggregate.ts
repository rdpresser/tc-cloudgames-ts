import { ResultAsync, errAsync, okAsync } from 'neverthrow';
import { ZodError } from 'zod/v4';
import { CreateUserDomainSchema } from './create-user.validator';
import { BaseEntityWithId } from '../../domain/common/base-entity';
import { Role } from './value-objects/role.vo';
import { Email } from './value-objects/email.vo';
import { Password } from './value-objects/password.vo';
import { $ZodIssue } from 'zod/v4/core';

export interface UserProps  {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export class User extends BaseEntityWithId {
  private constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: Email,
    public readonly password: Password,
    public readonly role: Role
  ) {
    super();
  }

  public static create(props: UserProps): ResultAsync<User, ZodError> {
    const issues: $ZodIssue[] = [];

    const emailOrError = Email.create(props.email);
    if (emailOrError.isErr()) {
      issues.push(...emailOrError.error.issues);
    }

    const passwordOrError = Password.create(props.password);
    if (passwordOrError.isErr()) {
      issues.push(...passwordOrError.error.issues);
    }

    const roleOrError = Role.create(props.role);
    if (roleOrError.isErr()) {
      issues.push(...roleOrError.error.issues);
    }

    return ResultAsync.fromPromise(
      CreateUserDomainSchema.safeParseAsync({
        firstName: props.firstName,
        lastName: props.lastName,
        email: props.email
      }),
      (zodError) => zodError as ZodError
    ).andThen((zodResult) => {
      if (!zodResult.success) {
        issues.push(...zodResult.error.issues);
      }

      if (issues.length > 0) {
        return errAsync(new ZodError(issues));
      }

      if (emailOrError.isErr() || passwordOrError.isErr() || roleOrError.isErr()) {
        // This should not happen because issues would have been caught above,
        // but this is a type-safe fallback.
        return errAsync(new ZodError(issues));
      }

      return okAsync(new User(
        props.firstName,
        props.lastName,
        emailOrError.value,
        passwordOrError.value,
        roleOrError.value
      ));
    });
  }
}
