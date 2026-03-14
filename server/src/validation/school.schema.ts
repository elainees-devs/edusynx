// server/src/validation/school.schema.ts
import { z } from "zod";

const subscriptionSchema = z
  .object({
    planId: z.union([
      z.string().min(1),
      z.object({
        _id: z.string().min(1),
      }),
    ]),
    duration: z.number().int().min(1),
    isActive: z.boolean().optional(),
  })
  .transform((subscription) => ({
    ...subscription,
    planId:
      typeof subscription.planId === "string"
        ? subscription.planId
        : subscription.planId._id,
  }));

export const createSchoolSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  phoneNumber: z.string().min(10),
  email: z.string().email(),
  website: z.string().optional(),
  establishedYear: z.number().int().min(1000).max(new Date().getFullYear()),
  logoUrl: z.string().optional(),
  isActive: z.boolean().optional().default(false),
  schoolCode: z.string().min(4),
  slug: z.string().min(1).optional(),
  role: z.string().min(1),
  subscription: subscriptionSchema,
});

export const updateSchoolSchema = createSchoolSchema.partial();
