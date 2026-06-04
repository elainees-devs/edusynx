import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

const baseStaffSchema = z.object({
  school: objectId,
  firstName: z.string().min(1).max(100),
  middleName: z.string().max(100).optional(),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  secondaryEmail: z.string().email().optional(),
  primaryPhoneNumber: z.string().min(5).max(20),
  secondaryPhoneNumber: z.string().max(20).optional(),
  password: z.string().min(6).optional(),
  nationality: z.string().min(1),
  avatarUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
  isLocked: z.boolean().optional(),
  isTwoFactorEnabled: z.boolean().optional(),
  department: objectId.optional(),
  position: z.string().max(100).optional(),
  isHeadOfDepartment: z.boolean().optional(),
  employmentDate: z.string().optional(),
});

const teacherSchema = baseStaffSchema.extend({
  role: z.literal("teacher"),
  isClassTeacher: z.boolean().optional(),
  assignedClass: objectId.optional(),
});

const principalSchema = baseStaffSchema.extend({
  role: z.literal("principal"),
});

const deputyPrincipalSchema = baseStaffSchema.extend({
  role: z.literal("deputy-principal"),
});

const accountantSchema = baseStaffSchema.extend({
  role: z.literal("accountant"),
});

const schoolAdminSchema = baseStaffSchema.extend({
  role: z.literal("school-admin"),
});

export const createStaffSchema = z.discriminatedUnion("role", [
  teacherSchema,
  principalSchema,
  deputyPrincipalSchema,
  accountantSchema,
  schoolAdminSchema,
]);

export const updateStaffSchema = baseStaffSchema.partial().extend({
  role: z.enum(["teacher", "principal", "deputy-principal", "accountant", "school-admin"]).optional(),
});

export const assignDepartmentSchema = z.object({
  departmentId: objectId,
});

export const assignPositionSchema = z.object({
  position: z.string().min(1).max(100),
});
