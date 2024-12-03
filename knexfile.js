import { config } from './src/config/config.js';

export default {
  development: {
    ...config.database
  },
  production: {
    ...config.database
  }
};