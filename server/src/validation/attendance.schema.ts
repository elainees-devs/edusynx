// server/src/validation/attendance.schema.ts
import { z } from "zod";
import { objectId } from "./util"; // your existing ObjectId validator

export const attendanceStatusEnum = z.enum(["present", "absent", "late", "excused"]);

export const createAttendanceSchema = z.object({
  school: objectId,           // school ID
  classRef: objectId,         // class ID
  schoolYear: z.string().min(4),
  date: z.string().datetime(), // ISO 8601 date string
  attendance: z.array(
    z.object({
      studentId: objectId,
      status: attendanceStatusEnum,
    })
  ),
});

export const updateAttendanceSchema = createAttendanceSchema.partial();
