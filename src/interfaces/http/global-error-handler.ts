import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { handleError } from './http';
import console from 'console';

export function globalErrorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  // Log route/command and request values for debugging
  console.error(`[GlobalErrorHandler] ${request.method} || ${request.url}`, {
    params: request.params,
    query: request.query,
    body: request.body,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  });

  // Delegate to the shared error handler for consistent responses
  return handleError(error, reply);
}
