import { z } from "zod";
import { objectId } from "./util";

export const createEnrollmentSchema = z.object({
  school: objectId,
  student: objectId,
  clas: objectId,
  stream: objectId,
  academicYear: objectId,
  enrollmentDate: z.coerce.date(),
  status: z.enum(["active", "transferred", "withdrawn", "graduated"]),
  enrollmentType: z.enum(["new", "re-enrollment", "promotion"]),
  remarks: z.string().optional(),
});

export const updateEnrollmentSchema = createEnrollmentSchema.partial();
