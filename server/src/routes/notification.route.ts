// src/routes/notification.route.ts
import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { validate } from "../middlewares/validate";
import { createNotificationSchema, updateNotificationSchema } from "../validation/notification.schema";

const notificationRouter = Router();
const notificationController = new NotificationController();

notificationRouter.post("/",validate(createNotificationSchema), notificationController.createNotification);
notificationRouter.get("/user/:userId", notificationController.getUserNotifications);
notificationRouter.put("/:id/read",validate(updateNotificationSchema), notificationController.markNotificationAsRead);
notificationRouter.delete("/:id", notificationController.deleteNotification);

export default notificationRouter;
