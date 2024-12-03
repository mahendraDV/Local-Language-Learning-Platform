import express from 'express';
import { addWord, getWords, getWordById, updateWord, deleteWord } from '../controllers/words.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Word:
 *       type: object
 *       required:
 *         - kannada
 *         - english
 *         - category
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the word
 *         kannada:
 *           type: string
 *           description: The word in Kannada script
 *         english:
 *           type: string
 *           description: English translation of the word
 *         transliteration:
 *           type: string
 *           description: Transliteration in English
 *         category:
 *           type: string
 *           description: Category of the word (e.g., greetings, food)
 *         difficulty_level:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         usage_examples:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               kannada:
 *                 type: string
 *               english:
 *                 type: string
 */

/**
 * @swagger
 * /api/words:
 *   get:
 *     summary: Get all words
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter words by category
 *       - in: query
 *         name: difficulty_level
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         description: Filter words by difficulty level
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in english, kannada, or transliteration
 *     responses:
 *       200:
 *         description: List of words
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Word'
 */
router.get('/', getWords);

/**
 * @swagger
 * /api/words/{id}:
 *   get:
 *     summary: Get a word by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A word object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Word'
 *       404:
 *         description: Word not found
 */
router.get('/:id', getWordById);

/**
 * @swagger
 * /api/words:
 *   post:
 *     summary: Add a new word
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Word'
 *     responses:
 *       201:
 *         description: Created word object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/', authenticate, authorize('admin', 'contributor'), addWord);

/**
 * @swagger
 * /api/words/{id}:
 *   put:
 *     summary: Update a word
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Word'
 *     responses:
 *       200:
 *         description: Updated word object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Word not found
 */
router.put('/:id', authenticate, authorize('admin', 'contributor'), updateWord);

/**
 * @swagger
 * /api/words/{id}:
 *   delete:
 *     summary: Delete a word
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Word deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Word not found
 */
router.delete('/:id', authenticate, authorize('admin'), deleteWord);

export default router;