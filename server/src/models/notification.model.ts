// server/src/models/notification.model.ts
import { Schema, model} from 'mongoose';
import { INotification } from '../types/school/school-activity.types'; 

const notificationSchema = new Schema<INotification>(
  {
    school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    notificationTitle: { type: String, required: true },
    message: { type: String, required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isRead: { type: Boolean, required: true, default: false },
    readAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const Notification = model<INotification>('Notification', notificationSchema);
