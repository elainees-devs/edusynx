// server/src/validation/class.teacher.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const createClassTeacherSchema = z.object({
  school: objectId,
  teacher: objectId,
  grade: objectId,
  stream: objectId,
  totalStudents: z.number().int().min(0).optional(),
});

export const updateClassTeacherSchema = createClassTeacherSchema.partial();