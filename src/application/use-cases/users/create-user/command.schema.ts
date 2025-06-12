import { z, ZodError } from 'zod/v4';
import { RequestData } from 'mediatr-ts';
import { Result } from 'neverthrow';
import { BadRequestError } from 'application/common';
import { CreateUserResponse } from 'application/use-cases/users/create-user';
import { EmailSchema, FirstNameSchema, LastNameSchema, PasswordSchema, RoleSchema } from 'shared/default-schemas';

export const CreateUserCommandSchema = z.object({
  firstName: FirstNameSchema,
  lastName: LastNameSchema,
  email: EmailSchema,
  password: PasswordSchema,
  role: RoleSchema,
});

export type CreateUserCommandSchemaType = z.infer<typeof CreateUserCommandSchema>;

export class CreateUserCommand extends RequestData<Result<CreateUserResponse, ZodError | BadRequestError>> {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public role: string,
  ) {
    super();
  }

  static parse(data: unknown): CreateUserCommand {
    const parsed = CreateUserCommandSchema.parse(data);
    return new CreateUserCommand(parsed.firstName, parsed.lastName, parsed.email, parsed.password, parsed.role);
  }
}
