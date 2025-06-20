// src/validation/examResult.schema.ts
import { z } from 'zod';
import { objectId } from './util';

export const createExamResultSchema = z.object({
  school: objectId,
  exam: objectId,
  student: objectId,
  subject: objectId,
  marks: z.number().min(0),
  grade: z.string().min(1),
  comments: z.string().optional(),
});

export const updateExamResultSchema = createExamResultSchema.partial();

