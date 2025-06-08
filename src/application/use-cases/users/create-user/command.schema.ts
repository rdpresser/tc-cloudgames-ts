import { z } from "zod/v4";
import { PasswordSchema, FirstNameSchema, LastNameSchema, RoleSchema, EmailSchema } from "../../../../shared/default-schemas/user-default-schema";

export const CreateUserCommandSchema = z.object({
  firstName: FirstNameSchema,
  lastName: LastNameSchema,
  email: EmailSchema,
  password: PasswordSchema,
  role: RoleSchema
});

export type CreateUserCommandSchemaType = z.infer<typeof CreateUserCommandSchema>;

export class CreateUserCommand {
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public role!: string;

  constructor(props: CreateUserCommandSchemaType) {
    Object.assign(this, props);
  }
}
