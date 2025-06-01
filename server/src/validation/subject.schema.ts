// src/validation/subject.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const subjectSchema = z.object({
  school: objectId,
  subjectName: z.string().min(1),
  classRef: objectId,
});
