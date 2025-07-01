// client/src/types/people/user.types.ts

import type { UserRole } from "../../constants";
import type { BaseDocument } from "../common/base.types";
import type { IClass, ISchool } from "../school/school-core.types";

export interface IUser  {
  _id?: string
  email: string;
  fullName: string;
  password: string;
  role: UserRole;
  school: string ;
}
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
  isActive: boolean;
  lastLogin?: Date;
  isLocked: boolean;
  passwordChangedAt?: Date;
  isTwoFactorEnabled: boolean;
  role: UserRole;
}

// Teacher interface with literal role
export interface ITeacher extends IBaseUser {
  role: typeof UserRole.TEACHER;
  teacherId?: string;
  isClassTeacher?: boolean;
  class: string | IClass;
  teachingSubjects?: string[];
}

// Guardian interface with literal role
export interface IGuardian extends IBaseUser {
   role: typeof UserRole.GUARDIAN;
  familyNumber: number;
}
