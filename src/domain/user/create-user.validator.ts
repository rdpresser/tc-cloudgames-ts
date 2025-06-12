import { z } from 'zod/v4';
import { FirstNameSchema, LastNameSchema, UserIdSchema } from 'shared/default-schemas';
import console from 'console';

export const UniqueEmailSchema = z
  .email({ message: 'Email must be a valid email address.' })
  .nonempty({ message: 'Email is required.' })
  .max(200, { message: 'Email cannot exceed 200 characters.' })
  .refine(
    async (email) => {
      // async uniqueness check here
      console.log(`Checking if email ${email} is unique...`);
      return true;
    },
    { message: 'Email already exists!' },
  );

export const CreateUserDomainSchema = z.object({
  id: UserIdSchema,
  firstName: FirstNameSchema,
  lastName: LastNameSchema,
  email: UniqueEmailSchema,
  // password: PasswordSchema,
  // role: RoleSchema
});

export type CreateUserDomainSchemaType = z.infer<typeof CreateUserDomainSchema>;
