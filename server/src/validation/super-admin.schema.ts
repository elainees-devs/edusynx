// src/schemas/super-admin.schema.ts
import { z } from "zod";

// Zod Super Admin schema
export const superAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.literal("SUPER_ADMIN"),
});
