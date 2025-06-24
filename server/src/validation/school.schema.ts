// server/src/validation/school.schema.ts
import { z } from "zod";

export const createSchoolSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  phoneNumber: z.string().min(10),
  email: z.string().email(),
  establishedYear: z.number().int().min(1000).max(new Date().getFullYear()),
  isActive: z.boolean().optional().default(false),
  schoolCode: z.string().min(4),
  slug: z.string().min(1).optional(),
  role:z.string().min(1)
});

export const updateSchoolSchema = createSchoolSchema.partial();
