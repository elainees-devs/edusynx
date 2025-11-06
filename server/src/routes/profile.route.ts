//server/src/routes/profile.route.ts
import { Router } from "express";
import { UserRole } from "../types";
import { authenticateUser } from "../middlewares/auth";

const profileRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management
 */

/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Authenticated user information
 *                 loginInfo:
 *                   type: object
 *                   description: User login metadata
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       403:
 *         description: Forbidden, user role not permitted
 */
profileRouter.get("/profile", authenticateUser(UserRole.TEACHER), (req, res) => {
  res.json({
    user: req.user,
    loginInfo: req.loginInfo,
  });
});

export { profileRouter };
