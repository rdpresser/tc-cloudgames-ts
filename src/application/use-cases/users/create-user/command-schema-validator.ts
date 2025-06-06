import { z } from "zod/v4";
import { PasswordSchema, FirstNameSchema, LastNameSchema, RoleSchema } from "../../../../infrastructure/cross-cutting/commons/default-schemas/user-default-schema";

const EmailSchema =
  z.email({ message: "Email must be a valid email address." })
  .nonempty({ message: "Email is required." })
  .max(200, { message: "Email cannot exceed 200 characters." });

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
