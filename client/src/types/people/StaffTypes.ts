import type { UserRole } from "../../constants/UserRole";
import type { BaseDocument } from "../common/BaseTypes";
import type { IDepartment } from "../school/AcademicTypes";
import type { IClass } from "../school/SchoolCoreTypes";

export type StaffRole =
  | typeof UserRole.PRINCIPAL
  | typeof UserRole.DEPUTY_PRINCIPAL
  | typeof UserRole.TEACHER
  | typeof UserRole.ACCOUNTANT
  | typeof UserRole.SCHOOL_ADMIN;

export interface IStaff extends BaseDocument {
  school: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  secondaryEmail?: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber?: string;
  password?: string;
  nationality: string;
  avatarUrl?: string;
  isActive: boolean;
  lastLogin?: string;
  isLocked: boolean;
  passwordChangedAt?: string;
  isTwoFactorEnabled: boolean;
  role: StaffRole;
  employeeNumber: string;
  department?: string | IDepartment;
  position?: string;
  isHeadOfDepartment?: boolean;
  isClassTeacher?: boolean;
  assignedClass?: string | IClass;
  employmentDate?: string;
}

export interface CreateStaffDTO {
  school: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber?: string;
  nationality: string;
  role: StaffRole;
  department?: string;
  position?: string;
  isClassTeacher?: boolean;
  assignedClass?: string;
  employmentDate?: string;
}

export type UpdateStaffDTO = Partial<CreateStaffDTO>;
