import { Types } from "mongoose";
import { BaseDocument } from "../common/base.types";
import { IClass, ISchool } from "../school/school-core.types";
import { IDepartment } from "../school/academic.types";
import { UserRole } from "../enum/enum";

export type StaffRole =
  | UserRole.PRINCIPAL
  | UserRole.DEPUTY_PRINCIPAL
  | UserRole.TEACHER
  | UserRole.ACCOUNTANT
  | UserRole.SCHOOL_ADMIN;

export interface IStaff extends BaseDocument {
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
  role: StaffRole;
  employeeNumber: string;
  department?: Types.ObjectId | IDepartment;
  position?: string;
  isHeadOfDepartment?: boolean;
  isClassTeacher?: boolean;
  assignedClass?: Types.ObjectId | IClass;
  employmentDate?: Date;
}
