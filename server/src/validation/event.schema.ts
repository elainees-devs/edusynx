// src/validation/event.schema.ts
import { z } from 'zod';
import mongoose from 'mongoose';

// Helper for ObjectId validation
const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

export const eventSchema = z.object({
  school: objectId,
  eventTitle: z.string().min(1),
  eventDescription: z.string().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  location: z.string().optional(),
  isAllDay: z.boolean(),
  createdBy: objectId,
  attendees: z.array(objectId).optional(),
  eventType: z.string().min(1),
});
