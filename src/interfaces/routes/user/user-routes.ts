import { FastifyInstance } from 'fastify';
import { GetUserQuery } from '../../../application/use-cases/users/get-by-id/query';
import { GetUserQueryHandler } from '../../../application/use-cases/users/get-by-id/handler-zod';
import { Mediator } from '../../../application/abstractions/messaging/mediator';
import { GetUserResponse } from 'application/use-cases/users/get-by-id/response';
import { handleResult, handleZodError } from '../../custom-results/custom-result';
import { isNullOrEmptyOrInvalidUuid } from '../../../infrastructure/cross-cutting/commons/extensions/string-extensions';
import { CreateUserResponse } from '../../../application/use-cases/users/create-user/response';
import { CreateUserCommandHandler } from '../../../application/use-cases/users/create-user/command-handler';
import { CreateUserCommand } from '../../../application/use-cases/users/create-user/command-schema-validator';
import { CreateUserDomainSchema } from '../../../domain/aggregates/user/create-schema-validator';

export default async function userRoutes(fastify: FastifyInstance) {
  const mediator = new Mediator();
  mediator.register(GetUserQuery, new GetUserQueryHandler());
  mediator.register(CreateUserCommand, new CreateUserCommandHandler());

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

  fastify.post<{ Body: CreateUserCommand }>(
    '/user',
    async (request, reply) => {
      const user = await CreateUserDomainSchema.safeParseAsync(request.body);

      if (!user.success) {
        return handleZodError(user.error, reply);
      }

      const command = new CreateUserCommand(user.data);

      const result = await mediator.send<CreateUserCommand, CreateUserResponse>(command);
      return handleResult(result, reply);
    }
  );
}
