import type { Config } from 'drizzle-kit';
import AppConfig from './src/config';

const configORM: Config = {
  schema: './src/infrastructure/database/schema',
  out: './src/infrastructure/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: AppConfig.dbConnectionString,
  },
};

export default configORM;
