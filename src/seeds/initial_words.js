export async function seed(knex) {
  // Clear existing entries
  await knex('words').del();

  // Insert seed entries
  await knex('words').insert([
    {
      kannada: 'ನಮಸ್ಕಾರ',
      english: 'Hello',
      transliteration: 'Namaskara',
      category: 'greetings',
      difficulty_level: 'beginner',
      usage_examples: JSON.stringify([
        {
          kannada: 'ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ?',
          english: 'Hello, how are you?'
        }
      ])
    },
    {
      kannada: 'ಧನ್ಯವಾದ',
      english: 'Thank you',
      transliteration: 'Dhanyavada',
      category: 'greetings',
      difficulty_level: 'beginner',
      usage_examples: JSON.stringify([
        {
          kannada: 'ನಿಮಗೆ ತುಂಬಾ ಧನ್ಯವಾದಗಳು',
          english: 'Thank you very much'
        }
      ])
    }
  ]);
}