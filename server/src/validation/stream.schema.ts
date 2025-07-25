// server/src/validation/stream.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const createStreamSchema = z.object({
  school: objectId,
  streamName: z.string().min(3),
  academicYear: z.string().min(3),
});

export const updateStreamSchema = createStreamSchema.partial();