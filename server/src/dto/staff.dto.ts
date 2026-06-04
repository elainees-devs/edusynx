import { IStaff } from "../types";

export type CreateStaffDTO = Omit<IStaff, "_id" | "createdAt" | "updatedAt" | "employeeNumber">;

export type UpdateStaffDTO = Partial<CreateStaffDTO>;
