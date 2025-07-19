// server/src/validation/password-reset.schema.ts
import { z } from "zod";

export const passwordResetTokenSchema = z.object({
   email: z.string().email({ message: "Invalid email address" }),
});
