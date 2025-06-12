import { FastifyInstance } from 'fastify';
import { handleError, handleResult } from 'interfaces/http';
import { CreateUserCommand } from 'application/use-cases/users/create-user';
import { Mediator } from 'mediatr-ts';

export async function createUserRoute(fastify: FastifyInstance, mediator: Mediator) {
  fastify.post<{ Body: unknown }>('/user', async (request, reply) => {
    try {
      const command = CreateUserCommand.parse(request.body);
      const result = await mediator.send(command);
      return handleResult(result, reply);
    } catch (error) {
      return handleError(error, reply);
    }
  });
}
