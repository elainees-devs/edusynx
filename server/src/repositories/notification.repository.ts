//src/repositories/notification.repository.ts
import { Notification } from "../models/notification.model";
import { INotification } from "../types/school/school-activity.types";

export class NotificationRepository {
  // Create a dashboard notification
  async create(
    notificationData: Partial<INotification>
  ): Promise<INotification> {
    const notification = new Notification(notificationData);
    return await notification.save();
  }

  // Mark a notification as read
  async markAsRead(notificationId: string): Promise<INotification | null> {
    return await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true, readAt: new Date() },
      { new: true }
    );
  }

  // Get all notifications for a user
  async getUserNotifications(userId: string): Promise<INotification[]> {
    return await Notification.find({ recipient: userId }).sort({
      createdAt: -1,
    });
  }

  // Optional: Delete notification
  async deleteNotification(notificationId: string): Promise<void> {
    await Notification.findByIdAndDelete(notificationId);
  }
}
