import { container } from 'tsyringe';
import { IUserRepository } from 'domain/user';
import { UserRepository } from 'infrastructure/repositories';
import { CONFIG_TOKEN, USER_REPOSITORY_TOKEN } from 'shared/ioc';
import AppConfig from 'config';

container.register(CONFIG_TOKEN, { useValue: AppConfig });
container.register<IUserRepository>(USER_REPOSITORY_TOKEN, { useClass: UserRepository });
