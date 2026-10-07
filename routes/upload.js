import express from 'express';
import { uploadFile } from '../controllers/uploadController.js';
import { protect } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const routes = express.Router();


/**
 * @swagger
 * tags:
 *   name: File Upload
 *   description: Binary streams and image asset processing
 */

/**
 * @swagger
 * /api/upload/profile-picture:
 *   post:
 *     summary: Upload or update current profile avatar image
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Image payload object (JPEG, PNG, or PDF file, up to 5MB max limit)
 *     responses:
 *       200:
 *         description: Image processed and uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Upload successful
 *                 url:
 *                   type: string
 *                   example: https://cloudinary.com
 *       400:
 *         description: File format unsupported or size exceeds limits
 *       401:
 *         description: Missing authentication context
 */
routes.post('/profile-picture', protect, upload.single('file'), uploadFile);

export default routes;