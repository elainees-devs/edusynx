// server/src/routes/notification.route.ts
import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { validate } from "../middlewares/validate";
import { createNotificationSchema, updateNotificationSchema } from "../validation/notification.schema";

const notificationRouter = Router();
const notificationController = new NotificationController();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management endpoints
 */

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationCreate'
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       400:
 *         description: Validation error
 */
notificationRouter.post("/", validate(createNotificationSchema), notificationController.createNotification);

/**
 * @swagger
 * /api/notifications/user/{userId}:
 *   get:
 *     summary: Get notifications for a specific user
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of notifications for the user
 *       404:
 *         description: User or notifications not found
 */
notificationRouter.get("/user/:userId", notificationController.getUserNotifications);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationUpdate'
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       404:
 *         description: Notification not found
 */
notificationRouter.put("/:id/read", validate(updateNotificationSchema), notificationController.markNotificationAsRead);

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Delete a notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       204:
 *         description: Notification deleted
 *       404:
 *         description: Notification not found
 */
notificationRouter.delete("/:id", notificationController.deleteNotification);

export { notificationRouter };
