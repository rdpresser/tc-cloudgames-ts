import { injectable } from 'tsyringe';
import { eq } from 'drizzle-orm';
import { User, IUserRepository, UserProps } from 'domain/user';
import { UserIdSchemaType } from 'shared/default-schemas';
import { db } from 'infrastructure/database';
import { users } from 'infrastructure/database/schema';
import { Result } from 'neverthrow';
import { ZodError } from 'zod/v4';

@injectable()
// TODO: fazer injeção de dependência do db

export class UserRepository implements IUserRepository {
  async findById(id: UserIdSchemaType): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id));
    if (!result[0]) return null;

    const resultMap = await this.mapToDomain(result[0]);
    if (resultMap.isOk()) {
      return resultMap.value;
    }
    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.email, email));
    if (!result[0]) return null;

    const resultMap = await this.mapToDomain(result[0]);
    if (resultMap.isOk()) {
      return resultMap.value;
    }
    return null;
  }

  async create(user: UserProps): Promise<User> {
    const [created] = await db
      .insert(users)
      .values({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
      })
      .returning();

    const result = await this.mapToDomain(created);
    if (result.isOk()) {
      return result.value;
    }
    throw new Error(result.error.message);
  }

  private async mapToDomain(row: unknown): Promise<Result<User, ZodError>> {
    if (typeof row !== 'object' || row === null) {
      throw new Error('Invalid user data');
    }

    const userRow = row as {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      role: string;
    };

    // Assuming UserProps is the type for User.create
    const userProps: UserProps = {
      firstName: userRow.first_name,
      lastName: userRow.last_name,
      email: userRow.email,
      password: userRow.password,
      role: userRow.role,
    };

    return await User.create(userProps);
  }
}
