// client/src/types/people/UserTypes.ts
import type { UserRole } from "../../constants";
import type { BaseDocument } from "../common/BaseTypes";
import type { IDepartment } from "../school/AcademicTypes";
import type { IClass, ISchool } from "../school/SchoolCoreTypes";

export interface IBaseUser extends BaseDocument {
  school: string | ISchool;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  secondaryEmail?: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber?: string;
  password: string;
  nationality: string;
  avatarUrl?: string;
  isActive?: boolean;
  lastLogin?: Date;
  isLocked: boolean;
  passwordChangedAt?: Date;
  isTwoFactorEnabled: boolean;
  role: UserRole;
}

export interface ITeacher extends Pick<
  IBaseUser,
  | "school"
  | "firstName"
  | "middleName"
  | "lastName"
  | "email"
  | "primaryPhoneNumber"
  | "secondaryPhoneNumber"
  | "avatarUrl"
  | "isActive"
> {
  role: typeof UserRole.TEACHER;

  isClassTeacher?: boolean;
  classId?: string | IClass; // assign class when isClassTeacher is true

  department?: string | IDepartment;
  isHeadOfDepartment?: boolean;
}

export interface GuardianFormInput {
  school: string; // Assuming ID string here; adjust if different
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  secondaryEmail?: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber?: string;
  password?: string;
  nationality: string;
  avatarUrl?: string;
  isTwoFactorEnabled?: boolean;
}
export interface Guardian extends GuardianFormInput {
  _id: string;
  familyNumber?: string;
}

// SuperAdmin interface with literal role
export interface ISuperAdmin {
  email: string;
  password: string;
  role: typeof UserRole.SUPER_ADMIN;
}
