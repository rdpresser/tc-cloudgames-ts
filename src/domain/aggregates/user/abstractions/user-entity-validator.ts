import { User } from "../user";

import { joinWithQuotes } from "../../../../infrastructure/cross-cutting/commons/extensions/string-extensions";
import { AbstractValidator } from "fluent-ts-validator";

export class UserEntityValidator extends AbstractValidator<User> {

  public static readonly ValidRoles: ReadonlySet<string> = new Set(["Admin", "User"]);

  protected validateId(): void {
    this.validateIfString(user => user.id)
      .isNotEmpty()
        .withFailureMessage("User Id is required.")
        .withFailureCode("Id.Required");

    this.validateIfString(user => user.id)
      .isUuid()
        .withFailureMessage("User Id must be a valid UUID.")
        .withFailureCode("Id.InvalidFormat");
  }

  protected validateFirstName(): void {
    this.validateIfString(user => user.firstName)
      .isNotEmpty()
        .withFailureMessage("First name is required.")
        .withFailureCode("FirstName.Required");

    this.validateIfString(user => user.firstName)
      .hasMinLength(3)
        .withFailureMessage("First name must be at least 3 characters long.")
        .withFailureCode("FirstName.MinimumLength");

    this.validateIfString(user => user.firstName)
      .hasMaxLength(200)
        .withFailureMessage("First name must be at most 200 characters long.")
        .withFailureCode("FirstName.MaximumLength");

    this.validateIfString(user => user.firstName)
      .matches(/^[a-zA-Z]+$/)
        .withFailureMessage("First name can only contain letters.")
        .withFailureCode("FirstName.InvalidCharacters");
  }

  protected validateLastName(): void {
    this.validateIfString(user => user.lastName)
      .isNotEmpty()
        .withFailureMessage("Last name is required.")
        .withFailureCode("LastName.Required");

    this.validateIfString(user => user.lastName)
      .hasMinLength(3)
        .withFailureMessage("Last name must be at least 3 characters long.")
        .withFailureCode("LastName.MinimumLength");

    this.validateIfString(user => user.lastName)
      .hasMaxLength(200)
        .withFailureMessage("Last name must be at most 200 characters long.")
        .withFailureCode("LastName.MaximumLength");

    this.validateIfString(user => user.lastName)
      .matches(/^[a-zA-Z]+$/)
        .withFailureMessage("Last name can only contain letters.")
        .withFailureCode("LastName.InvalidCharacters");
  }

  protected validateEmail(): void {
    this.validateIf(user => user.email)
      .isNotEmpty()
        .withFailureMessage("Email object is required.")
        .withFailureCode("Email.Required")
        .withPropertyName("Email");
  }

  protected validatePassword(): void {
    this.validateIfString(user => user.password)
      .isNotEmpty()
        .withFailureMessage("Password is required.")
        .withFailureCode("Password.Required")
        .withPropertyName("Password");

    this.validateIfString(user => user.password)
      .hasMinLength(8)
        .withFailureMessage("Password must be at least 8 characters long.")
        .withFailureCode("Password.MinimumLength")
        .withPropertyName("Password");

    this.validateIfString(user => user.password)
      .matches(/[A-Z]/)
        .withFailureMessage("Password must contain at least one uppercase letter.")
        .withFailureCode("Password.Uppercase")
        .withPropertyName("Password");

    this.validateIfString(user => user.password)
      .matches(/[a-z]/)
        .withFailureMessage("Password must contain at least one lowercase letter.")
        .withFailureCode("Password.Lowercase")
        .withPropertyName("Password");

    this.validateIfString(user => user.password)
      .matches(/[0-9]/)
        .withFailureMessage("Password must contain at least one digit.")
        .withFailureCode("Password.Digit")
        .withPropertyName("Password");

    this.validateIfString(user => user.password)
      .matches(/[\W_]/)
        .withFailureMessage("Password must contain at least one special character.")
        .withFailureCode("Password.SpecialCharacter")
        .withPropertyName("Password");

    this.validateIfString(user => user.password)
      .hasMaxLength(200)
        .withFailureMessage("Password cannot exceed 200 characters.")
        .withFailureCode("Password.MaximumLength")
        .withPropertyName("Password");
  }

  protected validateRole(): void {
    this.validateIfString(user => user.role)
      .isNotEmpty()
        .withFailureMessage("Role is required.")
        .withFailureCode("Role.Required")
        .withPropertyName("Role");

    this.validateIfString(user => user.role)
      .isIn(UserEntityValidator.ValidRoles)
      .withFailureMessage(`Invalid role specified. Valid roles are: ${joinWithQuotes(UserEntityValidator.ValidRoles)}.`)
      .withFailureCode("Role.InvalidRole")
      .withPropertyName("Role");

    this.validateIfString(user => user.role)
      .hasMaxLength(20)
        .withFailureMessage("Role cannot exceed 20 characters.")
        .withFailureCode("Role.MaximumLength")
        .withPropertyName("Role");
  }
}
