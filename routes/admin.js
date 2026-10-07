import express from 'express';
import { overview } from '../controllers/authController.js';
import { authorize, protect } from '../middlewares/auth.js';
const routes = express.Router();


/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Privileged metrics and infrastructure analytical endpoints
 */

/**
 * @swagger
 * /api/admin/overview:
 *   get:
 *     summary: Get high-level system metrics over historical data pools
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Multi-tenant performance metrics returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSystemUsers:
 *                   type: integer
 *                   example: 1245
 *                 totalVolumeTransacted:
 *                   type: number
 *                   example: 450090.25
 *       401:
 *         description: Access token missing
 *       403:
 *         description: Forbidden - Target identity lacks administrative flags
 */
routes.get('/overview', protect, authorize('admin'), overview);

export default routes;