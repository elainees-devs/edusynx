//src/dto/entity.dto.ts
import { IAttendance, IBaseUser, IExam, ISchool } from "../types";

// User DTO
export type CreateUserDTO = Omit<
  IBaseUser,
  "id" | "_id" | "createdAt" | "updatedAt"
>;

// School DTO
export type CreateSchoolDTO = Omit<
  ISchool,
  "id" | "_id" | "createdAt" | "updatedAt"
>;

// Attendance DTO
export type CreateAttendanceDTO = Omit<
  IAttendance["attendance"][0],
  "id" | "_id" | "createdAt" | "updatedAt"
>;

// Exam DTO
export type CreateExamDTO = Omit<
  IExam,
  "id" | "_id" | "createdAt" | "updatedAt"
>;
