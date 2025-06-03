import { AbstractValidator, ValidationFailure } from 'fluent-ts-validator';
import { ok, err, Result } from 'neverthrow';

export class Email {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): Result<Email, ValidationFailure[]> {
    const email = new Email(value);
    const validator = new EmailValidator();
    const result = validator.validate(email);

    if (!result.isValid()) {
      return err(result.getFailures());
    }

    return ok(new Email(value));
  }
}

export class EmailValidator extends AbstractValidator<Email> {
  constructor() {
    super();
    this.validateIfString(email => email.value)
      .isNotEmpty()
      .withFailureMessage("Email is required.")
      .withFailureCode("Email.Required")
      .withPropertyName("Email");

    this.validateIfString(email => email.value)
        .isEmail()
        .withFailureMessage("Email must be a valid email address.")
        .withFailureCode("Email.InvalidFormat")
        .withPropertyName("Email");

    //add validation for email exists using repository or service

      this.validateIfString(email => email.value)
        .hasMaxLength(200)
        .withFailureMessage("Email cannot exceed 200 characters.")
        .withFailureCode("Email.MaximumLength")
        .withPropertyName("Email");
  }
}
