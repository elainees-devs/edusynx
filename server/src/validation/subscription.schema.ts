// server/src/validation/subscription.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const createSubscriptionSchema = z.object({
  school: objectId,
  planId: objectId,
  startDate: z.string().datetime({ message: "Invalid start date" }),
  endDate: z.string().datetime({ message: "Invalid end date" }),
  isActive: z.boolean().optional().default(true),
});

export const updateSubscriptionSchema = createSubscriptionSchema.partial();
