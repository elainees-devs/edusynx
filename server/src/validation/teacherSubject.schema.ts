// src/validation/teacherSubject.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const createTeacherSubjectSchema = z.object({
  school: objectId,
  teacherId: objectId,
  subjectId: objectId,
});

export const updateTeacherSubjectSchema = createTeacherSubjectSchema.partial();
