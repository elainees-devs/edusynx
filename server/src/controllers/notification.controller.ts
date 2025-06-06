//src/controllers/notification.controller.ts
import { NotificationRepository } from "../repositories/notification.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const notificationRepo = new NotificationRepository();

export const createNotification = handleAsync(async (req, res) => {
  const notification = await notificationRepo.create(req.body);
  res.status(201).json(notification);
});

export const markNotificationAsRead = handleAsync(async (req, res) => {
  const updatedNotification = await notificationRepo.markAsRead(req.params.id);
  if (!updatedNotification) throw new AppError("Notification not found", 404);
  res.json(updatedNotification);
});

export const getUserNotifications = handleAsync(async (req, res) => {
  const notifications = await notificationRepo.getUserNotifications(req.params.userId);
  res.json(notifications);
});

export const deleteNotification = handleAsync(async (req, res) => {
  await notificationRepo.deleteNotification(req.params.id);
  res.status(204).send();
});

