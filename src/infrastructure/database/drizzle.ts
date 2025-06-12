import AppConfig from 'config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from 'infrastructure/database/schema';

const pool = new Pool({
  connectionString: AppConfig.dbConnectionString,
});

export const db = drizzle(pool, { schema });
