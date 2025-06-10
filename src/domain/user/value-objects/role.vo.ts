import { ValueObject } from 'domain/common';
import { err, ok, Result } from 'neverthrow';
import { RoleSchema } from 'shared/default-schemas';
import { z, ZodError } from 'zod/v4';

export class Role extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(role: string): Result<Role, ZodError> {
    const RoleFieldSchema = z.object({
      role: RoleSchema,
    });

    const result = RoleFieldSchema.safeParse({ role });

    if (!result.success) {
      return err(result.error);
    }
    return ok(new Role(result.data.role));
  }

  override toString() {
    return this.value;
  }
}
