// src/validation/notification.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const createNotificationSchema = z.object({
  school: objectId,
  notificationTitle: z.string().min(1),
  message: z.string().min(1),
  recipient: objectId,
  isRead: z.boolean().default(false),
  readAt: z.coerce.date().optional(),
});

export const updateNotificationSchema = createNotificationSchema.partial();
