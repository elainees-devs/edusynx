// src/validation/student.schema.ts
import { z } from "zod";
import { StudentGender, StudentStatus } from "../types/enum/enum";
import { objectId } from "./util";

export const createStudentSchema = z.object({
  school: objectId,
  studentFirstName: z.string().min(1),
  studentMiddleName: z.string().min(1),
  studentLastName: z.string().min(1),
  studentGender: z.nativeEnum(StudentGender),
  dateOfBirth: z.coerce.date(),
  adm: z.number().int().min(1),
  admissionDate: z.coerce.date(),
  previousSchool: z.string().optional(),
  guardian: objectId,
  classId: objectId,
  stream: objectId,
  status: z.nativeEnum(StudentStatus),
  studentId: z.string().optional(),
  studentPhotoUrl: z.string().url().optional(),
  familyNumber: z.number().int().optional(),
});

export const updateStudentSchema = createStudentSchema.partial();
