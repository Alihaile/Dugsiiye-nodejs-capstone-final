import express from 'express';
import authRoutes from './auth.js';
import adminRoutes from './admin.js';
import uploadRoutes from './upload.js';
import transactionRoutes from './transactions.js';
import { getCategories } from '../controllers/transactController.js';
const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/admin', adminRoutes);
routes.use('/upload', uploadRoutes);
routes.use('/transactions', transactionRoutes);


/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve available transaction categories
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: A list of default and user-defined categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Food", "Salary", "Rent", "Utilities", "Business"]
 */
routes.get('/categories', getCategories);

export default routes;