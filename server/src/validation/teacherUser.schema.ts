// src/validation/teacherUser.schema.ts
import { z } from "zod";
import { UserRole } from "../types/enum/enum";
import { objectId } from "./util";

export const createTeacherUserSchema = z.object({
  role: z.literal(UserRole.TEACHER),
  teacherId: z.string().optional(),
  isClassTeacher: z.boolean().optional(),
  class: objectId,
  teachingSubjects: z.array(z.string()).optional(),
});

export const updateTeacherUserSchema = createTeacherUserSchema.partial()
