import { ValidationFailure } from 'fluent-ts-validator';
import { Result, err } from 'neverthrow';
import { v4 as uuidv4 } from 'uuid';

export abstract class Entity {
  public readonly id: string;

  constructor(id: string) {
    this.id = id ?? uuidv4();
  }

  protected static ensureResult(result: Result<any, ValidationFailure[]> | null | undefined, targetName: string)
  : Result<any, ValidationFailure[]> {

    if (result !== null && result !== undefined) {
      return result;
    }

    return err([new ValidationFailure(targetName, targetName, null, `${targetName}.Error`, 'Value object creation failed.')]);
  }

  protected static validationErrors(results : Array<Result<any, ValidationFailure[]>>): Array<ValidationFailure> {
    const errors: Array<ValidationFailure> = [];

    for (const result of results) {

      if (!result) {
        errors.push(new ValidationFailure('ValidationFailure', 'Unknown', null, 'ValueObjectCreation.Error', 'Value object creation failed.'));
        continue;
      }

      if (result.isOk() || result.error.length === 0) {
        continue
      }

      errors.push(...result.error);
    }
    return errors;
  }
}
