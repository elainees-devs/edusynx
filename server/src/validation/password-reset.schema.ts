// server/src/validation/password-reset.schema.ts
import { z } from "zod";

export const passwordResetTokenSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  token: z.string().min(1, "Token is required"),
  expiresAt: z.coerce.date().refine(date => date > new Date(), {
    message: "Expiration date must be in the future",
  }),
  used: z.boolean().optional(),
});
