import convict from 'convict';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config(); // Loads .env

const convictConfig = convict({
  server: {
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 3000,
      env: 'PORT',
    },
    host: {
      doc: 'The host to bind.',
      format: String,
      default: '0.0.0.0',
      env: 'HOST',
    },
  },
  db: {
    connectionString: {
      doc: 'Database connection string',
      format: String,
      default: '',
      env: 'DB_CONNECTION_STRING',
    },
  },
});

convictConfig.loadFile(['config/default.json', `config/${process.env['NODE_ENV'] || 'development'}.json`]);
convictConfig.validate({ allowed: 'strict' });

class AppConfigSettings {
  get dbConnectionString() {
    return convictConfig.get('db.connectionString');
  }
  get serverHost() {
    return convictConfig.get('server.host');
  }
  get serverPort() {
    return convictConfig.get('server.port');
  }
  // Optionally expose the raw convict config if needed
  get raw() {
    return convictConfig;
  }
}

const AppConfig = new AppConfigSettings();
export default AppConfig;
