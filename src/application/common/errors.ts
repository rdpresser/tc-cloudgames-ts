import { err, Result } from 'neverthrow';
import { ZodError } from 'zod/v4';

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

export function toResultError<T>(
  error: unknown,
  fallbackMessage = 'An unexpected error occurred.',
): Result<T, ZodError | BadRequestError | NotFoundError | Error> {
  if (error instanceof BadRequestError || error instanceof NotFoundError || error instanceof ZodError) {
    return err(error);
  }
  if (error instanceof Error) {
    return err(new Error(error.message || fallbackMessage));
  }
  return err(new Error(fallbackMessage));
}
