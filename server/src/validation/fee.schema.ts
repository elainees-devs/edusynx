// src/validation/fee.schema.ts
import { z } from 'zod';
import { FeeType, RecurringInterval, Term } from '../types/enum/enum';
import { objectId } from './util';

export const createFeeSchema = z.object({
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

export const updateFeeSchema = createFeeSchema.partial();
