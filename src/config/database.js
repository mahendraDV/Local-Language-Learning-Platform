import knex from 'knex';
import { Model } from 'objection';
import { config } from './config.js';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure the db directory exists
const dbDir = join(dirname(__dirname), '..', 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const knexInstance = knex(config.database);

Model.knex(knexInstance);

export default knexInstance;