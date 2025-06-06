//src/types/people/user.types.ts
import { Types } from "mongoose";
import { IClass, ISchool } from "../school/school-core.types";
import { UserRole } from "../enum/enum";
import { BaseDocument } from "../common/base.types";

export interface IBaseUser extends BaseDocument {
  school: Types.ObjectId | ISchool;
  firstName: string;
  middleName: string;
  lastName: string;
  primaryEmail: string;
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

export interface ITeacher extends IBaseUser {
  role: UserRole.TEACHER;
  teacherId?: string;
  isClassTeacher?: boolean;
  class: Types.ObjectId | IClass;
  teachingSubjects?: string[];
}

export interface IGuardian extends IBaseUser {
  role: UserRole.GUARDIAN;
  familyNumber: number;
}
