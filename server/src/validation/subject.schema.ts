// src/validation/subject.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const createSubjectSchema = z.object({
  school: objectId,
  subjectName: z.string().min(1),
  classRef: objectId,
});

export const updateSubjectSchema = createSubjectSchema.partial();
