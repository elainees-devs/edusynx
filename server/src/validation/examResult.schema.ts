// src/validation/examResult.schema.ts
import { z } from 'zod';
import mongoose from 'mongoose';

// Helper to validate MongoDB ObjectId
const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

export const examResultSchema = z.object({
  school: objectId,
  exam: objectId,
  student: objectId,
  subject: objectId,
  marks: z.number().min(0),
  grade: z.string().min(1),
  comments: z.string().optional(),
});
