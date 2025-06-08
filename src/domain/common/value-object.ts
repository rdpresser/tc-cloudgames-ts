export abstract class ValueObject<T> {
  constructor(public readonly value: T) {
    Object.freeze(this);
  }

  equals(vo?: ValueObject<T>): boolean {
    if (!vo || !(vo instanceof ValueObject)) {
      return false;
    }
    return this.value === vo.value;
  }
}
