// server/src/routes/login.route.ts
import { Router } from "express";
import { LoginController } from "../controllers/security/login.controller";
import { loginSchema } from "../validation/login.schema";
import { validate } from "../middlewares/validate";
import { sanitizeHeaders } from "../middlewares/sanitizeHeaders";

const loginRouter = Router();
const loginsController = new LoginController();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login and receive a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
loginRouter.post(
  "/",
  sanitizeHeaders,
  validate(loginSchema),
  loginsController.login
);

export { loginRouter };
