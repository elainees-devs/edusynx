// src/validation/exam.schema.ts
import { z } from 'zod';
import { Term, ExamType } from '../types';
import { objectId } from './util';

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

