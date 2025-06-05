import { UserEntityValidator } from "./user-entity-validator";

export class CreateUserValidator extends UserEntityValidator {

  constructor() {
    super();
    this.validateId();
    this.validateFirstName();
    this.validateLastName();
    this.validateEmail();
    this.validatePassword();
    this.validateRole();
  }
}
