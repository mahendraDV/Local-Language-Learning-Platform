import bcrypt from 'bcryptjs';

export async function seed(knex) {
  // Clear existing entries
  await knex('users').del();

  // Insert seed entries
  await knex('users').insert([
    {
      username: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin'
    },
    {
      username: 'contributor',
      email: 'contributor@example.com',
      password: await bcrypt.hash('contributor123', 10),
      role: 'contributor'
    }
  ]);
}