// client/src/types/people/user.types.ts
import type { UserRole } from "../../constants";
import type { BaseDocument } from "../common/base.types";
import type { IDepartment } from "../school/academic.types";
import type { ISchool } from "../school/school-core.types";


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

export type ITeacher = Pick<IBaseUser, "school" | "firstName" | "middleName" | "lastName"> & {
   role: typeof UserRole.TEACHER
  isClassTeacher?:boolean
  classId?: string // assign class when isClassTeacher is true
  department?: string |IDepartment
  isHeadOfDepartment?:boolean
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
