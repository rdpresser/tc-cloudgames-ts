import { z } from "zod/v4";
import { PasswordSchema, FirstNameSchema, LastNameSchema, RoleSchema, UserIdSchema } from "../../../infrastructure/cross-cutting/commons/default-schemas/user-default-schema";

export const UniqueEmailSchema =
    z.email({ message: "Email must be a valid email address." })
    .nonempty({ message: "Email is required." })
    .max(200, { message: "Email cannot exceed 200 characters." })
    .refine(
    async (email) => {
      // async uniqueness check here
      console.log(`Checking if email ${email} is unique...`);
      return true;
    },
    { message: "Email already exists!" }
  );

export const CreateUserDomainSchema = z.object({
  id: UserIdSchema,
  firstName: FirstNameSchema,
  lastName: LastNameSchema,
  email: UniqueEmailSchema,
  password: PasswordSchema,
  role: RoleSchema
});

export type CreateUserDomainSchemaType = z.infer<typeof CreateUserDomainSchema>;
