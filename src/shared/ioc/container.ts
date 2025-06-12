import { container, DependencyContainer, Lifecycle } from 'tsyringe';
import { db } from 'infrastructure/database/drizzle';
import { UserRepository } from 'infrastructure/repositories/user.repository.impl';
import { IUserRepository } from 'domain/user/user.repository';
import AppConfig from 'config';
import { Class, Resolver } from 'mediatr-ts';
import { TYPES } from 'shared/ioc/container.tokens';

/**
 * Encapsulates all IoC registrations.
 */
export function setupContainer(customContainer: DependencyContainer = container): DependencyContainer {
  // Config
  customContainer.register(TYPES.Config, { useValue: AppConfig });

  // Database
  customContainer.register(TYPES.Db, { useValue: db });

  // Repositories
  customContainer.register<IUserRepository>(TYPES.IUserRepository, { useClass: UserRepository });

  return customContainer;
}

export { container };

export class ResolverDI implements Resolver {
  resolve<T>(type: Class<T>): T {
    return container.resolve(type.name);
  }

  add<T>(type: Class<T>): void {
    container.register(type.name, type, { lifecycle: Lifecycle.Transient });
  }
}
