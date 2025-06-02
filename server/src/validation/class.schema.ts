// src/validation/class.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const createClassSchema = z.object({
  school: objectId,
  className: z.string().min(1),
  stream: z.string().min(3),
  academicYear: z.string().min(4),
});

export const updateClassSchema = createClassSchema.partial();