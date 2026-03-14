// server/src/validation/subscription.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const createSubscriptionSchema = z.object({
  school: objectId,
  planId: objectId,
  durationInMonths: z.number().int().positive(),
  isActive: z.boolean().optional().default(true),
});

export const updateSubscriptionSchema = createSubscriptionSchema.partial();
