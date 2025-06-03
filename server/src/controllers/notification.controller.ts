import { Request, Response, NextFunction } from "express";
import { NotificationRepository } from "../repositories/notification.repository";
import { AppError } from "../utils/AppError";

const notificationRepo = new NotificationRepository();

export const createNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notification = await NotificationRepository.create(req.body);
    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

export const markNotificationAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedNotification = await NotificationRepository.markAsRead(req.params.id);
    if (!updatedNotification) throw new AppError("Notification not found", 404);
    res.json(updatedNotification);
  } catch (error) {
    next(error);
  }
};

export const getUserNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notifications = await NotificationRepository.getUserNotifications(req.params.userId);
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await NotificationRepository.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
