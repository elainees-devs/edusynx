// src/validation/student.schema.ts
import { z } from "zod";
import { Gender, StudentStatus } from "../types/enum/enum";
import { objectId } from "./util";

export const createStudentSchema = z.object({
  school: objectId,
  studentFirstName: z.string().min(1),
  studentMiddleName: z.string().min(1),
  studentLastName: z.string().min(1),
  studentGender: z.nativeEnum(Gender),
  dateOfBirth: z.coerce.date(),
  admissionDate: z.coerce.date(),
  previousSchool: z.string().optional(),
  classId: objectId,
  stream: objectId,
  status: z.nativeEnum(StudentStatus),
  studentId: z.string().optional(),
  studentPhotoUrl: z.string().url().optional(),
  familyNumber: z.number().int().optional(),
});

export const updateStudentSchema = createStudentSchema.partial();
