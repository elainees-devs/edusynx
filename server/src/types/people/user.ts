// src/types/people/user.ts
import { Types } from "mongoose";
import { IClass, ISchool } from "../school/school";
import { UserRole } from "../enum/enum";

export interface IBaseUser {
  _id: Types.ObjectId;
  school: Types.ObjectId | ISchool;
  firstName: string;
  middleName: string;
  lastName: string;
  primaryEmail: string;
  secondaryEmail?: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber?: string;
  hashedPassword: string;
  nationality: string;
  avatarUrl?: string;
  isActive: boolean;
  lastLogin?: Date;
  isLocked: boolean;
  passwordChangedAt?: Date;
  isTwoFactorEnabled: boolean;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}


export interface ITeacherUser extends IBaseUser {
  role: UserRole.Teacher;
  teacherId?: string;
  isClassTeacher?: boolean;
  class: Types.ObjectId | IClass;
  teachingSubjects?: string[];
}

export interface IGuardianUser extends IBaseUser {
  role: UserRole.Guardian;
  familyNumber: number;
}
