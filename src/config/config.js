import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  database: {
    client: 'sqlite3',
    connection: {
      filename: join(dirname(__dirname), '..', 'db', 'kannada_learning.sqlite')
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: join(dirname(__dirname), 'migrations')
    },
    seeds: {
      directory: join(dirname(__dirname), 'seeds')
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '1d'
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  }
};