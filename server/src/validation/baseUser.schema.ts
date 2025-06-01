// src/validation/baseUser.schema.ts
import { z } from 'zod';
import mongoose from 'mongoose';
import { UserRole } from '../types/enum/enum';

// Helper to validate ObjectId
const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

export const baseUserSchema = z.object({
  school: objectId,
  firstName: z.string().min(3),
  middleName: z.string().min(3),
  lastName: z.string().min(3),
  primaryEmail: z.string().email(),
  secondaryEmail: z.string().email().optional(),
  primaryPhoneNumber: z.string().min(10),
  secondaryPhoneNumber: z.string().min(10).optional(),
  hashedPassword: z.string().min(8),
  nationality: z.string().min(6),
  avatarUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
  lastLogin: z.coerce.date().optional(),
  isLocked: z.boolean().default(false),
  passwordChangedAt: z.coerce.date().optional(),
  isTwoFactorEnabled: z.boolean().default(false),
  role: z.nativeEnum(UserRole),
});
