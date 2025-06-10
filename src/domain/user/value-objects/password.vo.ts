import { PasswordSchema } from 'shared/default-schemas';
import { Result, err, ok } from 'neverthrow';
import { z, ZodError } from 'zod/v4';
import { ValueObject } from 'domain/common';

export class Password extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(password: string): Result<Password, ZodError> {
    const PasswordFieldSchema = z.object({
      password: PasswordSchema,
    });

    const result = PasswordFieldSchema.safeParse({ password });

    if (!result.success) {
      return err(result.error);
    }
    return ok(new Password(result.data.password));
  }

  override toString() {
    return this.value;
  }
}
