export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export function throwIfUniqueViolation(error: unknown, message = 'Email already exists.'): never | void {
  if (
    typeof error === 'object' &&
    error !== null &&
    'cause' in error &&
    typeof (error as { cause?: unknown }).cause === 'object' &&
    (error as { cause?: { code?: string } }).cause !== null &&
    (error as { cause?: { code?: string } }).cause?.code === '23505'
  ) {
    throw new BadRequestError(message);
  }
}
