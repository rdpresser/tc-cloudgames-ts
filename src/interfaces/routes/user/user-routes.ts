import { FastifyInstance } from 'fastify';
import { GetUserQuery } from '../../../application/use-cases/users/get-by-id/query';
import { GetUserQueryHandler } from '../../../application/use-cases/users/get-by-id/handler';
import { Mediator } from '../../../application/abstractions/messaging/mediator';
import { GetUserResponse } from 'application/use-cases/users/get-by-id/response';
import { handleResult } from '../../../application/abstractions/custom-results/custom-result';
import { isNullOrEmptyOrInvalidUuid } from '../../../infrastructure/cross-cutting/commons/extensions/string-extensions';

export default async function userRoutes(fastify: FastifyInstance) {
  const mediator = new Mediator();
  mediator.register(GetUserQuery, new GetUserQueryHandler());

  fastify.get('/user/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    //remove this validation when using a proper validation library
    if (isNullOrEmptyOrInvalidUuid(id)) {
      reply.status(400).send({ error: 'Invalid user Id' });
      return;
    }

    // Use the mediator to handle the query
    const user = await mediator.send<GetUserQuery, GetUserResponse>(new GetUserQuery(id));
    return handleResult(user, reply);
  });
}
