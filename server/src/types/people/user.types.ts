// server/src/types/people/user.types.ts
import { Document, Types } from "mongoose";
import { IClass, ISchool } from "../school/school-core.types";
import { UserRole } from "../enum/enum";
import { BaseDocument } from "../common/base.types";
import { IDepartment } from "../school/academic.types";
import { IStudent } from "./student.types";

export interface IBaseUser extends BaseDocument {
  school: Types.ObjectId | ISchool
  firstName: string
  middleName: string
  lastName: string
  email: string
  secondaryEmail?: string
  primaryPhoneNumber: string
  secondaryPhoneNumber?: string
  password: string
  nationality: string
  avatarUrl?: string
  isActive: boolean
  lastLogin?: Date
  isLocked: boolean
  passwordChangedAt?: Date
  isTwoFactorEnabled: boolean
  role: UserRole
}

// Teacher interface with literal role
export type ITeacher = Pick<IBaseUser, "school" | "firstName" | "middleName" | "lastName"> & {
   role: UserRole.TEACHER
  isClassTeacher?:boolean
  assignedClass?: Types.ObjectId | IClass
  department?: Types.ObjectId |IDepartment
  isHeadOfDepartment?:boolean
  teacherId: string
}

// Guardian interface with literal role
export interface IGuardian extends Omit<IBaseUser, "password" | "lastLogin" | "isLocked" | "passwordChangedAt" | "isTwoFactorEnabled"> {
  role: UserRole.GUARDIAN;
  familyNumber: string;
  adm: Types.ObjectId |IStudent; // links guardian to student 
}

export interface IFamily {
  familyNumber: number
  guardians: (Types.ObjectId | IGuardian)[]
  students: (Types.ObjectId | IStudent)[]
  address?: string
}

// SuperAdmin interface with literal role
export interface ISuperAdmin extends Document {
  _id: Types.ObjectId // or `string` if you're stringifying it later
  email: string
  password: string
  role: UserRole.SUPER_ADMIN
}