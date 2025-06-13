import process from 'process';
import console from 'console';

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

import 'reflect-metadata';
import 'module-alias/register'; // to enable module aliasing for TypeScript path aliases
import AppConfig from 'config';
import { ResolverDI, setupContainer } from 'shared/ioc/container';
import 'application/use-cases/handlers'; // Import the handler so the decorator runs and registers it
import Fastify from 'fastify';
import { Mediator } from 'mediatr-ts';
import { createUserRoute, getUserByIdRoute } from 'interfaces/routes/user';
import { globalErrorHandler } from 'interfaces/http/global-error-handler';

const fastify = Fastify({ logger: true });
fastify.setErrorHandler(globalErrorHandler); // Register the global error handler BEFORE routes

setupContainer(); // Initialize the IoC container

// Tell Mediator to use tsyringe for handler resolution
const mediator = new Mediator({
  resolver: new ResolverDI(),
});

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
