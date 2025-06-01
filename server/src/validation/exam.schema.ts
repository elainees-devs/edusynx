// src/validation/exam.schema.ts
import { z } from 'zod';
import mongoose from 'mongoose';
import { Term, ExamType } from '../types';

// Helper to validate ObjectId
const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

export const examSchema = z.object({
  school: objectId,
  examName: z.string().min(1),
  classRef: objectId,
  subject: objectId,
  examDate: z.coerce.date(),
  academicYear: z.string().min(4),
  term: z.nativeEnum(Term),
  examType: z.nativeEnum(ExamType),
});
