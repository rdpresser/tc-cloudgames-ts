import { User } from 'domain/user';
import { UserIdSchemaType } from 'shared/default-schemas';

export interface IUserRepository {
  findById(id: UserIdSchemaType): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
