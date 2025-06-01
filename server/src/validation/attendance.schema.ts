// src/validation/attendance.schema.ts
import { z } from "zod";
import { AttendanceStatus } from "../types";
import { objectId } from "./util";

export const attendanceEntrySchema = z.object({
  studentId: objectId,
  status: z.nativeEnum(AttendanceStatus),
});

export const attendanceSchema = z.object({
  school: objectId,
  classRef: objectId,
  schoolYear: z.string().min(4),
  date: z.coerce.date(),
  attendance: z
    .array(attendanceEntrySchema)
    .min(1, "Attendance list cannot be empty"),
});
