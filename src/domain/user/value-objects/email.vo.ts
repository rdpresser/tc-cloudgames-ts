import { ValueObject } from 'domain/common';
import { Result, err, ok } from 'neverthrow';
import { EmailSchema } from 'shared/default-schemas';
import { ZodError } from 'zod/v4';

export class Email extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(email: string): Result<Email, ZodError> {
    const result = EmailSchema.safeParse(email);

    if (!result.success) {
      return err(result.error);
    }
    return ok(new Email(result.data));
  }

  override toString() {
    return this.value;
  }
}
