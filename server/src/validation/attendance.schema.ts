//src/validation/attendance.schema.ts
import { z } from 'zod';
import { AttendanceStatus } from '../types';
import mongoose from 'mongoose';

// Helper to validate MongoDB ObjectId
const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

export const attendanceEntrySchema = z.object({
  studentId: objectId,
  status: z.nativeEnum(AttendanceStatus),
});

export const attendanceSchema = z.object({
  school: objectId,
  classRef: objectId,
  schoolYear: z.string().min(4),
  date: z.coerce.date(), // Accepts string/Date and coerces to Date
  attendance: z.array(attendanceEntrySchema).min(1, "Attendance list cannot be empty"),
});
