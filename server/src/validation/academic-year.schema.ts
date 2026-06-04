import { z } from "zod";
import { objectId } from "./util";

export const termPeriodSchema = z.object({
  name: z.string().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export const createAcademicYearSchema = z.object({
  school: objectId,
  name: z.string().min(1),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  isActive: z.boolean().default(false),
  terms: z.array(termPeriodSchema).default([]),
});

export const updateAcademicYearSchema = createAcademicYearSchema.partial();
