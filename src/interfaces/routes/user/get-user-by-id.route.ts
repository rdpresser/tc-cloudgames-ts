import { GetUserQuery } from 'application/use-cases/users/get-by-id';
import { FastifyInstance } from 'fastify';
import { handleResult } from 'interfaces/http';
import { Mediator } from 'mediatr-ts';
import { isNullOrEmptyOrInvalidUuid } from 'shared/extensions';

export async function getUserByIdRoute(fastify: FastifyInstance, mediator: Mediator) {
  fastify.get<{ Params: { id: string } }>('/user/:id', async (request, reply) => {
    const { id } = request.params;

    // Validate the ID format (you can use a more robust validation library)
    if (isNullOrEmptyOrInvalidUuid(id)) {
      reply.status(400).send({ error: 'Invalid user Id' });
      return;
    }

    // Use the mediator to handle the query
    const user = await mediator.send(new GetUserQuery(id));
    return handleResult(user, reply);
  });
}
