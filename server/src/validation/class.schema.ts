// src/validation/class.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const classSchema = z.object({
  school: objectId,
  className: z.string().min(1),
  stream: z.string().min(3),
  academicYear: z.string().min(4),
});
