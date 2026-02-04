// server/src/validation/subscription.schema.ts
import { z } from "zod";
import { FEATURE_KEYS } from "../constants";

export const createSubscriptionPlanSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  price: z.number().positive("Price must be a positive number"),
  durationInMonths: z.number().int().positive("Duration must be a positive integer"),
  features: z.array(
    z.enum([...Object.values(FEATURE_KEYS)] as [string, ...string[]]),
    {
      required_error: "Features array is required"
    }
  ).min(1, "At least one feature is required"),
});

export const updateSubscriptionPlanSchema = createSubscriptionPlanSchema.partial();
