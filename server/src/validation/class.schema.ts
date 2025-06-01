// src/validation/class.schema.ts
import { z } from 'zod';
import mongoose from 'mongoose';

// Helper to validate MongoDB ObjectId
const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

export const classSchema = z.object({
  school: objectId,
  className: z.string().min(1),
  stream: z.string().min(3),
  academicYear: z.string().min(4),
});
