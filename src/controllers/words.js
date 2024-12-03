import { Word } from '../models/Word.js';

export const addWord = async (req, res) => {
  try {
    const word = await Word.query().insert(req.body);
    res.status(201).json(word);
  } catch (error) {
    res.status(400).json({ message: 'Error adding word', error: error.message });
  }
};

export const getWords = async (req, res) => {
  try {
    const { category, difficulty_level, search } = req.query;
    let query = Word.query();

    if (category) {
      query = query.where('category', category);
    }
    if (difficulty_level) {
      query = query.where('difficulty_level', difficulty_level);
    }
    if (search) {
      query = query.where(builder => {
        builder
          .where('english', 'ilike', `%${search}%`)
          .orWhere('kannada', 'ilike', `%${search}%`)
          .orWhere('transliteration', 'ilike', `%${search}%`);
      });
    }

    const words = await query.orderBy('created_at', 'desc');
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching words', error: error.message });
  }
};

export const getWordById = async (req, res) => {
  try {
    const word = await Word.query().findById(req.params.id);
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }
    res.json(word);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching word', error: error.message });
  }
};

export const updateWord = async (req, res) => {
  try {
    const word = await Word.query().patchAndFetchById(req.params.id, req.body);
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }
    res.json(word);
  } catch (error) {
    res.status(400).json({ message: 'Error updating word', error: error.message });
  }
};

export const deleteWord = async (req, res) => {
  try {
    const deleted = await Word.query().deleteById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Word not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting word', error: error.message });
  }
};