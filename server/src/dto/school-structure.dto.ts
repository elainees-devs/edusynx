// server/dto/school.dto.ts
import { ISchool, IStudent,IStream, IClass, ISession, IAttendance, IDepartment } from "../types";

export type CreateSchoolDTO = Omit<ISchool, "id" | "_id" | "createdAt" | "updatedAt">;
export type CreateStreamDTO = Omit<IStream, "id" | "_id" | "createdAt" | "updatedAt">;
export type CreateClassDTO = Omit<IClass, "id" | "_id" | "createdAt" | "updatedAt">;
export type CreateDepartmentDTO = Omit<IDepartment, "id" | "_id" | "createdAt" | "updatedAt">;
export type CreateSessionDTO = Omit<ISession, "id" | "_id" | "createdAt" | "updatedAt">
export type CreateAttendanceDTO = Omit<IAttendance["attendance"][0], "id" | "_id" | "createdAt" | "updatedAt">;
export type CreateStudentDTO = Omit<IStudent, "id" | "_id" | "createdAt" | "updatedAt">;
