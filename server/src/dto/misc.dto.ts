// server/src/dto/misc.dto.ts
import { IEvent, IExam } from "../types";

// Event DTO
export type CreateEventDTO = Omit<IEvent, "id" | "_id" | "createdAt" | "updatedAt">;

// Exam DTO
export type CreateExamDTO = Omit<IExam, "id" | "_id" | "createdAt" | "updatedAt">;

// Exam Result DTO
export type CreateExamResultDTO = Omit<IExam, "id" | "_id" | "createdAt" | "updatedAt">;
