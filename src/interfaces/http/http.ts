import { BadRequestError, NotFoundError } from 'application/common';
import { FastifyReply } from 'fastify';
import { Result } from 'neverthrow';
import { ZodError } from 'zod/v4';

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

  if (isZodError(error)) {
    // Map Zod errors to the desired format
    return handleZodError(error, reply);
  }

  // Default to 500 for unhandled errors
  return reply.status(500).send({ error: error.message || 'Internal Server Error' });
}

function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

export function handleZodError(error: ZodError, reply: FastifyReply) {
  return reply.status(422).send({
    errors: error.issues.map((issue) => ({
      propertyName: issue.path.join('.'),
      code: `${issue.path.join('.')}.${issue.code}`,
      message: issue.message,
    })),
  });
}
