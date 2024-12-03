import { BaseModel } from './BaseModel.js';
import bcrypt from 'bcryptjs';

export class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 3 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
        role: {
          type: 'string',
          enum: ['learner', 'contributor', 'admin'],
          default: 'learner'
        },
        is_active: { type: 'boolean', default: true },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }

  async $beforeInsert() {
    await super.$beforeInsert();
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}