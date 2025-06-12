import { BadRequestError } from 'application/common';
import { GetUserByIdQuery } from 'application/use-cases/users/get-by-id';
import { FastifyInstance } from 'fastify';
import { handleError, handleResult } from 'interfaces/http';
import { Mediator } from 'mediatr-ts';
import { isNullOrEmptyOrInvalidUuid } from 'shared/extensions';

export async function getUserByIdRoute(fastify: FastifyInstance, mediator: Mediator) {
  fastify.get<{ Params: { id: string } }>('/user/:id', async (request, reply) => {
    try {
      const { id } = request.params;

      // Validate the ID format
      if (isNullOrEmptyOrInvalidUuid(id)) {
        return handleError(new BadRequestError('Invalid user Id'), reply);
      }

      // Use the mediator to handle the query
      const user = await mediator.send(new GetUserByIdQuery(id));
      return handleResult(user, reply);
    } catch (error) {
      return handleError(error, reply);
    }
  });
}
