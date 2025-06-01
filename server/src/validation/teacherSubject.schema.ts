// src/validation/teacherSubject.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const teacherSubjectSchema = z.object({
  school: objectId,
  teacherId: objectId,
  subjectId: objectId,
});
