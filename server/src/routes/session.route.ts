// server/src/routes/session.route.ts
import { Router } from "express";
import { SessionController } from "../controllers";
import { createSessionSchema, updateSessionSchema } from "../validation/session.schema";
import { validate } from "../middlewares/validate";

const sessionRouter = Router();
const sessionController = new SessionController();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Manage user login sessions
 */

/**
 * @swagger
 * /api/v1/sessions:
 *   post:
 *     summary: Create a new session
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SessionCreate'
 *     responses:
 *       201:
 *         description: Session created
 *       400:
 *         description: Validation error
 */
sessionRouter.post("/", validate(createSessionSchema), sessionController.createSession);

/**
 * @swagger
 * /api/v1/sessions:
 *   get:
 *     summary: Get all sessions
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: List of all sessions
 */
sessionRouter.get("/", sessionController.getAllSessions);

/**
 * @swagger
 * /api/v1/sessions/active:
 *   get:
 *     summary: Get all active sessions
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: List of active sessions
 */
sessionRouter.get("/active", sessionController.getActiveSessions);

/**
 * @swagger
 * /api/v1/sessions/user/{userId}:
 *   get:
 *     summary: Get all sessions for a user
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Sessions for the user
 */
sessionRouter.get("/user/:userId", sessionController.getSessionsByUserId);

/**
 * @swagger
 * /api/v1/sessions/{id}:
 *   get:
 *     summary: Get a session by ID
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Session found
 *       404:
 *         description: Session not found
 */
sessionRouter.get("/:id", sessionController.getSessionById);

/**
 * @swagger
 * /api/v1/sessions/{id}:
 *   put:
 *     summary: Update a session
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SessionUpdate'
 *     responses:
 *       200:
 *         description: Session updated
 *       404:
 *         description: Session not found
 */
sessionRouter.put("/:id", validate(updateSessionSchema), sessionController.updateSession);

/**
 * @swagger
 * /api/v1/sessions/{id}:
 *   delete:
 *     summary: Delete a session by ID
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Session ID
 *     responses:
 *       204:
 *         description: Session deleted
 */
sessionRouter.delete("/:id", sessionController.deleteSession);

/**
 * @swagger
 * /api/v1/sessions:
 *   delete:
 *     summary: Delete all sessions
 *     tags: [Sessions]
 *     responses:
 *       204:
 *         description: All sessions deleted
 */
sessionRouter.delete("/", sessionController.deleteAllSessions);

export { sessionRouter };

