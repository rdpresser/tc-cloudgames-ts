import { Result, err, ok } from 'neverthrow';
import { ZodError } from 'zod/v4';
import { CreateUserDomainSchema } from 'domain/user';
import { BaseEntity } from 'domain/common';
import { Email, Password, Role } from 'domain/user/value-objects';
import { $ZodIssue } from 'zod/v4/core';
import { UserIdSchemaType } from 'shared/default-schemas';

export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  id?: UserIdSchemaType;
}

export class User extends BaseEntity {
  private constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: Email,
    public readonly password: Password,
    public readonly role: Role,
    id: UserIdSchemaType,
  ) {
    super(id);
  }

  public static async create(props: Omit<UserProps, 'id'>): Promise<Result<User, ZodError>> {
    return this.createWithId({ ...props, id: BaseEntity.generateId() });
  }

  public static async createWithId(props: UserProps): Promise<Result<User, ZodError>> {
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

    const result = await CreateUserDomainSchema.safeParseAsync({
      id: props.id,
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
    });

    if (!result.success) {
      issues.push(...result.error.issues);
    }

    if (issues.length > 0) {
      return err(new ZodError(issues));
    }

    if (emailOrError.isErr() || passwordOrError.isErr() || roleOrError.isErr()) {
      // This should not happen because issues would have been caught above,
      // but this is a type-safe fallback.
      return err(new ZodError(issues));
    }

    return ok(
      new User(
        props.firstName,
        props.lastName,
        emailOrError.value,
        passwordOrError.value,
        roleOrError.value,
        props.id!,
      ),
    );
  }
}
