import { z } from "zod/v4";
import { joinArrayWithQuotes } from "shared/extensions";

// This file contains default schemas for user-related data validation.

// Schema for user Id
export const UserIdSchema = z.uuidv4({ message: "User Id must be a valid UUID." })
    .nonempty({ message: "User Id is required." });

// Schema for Password
// Password must be at least 8 characters long, contain uppercase, lowercase, digits, and special characters.
export const PasswordSchema = z.string()
    .nonempty({ message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(200, { message: "Password cannot exceed 200 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one digit." })
    .regex(/[\W_]/, { message: "Password must contain at least one special character." });

// Type for PasswordSchema
export type PasswordSchemaType = z.infer<typeof PasswordSchema>;

// Schema for First Name and Last Name
// Both must be non-empty, at least 3 characters long, and can only contain letters.
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

// Schema for Email
// Email must be a valid email address, non-empty, and cannot exceed 200 characters.
export const EmailSchema =
  z.email({ message: "Email must be a valid email address." })
  .nonempty({ message: "Email is required." })
  .max(200, { message: "Email cannot exceed 200 characters." });

export type EmailSchemaType = z.infer<typeof EmailSchema>;

// Role options for user creation
export const roleOptions = ["Admin", "User"];

// Schema for Role
// Role must be one of the predefined options: "Admin" or "User".
export const RoleSchema = z.enum(roleOptions, {
    message: `Invalid role specified. Valid roles are: ${joinArrayWithQuotes(roleOptions)}.`
  });

export type RoleSchemaType = z.infer<typeof RoleSchema>;
export type RoleEnumType = typeof roleOptions[number];
