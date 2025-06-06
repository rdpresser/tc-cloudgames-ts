import { z } from "zod/v4";
import { joinArrayWithQuotes } from "../extensions/string-extensions";

export const roleOptions = ["Admin", "User"];

export const UserIdSchema = z.uuidv4({ message: "User Id must be a valid UUID." })
    .nonempty({ message: "User Id is required." });

export const PasswordSchema = z.string()
    .nonempty({ message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(200, { message: "Password cannot exceed 200 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one digit." })
    .regex(/[\W_]/, { message: "Password must contain at least one special character." });

export type PasswordSchemaType = z.infer<typeof PasswordSchema>;

export const FirstNameSchema = z.string()
    .nonempty({ message: "First name is required." })
    .min(3, { message: "First name must be at least 3 characters long." })
    .max(200, { message: "First name must be at most 200 characters long." })
    .regex(/^[a-zA-Z]+$/, { message: "First name can only contain letters." });

export type FirstNameSchemaType = z.infer<typeof FirstNameSchema>;

export const LastNameSchema = z.string()
    .nonempty({ message: "Last name is required." })
    .min(3, { message: "Last name must be at least 3 characters long." })
    .max(200, { message: "Last name must be at most 200 characters long." })
    .regex(/^[a-zA-Z]+$/, { message: "Last name can only contain letters." });

export type LastNameSchemaType = z.infer<typeof LastNameSchema>;

export const RoleSchema = z.enum(roleOptions, {
    message: `Invalid role specified. Valid roles are: ${joinArrayWithQuotes(roleOptions)}.`
  });

export type RoleSchemaType = z.infer<typeof RoleSchema>;
export type RoleEnumType = typeof roleOptions[number];
