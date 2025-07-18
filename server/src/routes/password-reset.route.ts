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

// Token verification
resetRouter.get("/:token", controller.verifyToken);

// Mark token as used
resetRouter.patch("/:token/use", controller.markTokenUsed);

// Delete tokens by userId
resetRouter.delete("/user/:userId", controller.deleteUserTokens);

export { resetRouter };
