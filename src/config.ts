import convict from 'convict';
import dotenv from 'dotenv';
import process from 'process';
import convict_format_with_validator from 'convict-format-with-validator';

dotenv.config(); // Loads .env
convict.addFormats(convict_format_with_validator);

const convictConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  server: {
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 3000,
      env: 'PORT',
      arg: 'port',
    },
    host: {
      doc: 'The host to bind.',
      format: 'ipaddress',
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
  get env() {
    return convictConfig.get('env');
  }
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
