import { ok, Result, err } from 'neverthrow';
import { Entity } from '../../entities/entity';
import { Email } from './value-objects/email';
import { ValidationFailure } from 'fluent-ts-validator';
import { CreateUserValidator } from './abstractions/create-user-validator';

export type UserProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

type UserPropsValueObjects = {
  id: string;
  firstName: string;
  lastName: string;
  email: Email;
  password: string;
  role: string;
};

// type UserPropsFromResultValueObjects = {
//   firstName: string;
//   lastName: string;
//   email: Result<Email, ValidationFailure[]>;
//   password: string;
//   role: string;
//   id: string;
// };

export class User extends Entity {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: Email;
  public readonly password: string;
  public readonly role: string;

  private constructor(props: UserPropsValueObjects) {
    super(props.id);
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
  }

  public static create(props: UserProps): Result<User, ValidationFailure[]> {
    const emailResult = Email.create(props.email);

    const valueObjects: Array<Result<any, ValidationFailure[]>> = [
      this.ensureResult(emailResult, 'Email')
    ];

    const errors = this.validationErrors(valueObjects);
    if (emailResult.isErr()) {
      return err(errors);
    }

    const userPropsValueObjects: UserPropsValueObjects = {
      firstName: props.firstName,
      lastName: props.lastName,
      email: emailResult.value,
      password: props.password,
      role: props.role,
      id: props.id
    };

    const user = new User(userPropsValueObjects)
    const validator = new CreateUserValidator();
    const result = validator.validate(user);

    if (!result.isValid()) {
      errors.push(...result.getFailures());
    }

    if (errors.length > 0) {
      return err(errors);
    }

    return ok(user);
  }
}
