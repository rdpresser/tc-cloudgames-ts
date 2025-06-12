import { BadRequestError, NotFoundError } from 'application/common';
import { FastifyReply } from 'fastify';
import { Result } from 'neverthrow';
import { ZodError } from 'zod/v4';

function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

function sendError(error: unknown, reply: FastifyReply) {
  if (isZodError(error)) {
    return handleZodError(error, reply);
  } else if (error instanceof BadRequestError) {
    return reply.status(400).send({ error: error.message });
  } else if (error instanceof NotFoundError) {
    return reply.status(404).send({ error: error.message });
  } else {
    // 500 Internal Server Error with detailed JSON structure
    return reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: (error as Error)?.message || 'Internal Server Error',
    });
  }
}

export function handleResult<T, E extends Error>(result: Result<T, E>, reply: FastifyReply) {
  if (result.isOk()) {
    return reply.send(result.value);
  }
  return sendError(result.error, reply);
}

export function handleError(error: unknown, reply: FastifyReply) {
  return sendError(error, reply);
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
