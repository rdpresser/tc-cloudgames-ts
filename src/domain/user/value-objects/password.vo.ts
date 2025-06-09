import { PasswordSchema } from 'shared/default-schemas';
import { Result, err, ok } from 'neverthrow';
import { ZodError } from 'zod/v4';
import { ValueObject } from 'domain/common';

export class Password extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(password: string): Result<Password, ZodError> {
    const result = PasswordSchema.safeParse(password);

    if (!result.success) {
      return err(result.error);
    }
    return ok(new Password(result.data));
  }

  override toString() {
    return this.value;
  }
}
