import { ValueObject } from 'domain/common';
import { err, ok, Result } from "neverthrow";
import { RoleSchema } from 'shared/default-schemas';
import { ZodError } from "zod/v4";

export class Role extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(role: string): Result<Role, ZodError> {
    const result = RoleSchema.safeParse(role);

    if (!result.success) {
      return err(result.error);
    }
    return ok(new Role(result.data));
  }

  override toString() {
    return this.value;
  }
}
