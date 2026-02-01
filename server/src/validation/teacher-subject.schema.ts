// server/src/validation/teacher-subject.schema.ts

import { z } from "zod";
import { objectId } from "./util";

export const createTeacherSubjectSchema = z.object({
  school: objectId,
  teacherId: objectId,
  subjectId: objectId,
  classIds: z.array(objectId).min(1),
  streamIds: z.array(objectId).min(1),
});

export const updateTeacherSubjectSchema = createTeacherSubjectSchema.partial();
