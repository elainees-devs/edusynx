//src/dto/entity.dto.ts
import {
  IAttendance,
  IBaseUser,
  IClass,
  IEvent,
  IExam,
  IFee,
  IFeePaymentSummary,
  IFinancialReport,
  ISchool,
} from "../types";

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

// Class DTO
export type CreateClassDTO = Omit<
  IClass,
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

//Event DTO
export type CreateEventDTO = Omit<
  IEvent,
  "id" | "_id" | "createdAt" | "updatedAt"
>;

//Exam Result DTO
export type CreateExamResultDTO = Omit<
  IExam,
  "id" | "_id" | "createdAt" | "updatedAt"
>;

//Fee DTO
export type CreateFeeDTO = Omit<
  IFee,
  "id" | "_id" | "createdAt" | "updatedAt"
>;

//Fee Payment DTO
export type CreateFeePaymentDTO = Omit<
  IFeePaymentSummary,
  "id" | "_id" | "createdAt" | "updatedAt"
>;

// Financial Report DTO
export type CreateFinancialReportDTO = Omit<
  IFinancialReport,
  "id" | "_id" | "createdAt" | "updatedAt"
>;