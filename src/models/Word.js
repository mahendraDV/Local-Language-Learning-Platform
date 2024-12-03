import { BaseModel } from './BaseModel.js';

export class Word extends BaseModel {
  static get tableName() {
    return 'words';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['kannada', 'english', 'category'],
      properties: {
        id: { type: 'integer' },
        kannada: { type: 'string', minLength: 1 },
        english: { type: 'string', minLength: 1 },
        transliteration: { type: 'string' },
        category: { type: 'string' },
        difficulty_level: { type: 'string', enum: ['beginner', 'intermediate', 'advanced'] },
        usage_examples: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              kannada: { type: 'string' },
              english: { type: 'string' }
            }
          }
        },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }
}