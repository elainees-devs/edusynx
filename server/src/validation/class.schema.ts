// server/src/validation/class.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const createClassSchema = z.object({
  school: objectId.optional(), // Required only for Super Admin
  clasName: z.string().min(1),
  academicYear: z.string().min(4),
});

export const updateClassSchema = createClassSchema.partial();