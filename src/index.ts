import 'module-alias/register';
import Fastify from 'fastify';
import { Mediator } from 'mediatr-ts';
// Import the handler so the decorator runs and registers it
import './application/use-cases/handlers';
import { createUserRoute, getUserByIdRoute } from 'interfaces/routes/user';

const fastify = Fastify({ logger: true });

createUserRoute(fastify, new Mediator());
getUserByIdRoute(fastify, new Mediator());

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server running at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
