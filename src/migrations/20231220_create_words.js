export function up(knex) {
  return knex.schema.createTable('words', table => {
    table.increments('id').primary();
    table.string('kannada').notNullable();
    table.string('english').notNullable();
    table.string('transliteration');
    table.string('category').notNullable();
    table.enum('difficulty_level', ['beginner', 'intermediate', 'advanced'])
      .defaultTo('beginner');
    table.jsonb('usage_examples').defaultTo('[]');
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable('words');
}