import { v4 as uuidv4 } from 'uuid';

export type Guid = string;

export abstract class BaseEntity<TId = Guid> {
  constructor(public readonly id: TId) {}
}

export abstract class BaseEntityWithId extends BaseEntity<Guid> {
  constructor() {
    super(uuidv4());
  }
}
