// src/validation/event.schema.ts
import { z } from 'zod';
import { objectId } from './util';

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
