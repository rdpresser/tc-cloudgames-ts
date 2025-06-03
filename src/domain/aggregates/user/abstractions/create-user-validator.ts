import { UserEntityValidator } from "./user-entity-validator";

export class CreateUserValidator extends UserEntityValidator {

  constructor() {
    super();
    this.ValidateId();
    this.ValidateFirstName();
    this.ValidateLastName();
    this.ValidateEmail();
    this.ValidatePassword();
    this.ValidateRole();
  }
}
