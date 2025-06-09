// import { FastifyInstance } from 'fastify';
// //import { GetUserQuery } from '../../../application/use-cases/users/get-by-id/query.params';
// // import { GetUserQueryHandler } from '../../../application/use-cases/users/get-by-id/query.handler';
// // import { Mediator } from '../../../application/abstractions/messaging/mediator';
// //import { GetUserResponse } from 'application/use-cases/users/get-by-id/query.response';
// import { handleResult, handleZodError } from '../../http';
// //import { isNullOrEmptyOrInvalidUuid } from '../../../shared/extensions/string-extensions';
// import { Mediator } from 'mediatr-ts';

// export async function userGetByIdRoute(fastify: FastifyInstance, mediator: Mediator) {
//   //const mediator = new Mediator();


//   //mediator.register(GetUserQuery, new GetUserQueryHandler());
//   //mediator.register(CreateUserCommand, new CreateUserCommandHandler());

//   // fastify.get('/user/:id', async (request, reply) => {
//   //   const { id } = request.params as { id: string };

//   //   //remove this validation when using a proper validation library
//   //   if (isNullOrEmptyOrInvalidUuid(id)) {
//   //     reply.status(400).send({ error: 'Invalid user Id' });
//   //     return;
//   //   }

//   //   // Use the mediator to handle the query
//   //   const user = await mediator.send<GetUserQuery, GetUserResponse>(new GetUserQuery(id));
//   //   return handleResult(user, reply);
//   // });

// }
