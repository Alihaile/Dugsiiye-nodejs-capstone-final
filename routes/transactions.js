import express from 'express';
import { transactionSchema } from '../schemas/transactionSchema.js';
import { zodValidator } from '../middlewares/zodValidator.js';
import { protect } from '../middlewares/auth.js';
import { addTransaction, deleteTransaction, getTransactions, updateTransaction, monthlySummary } from '../controllers/transactController.js';

const routes = express.Router();


/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Personal accounting and transaction engine
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions for the authenticated user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success list retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       401:
 *         description: Unauthorized - Valid JWT token missing
 */
routes.get('/', protect, getTransactions);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new financial transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#'
 *     responses:
 *       201:
 *         description: Transaction logged successfully
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#'
 *       400:
 *         description: Validation failed (Zod validation restrictions unmet)
 *       401:
 *         description: Unauthorized
 */
routes.post('/', protect, addTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Modify details of a specific historical transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique database entry hex ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#'
 *     responses:
 *       200:
 *         description: Entry successfully modified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#'
 *       400:
 *         description: Validation or payload formatting error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction record not found
 */
routes.put('/:id', protect, zodValidator(transactionSchema), updateTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Remove an existing transaction record permanently
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique database entry hex ID
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction record not found
 */
routes.delete('/:id', protect, deleteTransaction);

/**
 * @swagger
 * /api/transactions/monthly-summary:
 *   get:
 *     summary: Extract transaction metrics aggregated for a given calendar month
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - month
 *               - year
 *             properties:
 *               month:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 12
 *                 example: 10
 *               year:
 *                 type: integer
 *                 example: 2026
 *     responses:
 *       200:
 *         description: Aggregate monthly balances calculated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: number
 *                   example: 5400.00
 *                 totalExpense:
 *                   type: number
 *                   example: 2150.30
 *                 netSavings:
 *                   type: number
 *                   example: 3249.70
 *       401:
 *         description: Unauthorized
 */
routes.get('/monthly-summary', protect, monthlySummary);

export default routes;