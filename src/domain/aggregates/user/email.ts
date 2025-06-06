// import { ok, err, Result } from 'neverthrow';
// import { z } from "zod/v4";

// export class Email {
//   public readonly value: string;

//   private constructor(value: string) {
//     this.value = value;
//   }

//   public static create(value: string): Result<Email, z.ZodError> {
//     const result = EmailSchema.safeParse({ email: value });

//     if (!result.success) {
//       return err(result.error);
//     }

//     return ok(new Email(value));
//   }
// }

// export const EmailSchema = z.object({
//   email: z.email({ error: "Email must be a valid email address." })
//     .nonempty({ error: "Email is required.",  })
//     .max(200, { error: "Email cannot exceed 200 characters." })
// });

// export class EmailValidator extends AbstractValidator<Email> {
//   constructor() {
//     super();
//     this.validateIfString(email => email.value)
//       .isNotEmpty()
//       .withFailureMessage("Email is required.")
//       .withFailureCode("Email.Required")
//       .withPropertyName("Email");

//     this.validateIfString(email => email.value)
//         .isEmail()
//         .withFailureMessage("Email must be a valid email address.")
//         .withFailureCode("Email.InvalidFormat")
//         .withPropertyName("Email");

//     //add validation for email exists using repository or service

//       this.validateIfString(email => email.value)
//         .hasMaxLength(200)
//         .withFailureMessage("Email cannot exceed 200 characters.")
//         .withFailureCode("Email.MaximumLength")
//         .withPropertyName("Email");
//   }
// }
