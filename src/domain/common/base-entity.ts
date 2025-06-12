import { UserIdSchemaType } from 'shared/default-schemas';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity {
  constructor(public readonly id: UserIdSchemaType) {}

  static generateId(): UserIdSchemaType {
    return uuidv4() as UserIdSchemaType;
  }
}
