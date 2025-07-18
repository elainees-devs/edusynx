// server/src/types/people/user.types.ts
import { Document, Types } from "mongoose";
import { IClass, ISchool } from "../school/school-core.types";
import { UserRole } from "../enum/enum";
import { BaseDocument } from "../common/base.types";

export interface IBaseUser extends BaseDocument {
  school: Types.ObjectId | ISchool;
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
  role: UserRole.TEACHER;
  teacherId?: string;
  isClassTeacher?: boolean;
  class: Types.ObjectId | IClass;
  teachingSubjects?: string[];
}

// Guardian interface with literal role
export interface IGuardian extends IBaseUser {
  role: UserRole.GUARDIAN;
  familyNumber: number;
}
// SuperAdmin interface with literal role
export interface ISuperAdmin extends Document {
  _id: Types.ObjectId; // or `string` if you're stringifying it later
  email: string;
  password: string;
  role: UserRole.SUPER_ADMIN;
}