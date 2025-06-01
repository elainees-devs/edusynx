// src/validation/session.schema.ts
import { z } from "zod";

export const sessionSchema = z.object({
  userId: z.string().min(1),
  logoutTime: z.coerce.date().optional(),
  lastAccessedAt: z.coerce.date().optional(),
  expiryTime: z.number().int().min(1),
  permissions: z.array(z.string()).optional(),
  roles: z.array(z.string()).optional(),
});
