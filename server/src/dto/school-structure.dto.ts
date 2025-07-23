// server/dto/school.dto.ts

import { ISchool, IStudent,IStream, IClass, ISession, IAttendance } from "../types";

// School DTO
export type CreateSchoolDTO = Omit<ISchool, "id" | "_id" | "createdAt" | "updatedAt">;

// Stream DTO
export type CreateStreamDTO = Omit<IStream, "id" | "_id" | "createdAt" | "updatedAt">;

// Class DTO
export type CreateClassDTO = Omit<IClass, "id" | "_id" | "createdAt" | "updatedAt">;

// Session DTO
export type CreateSessionDTO = Omit<ISession, "id" | "_id" | "createdAt" | "updatedAt">;

// Attendance DTO
export type CreateAttendanceDTO = Omit<IAttendance["attendance"][0], "id" | "_id" | "createdAt" | "updatedAt">;

// Student DTO
export type CreateStudentDTO = Omit<IStudent, "id" | "_id" | "createdAt" | "updatedAt">;
