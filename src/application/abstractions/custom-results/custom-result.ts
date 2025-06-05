import { FastifyReply } from 'fastify';
import { ValidationFailure } from 'fluent-ts-validator';
import { Result } from 'neverthrow';
import { z } from 'zod/v4';
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

export function handleResult<T, E extends Error>(result: Result<T, E>, reply: FastifyReply) {
  if (result.isOk()) {
    return reply.send(result.value);
  }

  const error = result.error;
  if (error instanceof BadRequestError) {
    return reply.status(400).send({ error: error.message });
  }
  if (error instanceof NotFoundError) {
    return reply.status(404).send({ error: error.message });
  }

  if (Array.isArray(error) && error.every(item => item instanceof ValidationFailure)) {
    // Map only the desired fields
    return reply.status(422).send({
      errors: error.map((failure: ValidationFailure) => ({
        propertyName: failure.propertyName,
        code: failure.code,
        message: failure.message
      }))
    });
  }

  if (error instanceof z.ZodError) {
    return reply.status(422).send({
      errors: error.issues.map(issue => ({
        propertyName: issue.path.join('.'),
        code: issue.code,
        message: issue.message
      }))
    });
  }

  // Default to 500 for unhandled errors
  return reply.status(500).send({ error: error.message || 'Internal Server Error' });
}
