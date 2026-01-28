// server/src/validation/guardian.schema.ts
import { z } from "zod";

export const createGuardianSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().min(1).optional(),
  lastName: z.string().min(1),
  email: z.string().email(),
  secondaryEmail: z.string().email().or(z.literal("")).optional(),
  primaryPhoneNumber: z.string().min(1),
  secondaryPhoneNumber: z.string().min(1).optional(),
})

export const updateGuardianSchema = createGuardianSchema.partial();