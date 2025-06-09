import { FastifyInstance } from 'fastify';
import { handleResult, handleZodError } from 'interfaces/http';
import { CreateUserCommand, CreateUserCommandSchema } from 'application/use-cases/users/create-user';
import { Mediator } from 'mediatr-ts';

export async function createUserRoute(fastify: FastifyInstance, mediator: Mediator) {

  fastify.post<{ Body: CreateUserCommand }>(
    '/user',
    async (request, reply) => {
      const user = await CreateUserCommandSchema.safeParseAsync(request.body);

      if (!user.success) {
        return handleZodError(user.error, reply);
      }

      const { firstName, lastName, email, password, role } = user.data;
      const command = new CreateUserCommand(firstName, lastName, email, password, role);

      const result = await mediator.send(command);
      return handleResult(result, reply);
    }
  );
}
