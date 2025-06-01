// src/validation/fee.schema.ts
import { z } from 'zod';
import mongoose from 'mongoose';
import { FeeType, RecurringInterval, Term } from '../types/enum/enum';

// Helper to validate MongoDB ObjectId
const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

export const feeSchema = z.object({
  feeType: z.nativeEnum(FeeType),
  feeName: z.string().min(1),
  description: z.string().optional(),
  amount: z.number().min(0),
  term: z.nativeEnum(Term),
  classId: objectId,
  school: objectId,
  dueDate: z.coerce.date(),
  isRecurring: z.boolean().optional(),
  recurringInterval: z.nativeEnum(RecurringInterval).optional(),
  academicTerm: z.string().min(1),
});
