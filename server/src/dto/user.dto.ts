// server/src/dto/user.dto.ts
import { IBaseUser, IGuardian, ITeacher } from "../types";

// User DTO
export type CreateUserDTO = Omit<IBaseUser, "id" | "_id" | "createdAt" | "updatedAt">;

// Guardian DTO
export type CreateGuardianUserDTO = Omit<IGuardian, "id" | "_id" | "createdAt" | "updatedAt">;

// Teacher DTO
export type CreateTeacherDTO = Omit<ITeacher, "id" | "_id" | "createdAt" | "updatedAt">;


