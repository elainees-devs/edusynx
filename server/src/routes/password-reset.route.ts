// server/src/routes/password-reset.route.ts
import express from "express";
import { PasswordResetTokenController } from "../controllers/security/password-reset.controller";

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
 *               - token
 *               - expiresAt
 *             properties:
 *               userId:
 *                 type: string
 *                 description: Optional user ID
 *               superAdminId:
 *                 type: string
 *                 description: Optional super admin ID
 *               token:
 *                 type: string
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Token created successfully
 *       400:
 *         description: Missing userId or superAdminId
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
 *         required: true
 *         schema:
 *           type: string
 *         description: The token to verify
 *     responses:
 *       200:
 *         description: Token is valid
 *       404:
 *         description: Token not found or expired
 */
resetRouter.get("/:token", controller.verifyToken);

/**
 * @swagger
 * /api/v1/password-reset/{token}/use:
 *   patch:
 *     summary: Mark a password reset token as used
 *     tags: [PasswordReset]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
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
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID whose tokens will be deleted
 *     responses:
 *       200:
 *         description: Tokens deleted successfully
 *       404:
 *         description: No tokens found for the user
 */
resetRouter.delete("/user/:userId", controller.deleteUserTokens);

/**
 * @swagger
 * /api/v1/password-reset/confirm:
 *   post:
 *     summary: Confirm and reset password using a token
 *     tags: [PasswordReset]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: Password reset token
 *               newPassword:
 *                 type: string
 *                 description: New password for the user
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid token or password
 */
resetRouter.post("/confirm", controller.resetPassword); 

export { resetRouter };
