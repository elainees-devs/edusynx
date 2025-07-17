// server/src/routes/password-reset.route.ts
import express from "express";
import { PasswordResetTokenController } from "../controllers/password-reset.controller";

const resetRouter = express.Router();
const controller = new PasswordResetTokenController();

/**
 * @swagger
 * tags:
 *   name: PasswordReset
 *   description: Password reset token management
 */

/**
 * @swagger
 * /api/v1/password-reset:
 *   post:
 *     summary: Create a password reset token
 *     tags: [PasswordReset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - token
 *               - expiresAt
 *             properties:
 *               userId:
 *                 type: string
 *               token:
 *                 type: string
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Token created successfully
 */
resetRouter.post("/", controller.createToken);

/**
 * @swagger
 * /api/v1/password-reset/{token}:
 *   get:
 *     summary: Verify a password reset token
 *     tags: [PasswordReset]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token to verify
 *     responses:
 *       200:
 *         description: Token is valid
 *       400:
 *         description: Token is invalid or expired
 */
resetRouter.get("/:token", controller.verifyToken);

/**
 * @swagger
 * /api/v1/password-reset/{token}/use:
 *   patch:
 *     summary: Mark a token as used
 *     tags: [PasswordReset]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token to mark as used
 *     responses:
 *       200:
 *         description: Token marked as used
 *       404:
 *         description: Token not found
 */
resetRouter.patch("/:token/use", controller.markTokenUsed);

/**
 * @swagger
 * /api/v1/password-reset/user/{userId}:
 *   delete:
 *     summary: Delete all password reset tokens for a user
 *     tags: [PasswordReset]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID whose tokens should be deleted
 *     responses:
 *       200:
 *         description: Tokens deleted successfully
 */
resetRouter.delete("/user/:userId", controller.deleteUserTokens);

export {resetRouter};

