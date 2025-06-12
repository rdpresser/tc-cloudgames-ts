import 'module-alias/register'; // to enable module aliasing for TypeScript path aliases
import 'reflect-metadata';
import 'shared/ioc/container';
import AppConfig from 'config';
import Fastify from 'fastify';
import { Mediator } from 'mediatr-ts';
import process from 'process';
import console from 'console';

// Import the handler so the decorator runs and registers it
import './application/use-cases/handlers';
import { createUserRoute, getUserByIdRoute } from 'interfaces/routes/user';

const fastify = Fastify({ logger: true });
const mediator = new Mediator();

createUserRoute(fastify, mediator);
getUserByIdRoute(fastify, mediator);

const start = async () => {
  try {
    await fastify.listen({ port: AppConfig.serverPort, host: AppConfig.serverHost });
    console.log(`Server running at http://${AppConfig.serverHost}:${AppConfig.serverPort}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
