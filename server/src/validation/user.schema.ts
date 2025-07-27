// src/validation/user.schema.ts
import { z } from "zod";
import { objectId } from "./util";

// Base schema
const baseUserSchema = z.object({
  school: objectId,
  firstName: z.string().min(3),
  middleName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  secondaryEmail: z.string().email().optional(),
  primaryPhoneNumber: z.string().min(10),
  secondaryPhoneNumber: z.string().min(10).optional(),
  password: z.string().min(8),
  nationality: z.string().min(6),
  avatarUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
  lastLogin: z.coerce.date().optional(),
  isLocked: z.boolean().default(false),
  passwordChangedAt: z.coerce.date().optional(),
  isTwoFactorEnabled: z.boolean().default(false),
  classId: z.string().optional(), 
}).strict(); // Add strict() to prevent extra properties

// Teacher schema
const teacherSchema = baseUserSchema.extend({
  role: z.literal("teacher"), 
  teacherId: z.string().optional(),
  isClassTeacher: z.boolean().optional(),
  assignedClass: z.string().optional(),
});

// Guardian schema
const guardianSchema = baseUserSchema.extend({
  role: z.literal("guardian"),
  familyNumber: z.number(),
});

// School Admin schema
const schoolAdminSchema = baseUserSchema.extend({
  role: z.literal("school-admin"),
});

// Accountant schema
const accountantSchema = baseUserSchema.extend({
  role: z.literal("accountant"),
});

// Headteacher schema
const headteacherSchema = baseUserSchema.extend({
  role: z.literal("headteacher"),
});

// Create discriminated union
export const createUserSchema = z.discriminatedUnion("role", [
  teacherSchema,
  guardianSchema,
  schoolAdminSchema,
  accountantSchema,
  headteacherSchema,
]);

// Update schemas (partial)
export const updateUserSchema = z.union([
  teacherSchema.partial(),
  guardianSchema.partial(),
  schoolAdminSchema.partial(),
  accountantSchema.partial(),
  headteacherSchema.partial(),
]);