// src/validation/login.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const loginSchema = z.object({
  userId: objectId,
  sessionId: z.string().optional(), 
  isSuccessful: z.boolean(),
  failureReason: z.string().optional(),
});
