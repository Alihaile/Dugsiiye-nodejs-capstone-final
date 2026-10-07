import express from 'express';
import { login, register, getProfileInfo } from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';
const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User handling, registration, and session token generation
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new system user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssword123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Email duplicate or malformed body data
 */
routes.post('/register', register);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user credentials and return bearer access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssword123
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid email or password confirmation mismatch
 */
routes.post('/login', login);


/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Retrieve profile credentials of the logged-in entity
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user metadata returned
 *       401:
 *         description: Token expired or access blocked
 */
routes.get('/profile', protect, getProfileInfo);

export default routes;