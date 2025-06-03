//src/validation/user.schema.ts
import { z } from "zod";
import { UserRole } from "../types/enum/enum";
import { objectId } from "./util";

// Base schema for all users
const baseUserSchema = z.object({
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

// Teacher-specific schema
const teacherUserExtension = z.object({
  role: z.literal(UserRole.TEACHER),
  teacherId: z.string().optional(),
  isClassTeacher: z.boolean().optional(),
  class: objectId,
  teachingSubjects: z.array(z.string()).optional(),
});

// Guardian-specific schema
const guardianUserExtension = z.object({
  role: z.literal(UserRole.GUARDIAN),
  familyNumber: z.number(),
});

// Other roles fallback
const generalUserExtension = z.object({
  role: z.enum([
    UserRole.SCHOOL_ADMIN,
    UserRole.ACCOUNTANT,
    UserRole.HEADTEACHER,
  ]),
});

// Strict schema for creation
export const createUserSchema = z.discriminatedUnion("role", [
  baseUserSchema.merge(teacherUserExtension),
  baseUserSchema.merge(guardianUserExtension),
  baseUserSchema.merge(generalUserExtension),
]);

// Relaxed schema for updates
export const updateUserSchema = z.discriminatedUnion("role", [
  baseUserSchema.merge(teacherUserExtension).partial(),
  baseUserSchema.merge(guardianUserExtension).partial(),
  baseUserSchema.merge(generalUserExtension).partial(),
]);
