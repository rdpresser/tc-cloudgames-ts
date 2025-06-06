import { z } from "zod/v4";
import { ValidRoles } from "../../../../domain/aggregates/user/user";
import { joinWithQuotes } from "../../../../infrastructure/cross-cutting/commons/extensions/string-extensions";

export const CreateUserCommandSchema = z.object({

  firstName: z.string()
    .nonempty({ message: "First name is required." })
    .min(3, { message: "First name must be at least 3 characters long." })
    .max(200, { message: "First name must be at most 200 characters long." })
    .regex(/^[a-zA-Z]+$/, { message: "First name can only contain letters." }),

  lastName: z.string()
    .nonempty({ message: "Last name is required." })
    .min(3, { message: "Last name must be at least 3 characters long." })
    .max(200, { message: "Last name must be at most 200 characters long." })
    .regex(/^[a-zA-Z]+$/, { message: "Last name can only contain letters." }),

  email: z.string()
    .nonempty({ message: "Email is required." })
    .email({ message: "Email must be a valid email address." })
    .max(200, { message: "Email cannot exceed 200 characters." }),

  password: z.string()
    .nonempty({ message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(200, { message: "Password cannot exceed 200 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one digit." })
    .regex(/[\W_]/, { message: "Password must contain at least one special character." }),

  role: z.string()
    .nonempty({ message: "Role is required." })
    .max(20, { message: "Role cannot exceed 20 characters." })
    .refine(val => ValidRoles.has(val), {
      message: `Invalid role specified. Valid roles are: ${joinWithQuotes(ValidRoles)}.`
    })
});

export type CreateUserCommandSchemaType = z.infer<typeof CreateUserCommandSchema>;

export class CreateUserCommand {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public role: string
  ) {}
}

