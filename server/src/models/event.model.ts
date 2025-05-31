//src/models/event.model.ts
import { Schema, model, Types } from 'mongoose';
import { IEvent } from '../types/school/school-activity.types'; 

const eventSchema = new Schema<IEvent>(
  {
    school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    eventTitle: { type: String, required: true },
    eventDescription: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String },
    isAllDay: { type: Boolean, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    eventType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Event = model<IEvent>('Event', eventSchema);
